(function($) {

  $.ext = $.ext || {};

  /**
   * @namespace $.ext.Class
   * This module defines methods for handling class creation and inheritance.
   */
  $.ext.Class = (function() {
    var __extending = {};

    var ClassMetaDataMixin = {

      getSuperClassMetaData: function() {
        return this.getClassMetaData().superClassMetaData;
      },

      getClassMetaData: function() {
        return this.__clsMetaData;
      },

      /**
       * @return reference to class constructor function (like Horizon.ui.components.Component)
       */
      getClassConstructor: function() {
        return this.getClassMetaData().classConstructor;
      },

      /**
       *
       * @param full (boolean) - if return full name including namespace
       * @return (string) name of the class. if full parameter is true, full name including namespace will be returned
       */
      getClassName: function(full) {
        var cmd = this.getClassMetaData();
        return full ? cmd.fullClassName : cmd.className;
      },

      /**
       * @return (string) namespace this class resides in (if the class is global object, empty string will be returned)
       */
      getNamespace: function() {
        return this.getClassMetaData().namespace;
      },

      /**
       * Check if this class is instance of given class (including inheritance)
       * @param fullClassNameOrConstructor (String | Function) - string with full class name or construction function reference
       * @return (boolean) return true if this class is instance of given full class name (string) or class reference (constructor function)
       */
      instanceOf: function(fullClassNameOrConstructor) {
        return typeof(fullClassNameOrConstructor) == 'string' ? this.__instanceOfByString(fullClassNameOrConstructor) : this.__instanceOfByClass(fullClassNameOrConstructor);
      },

      __instanceOfByString: function(fullClassName) {
        if (this.getClassName(true) == fullClassName) return true;
        var superClassMetaData = this.getSuperClassMetaData();
        while (superClassMetaData) {
          if (superClassMetaData.fullClassName == fullClassName) return true;
          superClassMetaData = superClassMetaData.superClassMetaData;
        }
        return false;
      },

      __instanceOfByClass: function(classConstructor) {
        if (this.getClassConstructor() == classConstructor) return true;
        var superClassMetaData = this.getSuperClassMetaData();
        while (superClassMetaData) {
          if (superClassMetaData.classConstructor == classConstructor) return true;
          superClassMetaData = superClassMetaData.superClassMetaData;
        }
        return false;
      }
    };

    var Inheritance =
      /** @scope $.ext.Class */
      {

      /**
       * @function {public static Class} ?
       * @param {String} fullClassName
       * @param {Class} classParent
       * @param {Object} classDefinition
       */
      create: function(fullClassName, classParent, classDefinition) {
        if (arguments.length == 1) { //no inheritance and no className
          classDefinition = fullClassName;
          classParent = null;
          fullClassName = 'Object';
        } else if (arguments.length == 2) {
          if (typeof(fullClassName) == 'function') { //no className, inheritance only
            classDefinition = classParent;
            classParent = fullClassName;
            fullClassName = 'Object';
          } else if (typeof(fullClassName) == 'string') { //no inheritance, with class name
            classDefinition = classParent;
            classParent = null;
          }
        }

        //this is the class constructor (which in js is simply a function) that will be returned
        var func = function() {
          if (arguments[0] == __extending) {
            return;
          }
          this.initialize.apply(this, arguments);
        };

        //add basic class names handling functions
        func.prototype.initialize = function() {
          //do nothing
        };

        //if there is inheritance
        if (typeof(classParent) == 'function') {
          func.prototype = new classParent(__extending);
          func.prototype.superClass = classParent.prototype;
        }

        //generate className info
        func.prototype.__clsMetaData = {
          classConstructor: func,
          superClassMetaData: func.prototype.__clsMetaData || null,
          fullClassName: fullClassName,
          className: function() {
            var dotIndex = fullClassName.lastIndexOf('.');
            return dotIndex == -1 ? fullClassName : fullClassName.substring(dotIndex + 1);
          }(),
          namespace: function() {
            var dotIndex = fullClassName.lastIndexOf('.');
            return dotIndex == -1 ? "" : fullClassName.substring(0, dotIndex);
          }()
        };

        //apply mixings
        var mixins = [];

        if (!func.prototype.getClassName) mixins.push(ClassMetaDataMixin);

        if (classDefinition && classDefinition.include) {
          if (classDefinition.include.reverse) {
            // methods defined in later mixins should override prior
            mixins = mixins.concat(classDefinition.include.reverse());
          } else {
            mixins.push(classDefinition.include);
          }
          delete classDefinition.include; // clean syntax sugar
        }
        if (classDefinition) Inheritance.inherit(func.prototype, classDefinition);
        for (var i = 0; (mixin = mixins[i]); i++) {
          Inheritance.mixin(func.prototype, mixin);
        }

        //set namespace
        if (func.prototype.__clsMetaData.namespace.length > 0) {
          var ns = Inheritance.namespace(func.prototype.__clsMetaData.namespace);
          ns[func.prototype.__clsMetaData.className] = func;
        }
        return func;
      },

      mixin: function (dest, src, clobber) {
        clobber = clobber || false;
        if (typeof(src) != 'undefined' && src !== null) {
          for (var prop in src) {
            if (clobber || (!dest[prop] && typeof(src[prop]) == 'function')) {
              dest[prop] = src[prop];
            }
          }
        }
        return dest;
      },

      inherit: function(dest, src, fname) {
        if (arguments.length == 3) {
          var ancestor = dest[fname], descendent = src[fname], method = descendent;
          descendent = function() {
            var ref = this.superMethod;
            this.superMethod = ancestor;
            var result = method.apply(this, arguments);
            ref ? this.superMethod = ref : delete this.superMethod;
            return result;
          };
          // mask the underlying method
          descendent.valueOf = function() {
            return method;
          };
          descendent.toString = function() {
            return method.toString();
          };
          dest[fname] = descendent;
        } else {
          for (var prop in src) {
            if (dest[prop] && typeof(src[prop]) == 'function') {
              Inheritance.inherit(dest, src, prop);
            } else {
              dest[prop] = src[prop];
            }
          }
        }
        return dest;
      },

      /**
       * @function {public static Class} ?
       */
      singleton: function() {
        var args = arguments;
        if (args.length == 2 && args[0].getInstance) {
          var klass = args[0].getInstance(__extending);
          // we're extending a singleton swap it out for it's class
          if (klass) {
            args[0] = klass;
          }
        }

        return (function(args) {
          // store instance and class in private variables
          var instance = false;
          var klass = Inheritance.create.apply(args.callee, args);
          return {
            getInstance: function () {
              if (arguments[0] == __extending) return klass;
              if (instance) return instance;
              return (instance = new klass());
            }
          };
        })(args);
      },

      /**
       * Specifying the last node of a namespace implicitly creates all other nodes. Usage:
       * <pre>
       *  //will make sure global (window) variable org with property myorg with property utils is present
       *  $.ext.Class.namespace('org.myorg.utils');
       *  org.myorg.utils.Widget = function() { ... }
       *  org.myorg.MyClass = function(config) { ... }
       * </pre>
       * @function {public static Object} ?
       * Creates namespaces to be used for scoping variables and classes so that they are not global.
       * @param {String} ns - namespace string
       * @returns The namespace object. (the last namespace created)
       */
      namespace: function(ns) {
        ns = ns || "";
        var nsArray = ns.split(".");
        var globalVar = nsArray[0];
        var obj = window[globalVar] = window[globalVar] || {};
        var arr = nsArray.slice(1);
        for (var j = 0; j < arr.length; j++) {
          var v2 = arr[j];
          obj = obj[v2] = obj[v2] || {};
        }
        return obj;
      }
    };

    return Inheritance;

  })();

})(jQuery);

