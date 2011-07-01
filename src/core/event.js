(function($) {

  /**
   * @object {public static} $.Event.Keys
   * Defines contants for common keycode mappings
   */
  $.Event.Keys = {
    /** @variable ? backspace key */
    BACKSPACE: 8,
    /** @variable ? tab key */
    TAB: 9,
    /** @variable ? alias for enter key */
    RETURN: 13,
    /** @variable ? enter key */
    ENTER: 13,
    /** @variable ? esc key */
    ESC: 27,
    /** @variable ? left arrow key */
    LEFT: 37,
    /** @variable ? up arrow key */
    UP: 38,
    /** @variable ? right arrow key */
    RIGHT: 39,
    /** @variable ? down arrow key */
    DOWN: 40,
    /** @variable ? backspace key */
    DELETE: 46,
    /** @variable ? home key */
    HOME: 36,
    /** @variable ? end key */
    END: 35,
    /** @variable ? page up key */
    PAGE_UP: 33,
    /** @variable ? page down key */
    PAGE_DOWN: 34,
    /** @variable ? insert key */
    INSERT: 45
  };

  $.extend($.Event.prototype,
    /**
     * @class $.Event
     * jQuery event object extended functionality documentation
     */
    {

    /**
     * @function {public void} ?
     * Stop event propagation and prevent default action
     */
    stopEvent: function() {
      this.preventDefault();
      this.stopPropagation();
    },

    /**
     * @function {public boolean} ?
     */
    isSpecialKey : function() {
      var k = this.which;
      return  (this.ctrlKey) || this.isNavKeyPress() ||
        (k == $.Event.Keys.BACKSPACE) || // Backspace
        (k >= 16 && k <= 20) || // Shift, Ctrl, Alt, Pause, Caps Lock
        (k >= 44 && k <= 46);   // Print Screen, Insert, Delete
    },

    /**
     * @function {public boolean} ?
     * This method checks if key that was pressed was navigation key: tab, enter, esc, arrow keys, pageup/down, home or end
     * @returns true if navigation key was pressed
     */
    isNavKeyPress : function() {
      var k = this.which;
      return (k >= 33 && k <= 40) || // Page Up/Down, End, Home, Left, Up, Right, Down
        k == $.Event.Keys.RETURN || k == $.Event.Keys.TAB || k == $.Event.Keys.ESC;
    },

    /**
     * @function {public boolean} ?
     */
    isBackspaceKey: function() {
      return this.which == $.Event.Keys.BACKSPACE;
    },

    /**
     * @function {public boolean} ?
     */
    isDeleteKey: function() {
      return this.which == $.Event.Keys.DELETE;
    },

    /**
     * @function {public boolean} ?
     */
    isTabKey: function() {
      return this.which == $.Event.Keys.TAB;
    },

    /**
     * @function {public boolean} ?
     */
    isEnterKey: function() {
      return this.which == $.Event.Keys.RETURN;
    },

    /**
     * @function {public boolean} ?
     */
    isEscKey: function() {
      return this.which == $.Event.Keys.ESC;
    },

    /**
     * @function {public boolean} ?
     */
    isUpKey: function() {
      return this.which == $.Event.Keys.UP;
    },

    /**
     * @function {public boolean} ?
     */
    isDownKey: function() {
      return this.which == $.Event.Keys.DOWN;
    }

  });


})(jQuery);