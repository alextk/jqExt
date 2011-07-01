/*
* jqExt - jQuery framework extensions
*
* Version: 0.0.1a
* Copyright 2011 Alex Tkachev
*
* Dual licensed under MIT or GPLv2 licenses
*   http://en.wikipedia.org/wiki/MIT_License
*   http://en.wikipedia.org/wiki/GNU_General_Public_License
*
* Date: Wed Jun 29 20:18:43 2011 +0300
*/


/**
 * Define jQuery.ext namespace and extender utility methods
 */

(function($){

  $.ext = {
    $break: {} //special variable that is used to break from event fire and enumeration looping
  };
  $.ext.mixins = {};

  $.ext.extender = {

    /**
     * Add methods that will be available on jQuery wrapped set instance
     * @param methods {Object} - hash of methodName ==> function
     * @param keepOriginal {Boolean} (optional) - if true, original method will be kept under jq_original_<methodName>
     */
    addWrapedSetMethods: function(methods, keepOriginal){
      for(var m in methods){
        if(keepOriginal && jQuery.fn[m]){
          jQuery.fn['jq_original_'+m] = jQuery.fn[m];
        }
        jQuery.fn[m] = methods[m];
      }
    },

    /**
     * Add methods that will be available on jQuery object instance
     * @param methods {Object} - hash of methodName ==> function
     */
    addUtilityMethods: function(methods){
      for(var m in methods){
        jQuery[m] = methods[m];
      }
    }

  };

})(jQuery);


/**
 * Add utility method to jQuery object to test for additional parameters types
 */

jQuery.ext.extender.addUtilityMethods({

  isBoolean: function(obj){
    return jQuery.type(obj) === "boolean";
  },

  isNumber: function(obj){
    return jQuery.type(obj) === "number";
  },

  isDate: function(obj){
    return jQuery.type(obj) === "date";
  },

  isString: function(obj){
    return jQuery.type(obj) === "string";
  },

  isUndefined: function(obj){
    return jQuery.type(obj) === "undefined";
  }

}, true);
(function($) {

  $.extend(Function,
    /** @lends Function */
    {
      /**
       * Empty function that does nothing (can be reused in default options when callback is being expected)
       */
      emptyFn: function() {
      },

      /**
       * Identity function that returns the first passed argument or undefined
       * @param value first argument to return
       */
      identityFn: function(value) {
        return value;
      }

    });

  $.extend(Function.prototype,
    /** @lends Function.prototype */
    {

      /**       *
         Binds this function to the given context by wrapping it in another function and returning the wrapper.
         Whenever the resulting "bound" function is called, it will call the original ensuring that this is set to context.
         Also optionally curries arguments for the function (meaning you can burn arguments in when binding and they will be passed to the function)
       * @param context - context to bind this function to
       */
      bind: function(context) {
        if (arguments.length < 2 && $.isUndefined(arguments[0])) {
          return this;
        }

        var self = this;
        var bindArgs = null; //remove context argument
        if (arguments.length > 1) {
          bindArgs = Array.prototype.slice.call(arguments, 1);
        }

        return function() {
          //append method arguments to bind arguments and call the original function in context
          var a = arguments;
          if (bindArgs) {
            a = bindArgs;
            if (arguments.length > 0) {
              var aLength = a.length, argsLength = arguments.length;
              while (argsLength--) {
                a[aLength + argsLength] = arguments[argsLength]; //this is the fastest was of appending elements to array
              }
            }
          }
          return self.apply(context, a);
        };
      }

    });

})(jQuery);jQuery.extend(Date.prototype, {

  /**
   * return number of miliseconds between given date and this date. if date is not given, return number of miliseconds elapsed from this date.
   * @param date {Date} (optional) - calculate elapsed miliseconds from this date to this date. defaults to now date
   */
  getElapsed: function(date) {
    return Math.abs((date || new Date()).getTime()-this.getTime());
  }

});jQuery.extend(String.prototype, {

  /**
   * Replace this string {<number>} variables with passed arguments. {0} corresponds to first argument, {1} to second, etc.
   * Example:
   *    "This is a {0} string using the {1} method".format("formatted", "inline")
   * will return:
   *    "This is a formatted string using the inline method"
   *
   *  @param args {String...} - variable number of arguments to act as variables into the string format
   */
  format: function() {
    var txt = this;
    for (var i = 0; i < arguments.length; i++) {
      var exp = new RegExp('\\{' + (i) + '\\}', 'gm');
      txt = txt.replace(exp, arguments[i]);
    }
    return txt;
  },

  /**
   * return true if this string starts with given string
   * @param pattern {String} - string to check if this string starts with
   */
  startsWith: function(pattern) {
    return this.lastIndexOf(pattern, 0) === 0;
  },

  /**
   * Returns true if given string is included in this string
   * @param anotherString {String} - check if it is contained in this string instance
   */
  include: function(anotherString) {
    return this.indexOf(anotherString) != -1;
  },

  /**
   * return true if this string ends with given string
   * @param pattern {String} - string to check if this string ends with
   */
  endsWith: function(pattern) {
    var d = this.length - pattern.length;
    return d >= 0 && this.indexOf(pattern, d) === d;
  },

  /**
   * Removes all whitespace from start and end of this string
   */
  trim: function() {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
  }

});
jQuery.extend(RegExp, {

  /**
   * Escapes the passed string for use in a regular expression
   * @param {String} str - string in which special regular expression character will be escaped
   * @return {String} escaped regular expession string
   */
  escape : function(str) {
    return str.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1");
  }
  

});
jQuery.Event.Keys = {
  BACKSPACE: 8,
  TAB: 9,
  RETURN: 13,
  ENTER: 13,
  ESC: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETE: 46,
  HOME: 36,
  END: 35,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  INSERT: 45
};

jQuery.extend(jQuery.Event.prototype, {

  stopEvent: function(){
    this.preventDefault();
    this.stopPropagation();
  },

  isSpecialKey : function(){
    var k = this.which;
    return  (this.ctrlKey) || this.isNavKeyPress() ||
            (k == jQuery.Event.Keys.BACKSPACE) || // Backspace
            (k >= 16 && k <= 20) || // Shift, Ctrl, Alt, Pause, Caps Lock
            (k >= 44 && k <= 46);   // Print Screen, Insert, Delete
  },

  isNavKeyPress : function(){
    var k = this.which;
    return (k >= 33 && k <= 40) ||  // Page Up/Down, End, Home, Left, Up, Right, Down
            k == jQuery.Event.Keys.RETURN || k == jQuery.Event.Keys.TAB || k == jQuery.Event.Keys.ESC;
  },

  isBackspaceKey: function(){
    return this.which == jQuery.Event.Keys.BACKSPACE;
  },

  isDeleteKey: function(){
    return this.which == jQuery.Event.Keys.DELETE;
  },

  isTabKey: function(){
    return this.which == jQuery.Event.Keys.TAB;
  },

  isEnterKey: function(){
    return this.which == jQuery.Event.Keys.RETURN;
  },

  isEscKey: function(){
    return this.which == jQuery.Event.Keys.ESC;
  },

  isUpKey: function(){
    return this.which == jQuery.Event.Keys.UP;
  },

  isDownKey: function(){
    return this.which == jQuery.Event.Keys.DOWN;
  }

});jQuery.ext.extender.addUtilityMethods({

  systemInfo: function() {

    var ua = navigator.userAgent.toLowerCase();

    var check = function(r) {
      return r.test(ua);
    };

    var info = {
      browser: {},
      os: {}
    };

    info.browser.isStrict = document.compatMode == "CSS1Compat";
    info.browser.isSecure = /^https/i.test(window.location.protocol);

    info.browser.isOpera = check(/opera/);
    info.browser.isChrome = check(/\bchrome\b/);
    info.browser.isWebKit = check(/webkit/);
    info.browser.isSafari = !info.browser.isChrome && check(/safari/);
    info.browser.isSafari2 = info.browser.isSafari && check(/applewebkit\/4/); // unique to Safari 2
    info.browser.isSafari3 = info.browser.isSafari && check(/version\/3/);
    info.browser.isSafari4 = info.browser.isSafari && check(/version\/4/);
    info.browser.isIE = !info.browser.isOpera && check(/msie/);
    info.browser.isIE7 = info.browser.isIE && check(/msie 7/);
    info.browser.isIE8 = info.browser.isIE && check(/msie 8/);
    info.browser.isIE6 = info.browser.isIE && !info.browser.isIE7 && !info.browser.isIE8;
    info.browser.isGecko = !info.browser.isWebKit && check(/gecko/);
    info.browser.isGecko2 = info.browser.isGecko && check(/rv:1\.8/);
    info.browser.isGecko3 = info.browser.isGecko && check(/rv:1\.9/);
    info.browser.isBorderBox = info.browser.isIE && !info.browser.isStrict;

    info.os.isWindows = check(/windows|win32/);
    info.os.isMac = check(/macintosh|mac os x/);
    info.os.isAir = check(/adobeair/);
    info.os.isLinux = check(/linux/);

    return info;

  }()

}, true);/**
 * This is a module (=mixin), that can be included in any object prototype to provide that object instances with event handling
 * capabilities.
 */

(function($) {

  var ObservableModule = {

    __initListeners: function(eventName) {
      this.__listeners = this.__listeners || {};
      this.__listeners[eventName] = this.__listeners[eventName] || [];
    },

    /**
     * Add listener to this object. There are two forms to do it:
     *
     * 1. Bind single event: obj.on('someEvent', handlerFunc, scope, [arg1, arg2, arg3]);
     *    Bind multiple events to the same handler: obj.on('event1 event2 event3', handlerFunc, scope, [arg1, arg2, arg3]);
     * 2. Bind multiple events, to the different handlers:
     *  obj.on({
     *    event1: { fn: handlerFunc1, scope: otherObj1, args: [1,2,3] },
     *    event2: { fn: handlerFunc2, scope: otherObj2, args: [4,5,6] }
     *  });
     *  ---------------------------------------
     *  or if the scope and args are the same:
     *  ---------------------------------------
     *  obj.on({
     *    event1: handlerFunc1,
     *    event2: handlerFunc2,
     *    scope: sameScopeObj,
     *    args: [1,2,3]
     *  });
     *
     * Form 1:
     * @param eventName {String} - name of the event (or multiple events names separated by space)
     * @param handler {Function} - function to invoke when event is fired
     * @param scope {Object} (optional) - the scope to invoke handler function in. If not specified or null, defaults to the object firing the event
     * @param args {Object} (optional) - arguments to pass to the handler function as part of the event object (bindArgs property of the event object)
     *
     * Form 2:
     * @param options {Hash} - optional hash with following keys:
     *  eventName1 {Function}: handlerFunction
     *  -------- OR -----------
     *  eventName1 {Hash}: options hash with the following keys:
     *    fn {Function} - the handler function
     *    scope {Object} (optional) - the scope to invoke handler function in. defaults to the object firing the event
     *    args {Object} (optional) - arguments to pass to the handler function as part of the event object (bindArgs property of the event object)
     *    
     *  .....
     *
     *  scope {Object} (optional) - the scope to invoke handler function in. defaults to the object firing the event
     *  args {Object} (optional) - arguments to pass to the handler function as part of the event object (bindArgs property of the event object)
     */
    addListener: function(eventName, handler, scope, args) {
      if ($.type(eventName) === "string" && eventName.length > 0) { //event name is string: use form1
        if (eventName.indexOf(' ') == -1) {
          handler = handler || null;
          var listenerObj = {fn: handler, scope: scope || this, args: args || null};
          if (!this.hasListener(eventName, listenerObj.fn, listenerObj.scope, listenerObj.args)) {
            this.__initListeners(eventName);
            this.__listeners[eventName].push(listenerObj);
          }
        } else { //attach multiple events to the same handler, e.g: obj.on('focus blur', function(e){ alert(e) })
          var eventNames = eventName.split(' ');
          for (var i = 0; i < eventNames.length; i++) {
            this.addListener.call(this, eventNames[i], handler, scope, args);
          }
        }
      } else { //event name is object (use form2): attaching multiple listeners to multiple events
        var globalOpts = eventName;
        for (var name in globalOpts) {
          if (name != 'scope' && name != 'args'){ //skip scope and args keys (can't be event names)
            var eventOptsOrHandler = globalOpts[name];
            this.addListener(name, eventOptsOrHandler.fn || eventOptsOrHandler, eventOptsOrHandler.scope || globalOpts.scope, {args: eventOptsOrHandler.args || globalOpts.args});
          }
        }
      }
      return this;
    },

    /**
     * Remove listeners from this object.
     * Usages:
     *  - Remove specific listener for event: obj.removeListener('someEvent', eventListener)
     *  - Remove all listeners for event: obj.removeListener('someEvent')
     *  - Remove all events: myObject.un()
     *  - Remove multiple listeners for events (if listener value for event is null - all listeners for this event will be unbound):
     *          obj.un({event1: event1Listener, event2: event2Listener, event3: null, ...});
     *  - Remove all listeners for multiple events: myObject.un('event1 event2 event3');
     */
    removeListener: function(eventName, handler, options) {
      if ($.type(eventName) === "string" && eventName.length > 0) {
        if (eventName.indexOf(' ') == -1) {
          this.__initListeners(eventName);
          if (arguments.length == 1) { //remove all listeners for this eventName
            this.__listeners[eventName].clear();
          } else {
            options = options || {};
            var l = this.findListener(eventName, handler, options.scope || this, options.args || null);
            if (l !== null) {
              this.__listeners[eventName].remove(l);
            }
          }
        } else { //attach multiple events to the same handler, e.g: obj.on('focus blur', function(e){ alert(e) })
          var eventNames = eventName.split(' ');
          for (var i = 0; i < eventNames.length; i++) {
            this.removeListener.call(this, eventNames[i], handler, options);
          }
        }
      } else { //event name is object, attaching multiple listeners to multiple events
        var globalOpts = eventName;
        for (var name in globalOpts) {
          if (name != 'scope' && name != 'args'){ //skip scope and args keys (can't be event names)
            var eventOptsOrHandler = globalOpts[name];
            this.removeListener(name, eventOptsOrHandler.fn || eventOptsOrHandler, eventOptsOrHandler.scope || globalOpts.scope, {args: eventOptsOrHandler.args || globalOpts.args});
          }
        }
      }
      return this;
    },

    /**
     * Return true if this object has listener for given eventName, handler function scope and args
     * @param eventName
     * @param fn
     * @param scope
     * @param args
     */
    hasListener: function(eventName, fn, scope, args) {
      return this.findListener(eventName, fn, scope, args) !== null;
    },

    /**
     * Find listener metadata object that corresponds to given parameters
     * @param eventName
     * @param fn
     * @param scope
     * @param args
     */
    findListener: function(eventName, fn, scope, args) {
      this.__initListeners(eventName);
      var listeners = this.__listeners[eventName];
      for (var i = 0; i < listeners.length; i++) {
        var l = listeners[i];
        if (l.fn == fn && l.scope == scope && l.args == args){
          return l;
        }
      }
      return null;
    },

    /**
     * Fire all registered listeners for given event name.
     * Note if one of the listeners throws an error, other listeners don't get invoked, and error is propagated. If your
     * listener can throw error, but you want to allow normal excecution, wrap your listener code in try/catch.
     * @param eventName {String} - event name to fire listeners for
     * @param args... - arguments to pass to handler functions after the event object
     * @return array of listeners return values (in the order of invokation) or false if excecution has been terminated by returning $.ext.$break from handler function (listener)
     */
    fireListener: function(eventName) {
      this.__initListeners(eventName);
      var listenersReturnValues = [];
      var args = $.makeArray(arguments).slice(1); //remove eventName (first argument)
      var e = {eventName: eventName, source: this, bindArgs: null}; //event object
      args.unshift(e); //add event object as the first parameter to the arguments list
      for (var i = 0; i < this.__listeners[eventName].length; ++i) {
        var l = this.__listeners[eventName][i];
        e.bindArgs = l.args;

        var res = l.fn.apply(l.scope, args) || null; //apply listener

        if(res == $.ext.$break){
          return false;
        }

        listenersReturnValues.push(res);
      }
      return listenersReturnValues;
    }

  };

  //define some aliases
  ObservableModule.fire = ObservableModule.fireListener;
  ObservableModule.on = ObservableModule.addListener;
  ObservableModule.un = ObservableModule.removeListener;

  //add module to jquery ext modules collection
  $.ext.mixins.Observable = ObservableModule;

})(jQuery);

