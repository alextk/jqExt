/**
 * jQuery extensions
 * @project jqExt
 * @description jQuery extensions and javascript native classes extensions
 * @version 0.0.1
 */

/**
 * Define jQuery.ext namespace and extender utility methods
 */
(function($) {

  /**
   * @namespace $.ext
   * a namespace that contains all jqExt custom classes and utility methods. jqExt doesn't pollute global namespace
   * and groups all its code inside $.ext namespace.
   */
  $.ext = {
    /** special variable that is used to break from event fire and enumeration looping */
    $break: {}
  };

  /**
   * @namespace $.ext.mixins
   * a namespace where all mixins are defined and can be included into objects
   */
  $.ext.mixins = {};

  /**
   * @object {public} $.ext.extender
   * Extender is an object with two static utility functions that allow to easily extend jQuery: to add utility methods
   * on jQuery object and to create plugins (that will be available as wrapped set methods).
   */
  $.ext.extender = {

    /**
     * @function {public static void} ?
     * Add methods that will be available on jQuery wrapped set instance
     * @param {Hash} methods - hash of methodName: function
     * @param {optional boolean} keepOriginal - if true, original method will be kept under jq_original_[methodName]
     */
    addWrapedSetMethods: function(methods, keepOriginal) {
      for (var m in methods) {
        if (keepOriginal && jQuery.fn[m]) {
          jQuery.fn['jq_original_' + m] = jQuery.fn[m];
        }
        jQuery.fn[m] = methods[m];
      }
    },

    /**
     * @function {public static void} ?
     * Add methods that will be available on jQuery object instance
     * @param {Hash} methods - hash of methodName: function
     */
    addUtilityMethods: function(methods) {
      for (var m in methods) {
        jQuery[m] = methods[m];
      }
    }
  };

})(jQuery);
