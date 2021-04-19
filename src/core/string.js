(function($) {

  var strRepeat = function(str, qty){
    if (qty < 1) return '';
    var result = '';
    while (qty > 0) {
      if (qty & 1) result += str;
      qty >>= 1, str += str;
    }
    return result;
  };

  /** @scope String */
  var mixin = {

    /**
     * @function {public String} ?
     * Returns copy of this string when first letter is uppercase and other letters downcased
     * @returns copy of this string when first letter is uppercase and other letters downcased
     */
    capitalize: function() {
      return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
    },

    /**
     * @function {public String} ?
     * Converts underscored or dasherized string to a camelized one
     * @return copy of this string when its words are camelized
     */
    camelize: function(){
      var result = this.trim().replace(/[-_\s]+(.)?/g, function(match, ch){ return ch.toUpperCase(); });
      result = result.charAt(0).toUpperCase() + result.substring(1);
      return result;
    },

    /**
     * @function {public String} ?
     * Converts a camelized or dasherized string into an underscored one
     * @return copy of this string when its words are separated by underscore
     */
    underscore: function(){
      return this.trim().replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
    },

    /**
     * @function {public String} ?
     * Converts a underscored or camelized string into an dasherized one
     * @return copy of this string when its words are separated by dash
     */
    dasherize: function(){
      return this.trim().replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
    },

    /**
     * <pre>
     * "This is a {0} string using the {1} method".format("formatted", "inline")
     * //will return: "This is a formatted string using the inline method"
     * </pre>
     *
     * @function {public String} ?
     * Replace this string {0},{1},{2}... tokens (variables) with passed arguments.
     * {0} corresponds to first argument, {1} to second, etc.
     * @param  {String...} args - variable number of arguments to act as variables into the string format
     * @returns formatted string as described above
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
     * @function {public boolean} ?
     * This method checks if this string starts with given string as parameter
     * @param {String} other - string to check if this string starts with
     * @returns true if this string starts with given string
     */
    startsWith: function(other) {
      return this.lastIndexOf(other, 0) === 0;
    },

    /**
     * @function {public boolean} ?
     * This method checks if given string is included in this string
     * @param anotherString {String} - check if it is contained in this string instance
     * @returns true if given string is included in this string
     */
    include: function(anotherString) {
      return this.indexOf(anotherString) != -1;
    },

    /**
     * @function {public boolean} ?
     * This method checks if this string ends with given string as parameter
     * @param {String} other - string to check if this string ends with
     * @returns true if this string ends with given string
     */
    endsWith: function(other) {
      var d = this.length - other.length;
      return d >= 0 && this.indexOf(other, d) === d;
    },

    /**
     * @function {public String} ?
     * Removes all whitespace from start and end of this string
     * @returns new string with all whiteshapce removed from the start and end of this string
     */
    trim: function() {
      return this.replace(/^\s+|\s+$/, '');
    },

    ltrim: function(){
      return this.replace(/^\s+/, '');
    },

    rtrim: function(){
      return this.replace(/\s+$/, '');
    },

    lpad: function(length, padStr) {
      var padlen = length - this.length;
      return strRepeat(padStr||' ', padlen) + this;
    },

    rpad: function(length, padStr) {
      var padlen = length - this.length;
      return this + strRepeat(padStr||' ', padlen);
    },

    lrpad: function(length, padStr) {
      var padlen = length - this.length;
      return strRepeat(padStr||' ', Math.ceil(padlen/2)) + this
        + strRepeat(padStr||' ', Math.floor(padlen/2));
    },

    replaceAll: function(str, newStr){
      // If a regex pattern
      if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
        return this.replace(str, newStr);
      }
      // If a string
      return this.replace(new RegExp(str, 'g'), newStr);
    }
  };

  // use native browser JS 1.6 implementation if available
  if (String.prototype.trim){ mixin.trim = String.prototype.trim; }
  if (String.prototype.trimLeft){ mixin.ltrim = String.prototype.trimLeft; }
  if (String.prototype.trimRight){ mixin.rtrim = String.prototype.trimRight; }
  if (String.prototype.replaceAll){ mixin.replaceAll = String.prototype.replaceAll; }

  //define aliases
  mixin.contains = mixin.include;
  mixin.strip = mixin.trim;
  mixin.lstrip = mixin.ltrim;
  mixin.rstrip = mixin.rtrim;

  $.extend(String.prototype, mixin);

})(jQuery);

