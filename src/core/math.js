(function($) {

  $.extend(Math, {
    /**
     * @property {public static Function} Math.?
     * return uuid compliant with rfc4122 version 4
     */
    uuid: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
    },

    // Converts from degrees to radians.
    degreesToRadians: function(degrees) {
      return degrees * Math.PI / 180;
    },

    // Converts from radians to degrees.
    radiansToDegrees: function(radians) {
      return radians * 180 / Math.PI;
    }

  });


})(jQuery);