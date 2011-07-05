(function($) {

  /**
   * @namespace Object
   */
  var mixin = {

    keys: function() {
      var results = [];
      for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
          results.push(property);
        }
      }
      return results;
    }

  };

  // use native browser JS 1.6 implementation if available
  if (Object.keys) { delete mixin.keys; }

  $.extend(Object, mixin);

})(jQuery);
