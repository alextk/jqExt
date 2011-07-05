jQuery.extend(String.prototype, /** @scope String */{

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
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
  }

});