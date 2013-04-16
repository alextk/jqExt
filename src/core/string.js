jQuery.extend(String.prototype, /** @scope String */{

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
   * Returns copy of this string with all dashes removed and words converted to uppercase => UpperCamelCase. If passed argument is true, returns lowerCamelCase
   * @params {Boolean} lowerCamelCase - if true, will return string in lowerCamelCase (first letter is lowercased)
   * @returns copy of this in UpperCamelCase. If passed argument is true, returns lowerCamelCase
   */
  camelize: function(lowerCamelCase) {
    if(this.length == 0) return this;
    var result = this.split('_').collect(function(s){ return s.capitalize(); }).join('');
    if(lowerCamelCase === true){
      result = result.charAt(0).toLowerCase() + result.substring(1);
    }
    return result;
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
  contains: function(anotherString) {
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
  },

  /**
   * @function {public String} ?
   * Converts a camelized string into a series of words separated by an underscore (_)
   * @returns all camelized letters converted to undercase with _ between them
   */
  underscore: function() {
    return this.replace(/::/g, '/')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
      .replace(/([a-z\d])([A-Z])/g, '$1_$2')
      .replace(/-/g, '_')
      .toLowerCase();
  },

  /**
   * @function {public boolean} ?
   * This method prepends this string to the given length with given pad character
   * @param {Integer} len - length of the padded string (including added character, if length is less than string length this string will not be modified)
   * @param {String} pad - character to prepend
   * @returns true if this string ends with given string
   */
  padLeft: function(len, pad){
    if(this.length > len) return this;
    return Array(len + 1 - this.length).join(pad) + this;
  },

  /**
   * @function {public boolean} ?
   * This method appends this string to the given length with given pad character
   * @param {Integer} len - length of the padded string (including added character, if length is less than string length this string will not be modified)
   * @param {String} pad - character to prepend
   * @returns true if this string ends with given string
   */
  padRight: function(len, pad){
    if(this.length > len) return this;
    return this + Array(len + 1 - this.length).join(pad);
  }

});
