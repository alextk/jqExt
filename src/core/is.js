/**
 * Add utility method to jQuery object to test for additional parameters types
 */
jQuery.ext.Extender.addUtilityMethods({

  /**
   * @function {public static boolean} $.?
   * @param obj
   */
  isBoolean: function(obj){
    return jQuery.type(obj) === "boolean";
  },

  /**
   * @function {public static boolean} $.?
   * @param obj
   */
  isNumber: function(obj){
    return jQuery.type(obj) === "number";
  },

  /**
   * @function {public static boolean} $.?
   * @param obj
   */
  isDate: function(obj){
    return jQuery.type(obj) === "date";
  },

  /**
   * @function {public static boolean} $.?
   * @param obj
   */
  isString: function(obj){
    return jQuery.type(obj) === "string";
  },

  /**
   * @function {public static boolean} $.?
   * @param obj
   */
  isUndefined: function(obj){
    return jQuery.type(obj) === "undefined";
  }

});
