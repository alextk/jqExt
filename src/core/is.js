
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
