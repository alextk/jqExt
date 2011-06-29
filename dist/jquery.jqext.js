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
* Date: Wed Jun 29 14:17:00 2011 +0300
*/


/**
 * Define jQuery.ext namespace and extender utility methods
 */

(function($){

  $.ext = {};

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
