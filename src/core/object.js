(function($) {

  /**
   * @namespace Object
   */
  var mixin = {

    keys: function(obj) {
      var results = [];
      for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
          results.push(property);
        }
      }
      return results;
    },

    values: function(obj) {
      return Object.keys(obj).map(function(key){ return obj[key] });
    },

    //return new object that contains only given attributes as parameter
    slice: function(obj, attributes){
      var result = {};
      for(var property in obj){
        if (obj.hasOwnProperty(property) && attributes.include(property)) {
          result[property] = obj[property];
        }
      }
      return result;
    },

    each: function(obj, iterator, context){
      try {
        if(arguments.length == 2) context = obj;
        for(var property in obj){
          if (obj.hasOwnProperty(property)) {
            iterator.call(context, property, obj[property]);
          }
        }
      } catch (e) {
        if (e != $.ext.$break) throw e;
      }
    }

  };

  // use native browser JS 1.6 implementation if available
  if (Object.keys) { delete mixin.keys; }

  $.extend(Object, mixin);

})(jQuery);
