jQuery.extend(RegExp, {

    /**
     * @function {public String} RegExp.?
     * Escapes the passed string for use in a regular expression
     * @param {String} str - string in which special regular expression character will be escaped
     * @returns escaped regular expession string
     */
    escape : function(str) {
      return str.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1");
    }

  });
