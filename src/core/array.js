(function($) {

  var mixin = /** @scope Array */ {

    /**
     * <h6>Example:</h6>
     * <pre>
     *  var stuff = ['Apple', 'Orange', 'Juice', 'Blue'];
     *  stuff.clear();
     *  // -> []
     *  stuff
     *  // -> []
     * </pre>
     *
     * @function {public Array} ?
     * Clears the array (makes it empty) and returns the array reference.
     *
     * @returns new string with all whiteshapce removed from the start and end of this string
     */
    clear: function() {
      this.length = 0;
      return this;
    },

    /**
     * @function {public Array} ?
     * Returns a duplicate of the array, leaving the original array intact.
     **/
    clone: function() {
      return Array.prototype.slice.call(this, 0);
    },

    /**
     * @function {public ?} ?
     * Returns array's first item (e.g. <tt>array[0]</tt>).
     **/
    first: function() {
      return this[0];
    },

    /**
     * @function {public ?} ?
     * Returns array's last item (e.g. <tt>array[array.length - 1]</tt>).
     **/
    last: function() {
      return this[this.length - 1];
    },

    /**
     * <h6>Example:</h6>
     * <pre>
     *  [3, 5, 6, 1, 20].indexOf(1)
     *  // -> 3
     *
     *  [3, 5, 6, 1, 20].indexOf(90)
     *  // -> -1 (not found)
     *
     *  ['1', '2', '3'].indexOf(1);
     *  // -> -1 (not found, 1 !== '1')
     * </pre>
     *
     * @function {public int} ?
     * Returns the index of the first occurrence of <tt>item</tt> within the array,
     * or <tt>-1</tt> if <tt>item</tt> doesn't exist in the array. Compares items using *strict equality* (===).
     * @param {?} item - value that may or may not be in the array.
     * @param {optional int} offset - number of initial items to skip before beginning the search.
     * @returns index of first occurence of <tt>item</tt> in the array or <tt>-1</tt> if not found.
     **/
    indexOf: function(item, i) {
      i = i || 0;
      var length = this.length;
      if (i < 0) i = length + i;
      for (; i < length; i++)
        if (this[i] === item) return i;
      return -1;
    },

    /**
     * @function {public int} ?
     * Returns the position of the last occurrence of <tt>item</tt> within the array or <tt>-1</tt> if <tt>item</tt> doesn't exist in the array.
     * @param {?} item - value that may or may not be in the array.
     * @param {optional int} offset - number of items at the end to skip before beginning the search.
     * @returns position of the last occurrence of <tt>item</tt> within the array or <tt>-1</tt> if not found
     * @see indexOf
     **/
    lastIndexOf: function(item, i) {
      i = isNaN(i) ? this.length : (i < 0 ? this.length + i : i) + 1;
      var n = this.slice(0, i).reverse().indexOf(item);
      return (n < 0) ? n : i - n - 1;
    },

    /**
     * @function {public Array} ?
     * Remove item at specified index. Modifies this instance of array.
     * @param {int} index - index to remove item at
     * @return this array instance
     */
    removeAt: function(index) {
      if (index < 0) throw 'index cant be negative';
      var rest = this.slice(index + 1);
      this.length = index;
      this.push.apply(this, rest);
      return this;
    },

    /**
     * @function {public Array} ?
     * Remove given item from this array instance. Note if multiple occurences of this item are present, only the first one is removed.
     * @param {?} item - remove this item from array
     * @returns this array instance
     */
    remove: function(item) {
      var index = this.indexOf(item);
      if (index >= 0) this.removeAt(index);
      return this;
    },

    /**
     * @function {public void} ?
     * This method is required for mixin in the enumerable module. Uses javascript 1.6 native implementation if present.
     * @param iterator
     * @param context
     */
    _each: function(iterator, context) {
      for (var i = 0, length = this.length >>> 0; i < length; i++) {
        if (i in this) iterator.call(context, this[i], i, this);
      }
    }

  };

  if (Array.prototype.indexOf) delete mixin.indexOf; // use native browser JS 1.6 implementation if available
  if (Array.prototype.lastIndexOf) delete mixin.lastIndexOf; // use native browser JS 1.6 implementation if available
  if (Array.prototype.forEach){ // use native browser JS 1.6 implementation if available
    mixin._each = Array.prototype.forEach;
  }


  $.extend(Array.prototype, mixin);
  $.extend(Array.prototype, $.ext.mixins.Enumerable);


})(jQuery);