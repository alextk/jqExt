jQuery.extend(Date.prototype, /** @scope Date */{
  locale: 'en-US',

  /**
   * @function {public long} ?
   * Returns number of miliseconds between given date and this date. If date is not given, return number of miliseconds elapsed from now
   * @param {optional Date} from - calculate elapsed miliseconds from this date to given from date. Defaults to now date.
   * @returns number of miliseconds between given date and this date. if date is not given, return number of miliseconds elapsed from now
   */
  getElapsed: function(from){
    return Math.abs((from || new Date()).getTime() - this.getTime());
  },

  /**
   * @function {public Date} ?
   * Returns date of this day with hours, minutes, seconds and miliseconds set to 0
   */
  beginningOfDay: function(){
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0);
  },

  /**
   * @function {public Date} ?
   * Returns date of this day with hours, minutes, seconds and miliseconds set to 23:59:59:999
   */
  endOfDay: function(){
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), 23, 59, 59, 999);
  },

  /**
   * @function {public Date} ?
   * Returns next day date beginning of day (for example if this date is 23/09/2012 11:33 -> 24/09/2012 00:00
   */
  nextDay: function(){
    var tmp = new Date(this.endOfDay().getTime() + 100);
    return tmp.beginningOfDay();
  },

  /**
   * @function {public Date} ?
   * Returns previous day date at beginning of day (for example if this date is 23/09/2012 11:33 -> 22/09/2012 00:00
   */
  prevDay: function(){
    var tmp = new Date(this.beginningOfDay().getTime() - 100);
    return tmp.beginningOfDay();
  },

  /**
   * @function {public Date} ?
   * Returns date of the next month (if today is 25/12/2012 --> 01/01/2013)
   */
  nextMonth: function(){
    if(this.getMonth() == 11){
      return new Date(this.getFullYear() + 1, 0, 1);
    }else{
      return new Date(this.getFullYear(), this.getMonth() + 1, 1);
    }
  },

  /**
   * @function {public Date} ?
   * Returns date of the previous month (if today is 25/01/2012 --> 01/12/2011)
   */
  prevMonth: function(){
    if(this.getMonth() == 0){
      return new Date(this.getFullYear() - 1, 11, 1);
    }else{
      return new Date(this.getFullYear(), this.getMonth() - 1, 1);
    }
  },

  /**
   * @function {public Date} ?
   * Returns date of the first day of this date's month (if today is 25/01/2012 --> 01/01/2012)
   */
  beginningOfMonth: function(){
    return new Date(this.getFullYear(), this.getMonth(), 1);
  },

  /**
   * @function {public Date} ?
   * Returns date of the last day of this date's month (if today is 25/01/2012 --> 31/01/2012)
   */
  endOfMonth: function(){
    var tmp = new Date(this.nextMonth() - 1);
    return new Date(tmp.getFullYear(), tmp.getMonth(), tmp.getDate());
  },

  /**
   * @function {public Date} ?
   * Formats current date by given strftime pattern and returns resulting string
   * (see man strftime or http://hacks.bluesmoon.info/strftime/demo.html)
   */
  strftime: function(format){
    // Fix locale if declared locale hasn't been defined
    // After the first call this condition should never be entered unless someone changes the locale
    if(!(this.locale in Date.strftime_helper.locales)){
      this.locale = 'en-US';
    }

    var d = this;
    // First replace aggregates
    while(format.match(/%[cDhnrRtTxXzZ]/)){
      format = format.replace(/%([cDhnrRtTxXzZ])/g, function(m0, m1){
        var f = Date.strftime_helper.aggregates[m1];
        return (f == 'locale' ? Date.strftime_helper.locales[d.locale][m1] : f);
      });
    }


    // Now replace formats - we need a closure so that the date object gets passed through
    var str = format.replace(/%([aAbBCdegGHIjmMpPSuUVwWyY%])/g, function(m0, m1){
      var f = Date.strftime_helper.formats[m1];
      if(typeof(f) == 'string'){
        return d[f]();
      }else if(typeof(f) == 'function'){
        return f.call(d, d);
      }else if(typeof(f) == 'object' && typeof(f[0]) == 'string'){
        return Date.strftime_helper.util.xPad(d[f[0]](), f[1]);
      }else{
        return m1;
      }
    });
    d = null;
    return str;
  }

});