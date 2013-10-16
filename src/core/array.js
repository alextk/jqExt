(function($) {

  /**
   * @namespace Array
   * <p>@depends $.ext.mixins.Enumerable</p>
   */
  var mixin = {

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
      if (index >= 0 && index < this.length){
        var rest = this.slice(index + 1);
        this.length = index;
        this.push.apply(this, rest);
      }
      return this;
    },

    /**
     * @function {public Array} ?
     * Remove given item from this array instance. Note if multiple occurences of this item are present, all of them are removed.
     * @param {?} item - remove this item from array
     * @returns this array instance
     */
    remove: function(item) {
      do{
        var index = this.indexOf(item);
        this.removeAt(index);
      }while(index >= 0);
      return this;
    },

    /**
     * @function {public Array} ?
     * Returns the index of the first object in self such that is == to obj. If a block is given instead of an argument, returns first object for which block is true. Returns -1 if no match is found.
     * @param {?} item_or_block - remove this item from array
     * @returns index or -1 if no match found
     */
    index: function(item_or_block, context){
      if(!$.isFunction(item_or_block)) return this.indexOf(item_or_block);
      if(arguments.length == 1) context = this;

      var result = -1;
      this.each(function(value, index) {
        if (item_or_block.call(context, value, index)) {
          result = index;
          throw $.ext.$break;
        }
      });
      return result;
    },

    /**
     * <h6>Examples:</h6>
     * <pre>
     *  [1, 3, 4].append(10, 20, 30)
     *  // -> [1, 3, 4, 10, 20 ,30]
     *
     *  a = ['hello', 'world']
     *  a.append('!', '!!!']
     *  a
     *  // -> ['hello', 'world', '!', '!!!']
     *
     * </pre>
     *
     * @function {public Array} ?
     * Add items to the end of this array and returns the array (for chaining)
     * @param {...} - variable list of items to append to the end of array
     * @returns this array instance modified to include passed items. Note that no new array instance is created
     **/
    append: function(){
      if(arguments.length > 0) this.push.apply(this, arguments);
      return this;
    },

    /**
     * <h6>Examples:</h6>
     * <pre>
     *  [1, 3, 4].prepend(10, 20, 30)
     *  // -> [10, 20 ,30, 1, 3, 4]
     *
     *  a = ['hello', 'world']
     *  a.append('!', '!!!']
     *  a
     *  // -> ['!', '!!!', 'hello', 'world']
     *
     * </pre>
     *
     * @function {public Array} ?
     * Add items to the start of this array and returns the array (for chaining)
     * @param {...} - variable list of items to add to the start of array
     * @returns this array instance modified to include passed items. Note that no new array instance is created
     **/
    prepend: function(){
      for(var i=arguments.length-1; i>=0; i--){
        this.unshift(arguments[i]);
      }
      return this;
    },

    /**
     * <h6>Examples:</h6>
     * <pre>
     *  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].n_groups_of(3)
     *  // -> [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
     *
     * </pre>
     *
     * @function {public Array} ?
     * Split this array to equal sized groups of given size. Last group might be smaller than size.
     * @param {Integer} size - number of items in
     * @returns array of arrays (each item is an array of given size)
     **/
    in_groups_of: function(size){
      var result = [];
      var a = this.clone();
      while (a.length > 0) result.push(a.splice(0, size));
      return result;
    },

    /**
     * @function {public void} ?
     * This method is required for mixin in the enumerable module. Uses javascript 1.6 Array.prototype.forEach native implementation if present.
     * @param iterator
     * @param context
     */
    _each: function(iterator, context) {
      for (var i = 0, length = this.length >>> 0; i < length; i++) {
        if (i in this) iterator.call(context, this[i], i, this);
      }
    }

  };

  // use native browser JS 1.6 implementation if available
  if (Array.prototype.indexOf){ delete mixin.indexOf; }
  if (Array.prototype.lastIndexOf){ delete mixin.lastIndexOf; }
  if (Array.prototype.forEach){ mixin._each = Array.prototype.forEach; }

  //define aliases
  //mixin.delete = mixin.remove; // NOTE!! delete is a reservred keyword, generates syntax error in some browsers to use it as method/attribute name
  mixin.deleteAt = mixin.removeAt;

  $.extend(Array.prototype, mixin);
  $.extend(Array.prototype, $.ext.mixins.Enumerable);


})(jQuery);