
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

