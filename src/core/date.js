jQuery.extend(Date.prototype, {

  /**
   * @function {public long} Array.?
   * Returns number of miliseconds between given date and this date. If date is not given, return number of miliseconds elapsed from now
   * @param {optional Date} from - calculate elapsed miliseconds from this date to given from date. Defaults to now date.
   * @returns number of miliseconds between given date and this date. if date is not given, return number of miliseconds elapsed from now
   */
  getElapsed: function(from) {
    return Math.abs((from || new Date()).getTime()-this.getTime());
  }

});