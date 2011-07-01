(function($) {

  /**
   * @namespace $.ext.mixins.Enumerable
   * Enumerable provides a large set of useful methods for enumerations — objects that act as collections of values.
   * Enumerable is a mixin: a set of methods intended not for standaone use, but for incorporation into other objects.
   * jqExt mixes Enumerable into Array class (making all methods of Enumerable available on array instances).
   */
  var Enumerable = {

    /**
     * <h6>Example:</h6>
     * <pre>
     *  ['one', 'two', 'three'].each(alert);
     *  // Alerts "one", then alerts "two", then alerts "three"
     * </pre>
     *
     * @function {public Enumerable} ?
     * Calls <tt>iterator</tt> for each item in the collection.
     * @param {Function} iterator - A <tt>Function(item, index)</tt> that expects an item in the collection as the first argument and a numerical index as the second.
     * @param {optional Object} context - the scope in which to call <tt>iterator</tt>. Affects what the keyword <tt>this</tt> means inside <tt>iterator</tt>.
     * @returns this enumerable instance
     **/
    each: function(iterator, context) {
      var index = 0;
      try {
        this._each(function(value) {
          iterator.call(context, value, index++);
        });
      } catch (e) {
        if (e != $.ext.$break) throw e;
      }
      return this;
    },

    /**
     * <h6>Examples:</h6>
     * <pre>
     *  ['Hitch', "Hiker's", 'Guide', 'to', 'the', 'Galaxy'].collect(function(s) {
     *    return s.charAt(0).toUpperCase();
     *  });
     *  // -> ['H', 'H', 'G', 'T', 'T', 'G']
     *
     *  [1,2,3,4,5].collect(function(n) {
     *    return n * n;
     *  });
     *  // -> [1, 4, 9, 16, 25]
     * </pre>
     *
     * @function {public Array} ?
     * Returns the result of applying `iterator` to each element. If no `iterator` is provided, the elements are simply copied to the returned array.
     * @param {Function} iterator - The iterator function to apply to each element in the enumeration. The function result is what will be returned for that item.
     * @param {optional Object} context - the scope in which to call <tt>iterator</tt>. Affects what the keyword <tt>this</tt> means inside <tt>iterator</tt>.
     * @returns the result of applying `iterator` to each element
     *
     **/
    collect: function(iterator, context) {
      var results = [];
      this.each(function(value, index) {
        results.push(iterator.call(context, value, index));
      });
      return results;
    },

    /**
     * @function {public int} ?
     * Finds index of the first element for which iterator return truthy value.
     * @param {Function} iterator - The iterator function to apply to each element in the enumeration
     * @param {optional Object} context - the scope in which to call <tt>iterator</tt>. Affects what the keyword <tt>this</tt> means inside <tt>iterator</tt>.
     * @returns index of the first element for which iterator returns true or -1
     */
    findIndex: function(iterator, context) {
      var result = -1;
      this.each(function(value, index) {
        if (iterator.call(context, value, index)) {
          result = index;
          throw $.ext.$break;
        }
      });
      return result;
    },

    /**
     * <h6>Examples:</h6>
     * <pre>
     *  [1,4,10,2,22].include(10);
     *  // -> true
     *
     *  ['hello', 'world'].include('HELLO');
     *  // -> false ('hello' != 'HELLO')
     *
     *  [1, 2, '3', '4', '5'].include(3);
     *  // -> true ('3' == 3)
     * </pre>
     * 
     * @function {public boolean} ?
     * Checks if given object included in this collection. Comparison is based on `==` comparison
     * operator (equality with implicit type conversion)
     * @param {Object} item - the object to check for inclusion in this collection
     * @returns true if given object is included
     **/
    include: function(item) {
      if ($.isFunction(this.indexOf)) return this.indexOf(item) != -1;

      var found = false;
      this.each(function(value) {
        if (value == item) {
          found = true;
          throw $.ext.$break;
        }
      });
      return found;
    },

    /**
     * <h6>Examples:</h6>
     * <pre>
     *  ['hello', 'world'].invoke('toUpperCase');
     *  // -> ['HELLO', 'WORLD']
     *
     *  ['hello', 'world'].invoke('substring', 0, 3);
     *  // -> ['hel', 'wor']
     *
     *  [1, 2, '3', '4', '5'].include(3);
     *  // -> true ('3' == 3)
     * </pre>
     * 
     * @function {public Array} ?
     * Invokes the same method, with the same arguments, for all items in a collection. Returns an array of the results of the method calls.
     * @param {String} method - name of the method to invoke.
     * @param {optional ...} args - optional arguments to pass to the method.
     * @returns array of the results of the method calls.
     **/
    invoke: function(method) {
      var args = $.makeArray(arguments).slice(1);
      return this.map(function(value) {
        return value[method].apply(value, args);
      });
    },

    /**
     * Elements are either compared directly, or by first calling `iterator` and comparing returned values.
     * If multiple "max" elements (or results) are equivalent, the one closest
     * to the end of the enumeration is returned.
     *
     * If provided, `iterator` is called with two arguments: The element being
     * evaluated, and its index in the enumeration; it should return the value
     * `max` should consider (and potentially return).
     *
     * <h6>Examples:</h6>
     * <pre>
     *  ['c', 'b', 'a'].max();
     *  // -> 'c'
     *
     *  [1, 3, '3', 2].max();
     *  // -> '3' (because both 3 and '3' are "max", and '3' was later)
     *
     *  ['zero', 'one', 'two'].max(function(item) { return item.length; });
     *  // -> 4
     * </pre>
     * 
     * @function {public ?} ?
     * Returns the maximum element (or element-based `iterator` result), or `undefined` if the enumeration is empty.
     * @param {optional Function} iterator - An optional function to use to evaluate each element in the enumeration; the function should return the value to test. If this is not provided, the element itself is tested.
     * @param {optional Object} context - the scope in which to call <tt>iterator</tt>. Affects what the keyword <tt>this</tt> means inside <tt>iterator</tt>.
     * @returns maxiumum element of the enumeration
     **/
    max: function(iterator, context) {
      iterator = iterator || Function.identityFn;
      var result;
      this.each(function(value, index) {
        value = iterator.call(context, value, index);
        if (result == null || value >= result)
          result = value;
      });
      return result;
    },

    /**
     * Elements are either compared directly, or by first calling `iterator` and comparing returned values.
     * If multiple "min" elements (or results) are equivalent, the one closest
     * to the beginning of the enumeration is returned.
     *
     * If provided, `iterator` is called with two arguments: The element being
     * evaluated, and its index in the enumeration; it should return the value
     * `min` should consider (and potentially return).
     *
     * <h6>Examples:</h6>
     * <pre>
     *  ['c', 'b', 'a'].min();
     *  // -> 'a'
     *
     *  [3, 1, '1', 2].min();
     *  // -> 1 (because both 1 and '1' are "min", and 1 was earlier)
     *
     *  ['un', 'deux', 'trois'].min(function(item) { return item.length; });
     *  // -> 2
     * </pre>
     *
     * @function {public ?} ?
     * Returns the minimum element (or element-based `iterator` result), or `undefined` if the enumeration is empty.
     * @param {optional Function} iterator - An optional function to use to evaluate each element in the enumeration; the function should return the value to test. If this is not provided, the element itself is tested.
     * @param {optional Object} context - the scope in which to call <tt>iterator</tt>. Affects what the keyword <tt>this</tt> means inside <tt>iterator</tt>.
     * @returns minimum element of the enumeration
     **/
    min: function(iterator, context) {
      iterator = iterator || Function.identityFn;
      var result;
      this.each(function(value, index) {
        value = iterator.call(context, value, index);
        if (result == null || value < result)
          result = value;
      });
      return result;
    },

    /**
     * <h6>Examples:</h6>
     * <pre>
     *  ['hello', 'world', 'this', 'is', 'nice'].property('length');
     *  // -> [5, 5, 4, 2, 4]
     *
     *  ['hello', 'world'].invoke('substring', 0, 3);
     *  // -> ['hel', 'wor']
     *
     *  [1, 2, '3', '4', '5'].include(3);
     *  // -> true ('3' == 3)
     * </pre>
     *
     * @function {public Array} ?
     * Fetches the same property for all items in a collection. Returns an array of the results of the property values.
     * @param {String} property - name of the property to return.
     * @returns array of the values of property on collection items
     **/
    property: function(property) {
      var results = [];
      this.each(function(value) {
        results.push(value[property]);
      });
      return results;
    },

    /**
     * <h6>Example:</h6>
     * <pre>
     *  [1, 'two', 3, 'four', 5].select($.isString);
     *  // -> ['two', 'four']
     * </pre>

     * @function {public Array} ?
     * Returns all the elements for which the iterator returned a truthy value.
     * @param {Function} iterator - An iterator function to use to test the elements.
     * @param {optional Object} context - the scope in which to call <tt>iterator</tt>. Affects what the keyword <tt>this</tt> means inside <tt>iterator</tt>.
     * @returns array of elements for which iterater returned true
     **/
    select: function(iterator, context) {
      var results = [];
      this.each(function(value, index) {
        if (iterator.call(context, value, index))
          results.push(value);
      });
      return results;
    },

    /**
     * @function {public int} ?
     * Returns sum of all collection items (or element-based `iterator` result), or `0` if the enumeration is empty.
     * @param {optional Function} iterator - An optional function to use to evaluate each element in the enumeration; the function should return the value to add to sum. If this is not provided, the element itself is added.
     * @param {optional Object} context - the scope in which to call <tt>iterator</tt>. Affects what the keyword <tt>this</tt> means inside <tt>iterator</tt>.
     * @returns sum of all collection items
     */
    sum: function(iterator, context) {
      iterator = iterator || Function.identityFn;
      var result = 0;
      this.each(function(value, index) {
        value = iterator.call(context, value, index);
        result += value;
      });
      return result;
    }

  };

  //define some aliases
  /** @function {public Array} ? alias for {@link collect} */
  Enumerable.map = Enumerable.collect;

  //add module to jquery ext modules collection
  $.ext.mixins.Enumerable = Enumerable;


})(jQuery);