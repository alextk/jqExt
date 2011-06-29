jQuery.Event.Keys = {
  BACKSPACE: 8,
  TAB: 9,
  RETURN: 13,
  ENTER: 13,
  ESC: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETE: 46,
  HOME: 36,
  END: 35,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  INSERT: 45
};

jQuery.extend(jQuery.Event.prototype, {

  stopEvent: function(){
    this.preventDefault();
    this.stopPropagation();
  },

  isSpecialKey : function(){
    var k = this.which;
    return  (this.ctrlKey) || this.isNavKeyPress() ||
            (k == jQuery.Event.Keys.BACKSPACE) || // Backspace
            (k >= 16 && k <= 20) || // Shift, Ctrl, Alt, Pause, Caps Lock
            (k >= 44 && k <= 46);   // Print Screen, Insert, Delete
  },

  isNavKeyPress : function(){
    var k = this.which;
    return (k >= 33 && k <= 40) ||  // Page Up/Down, End, Home, Left, Up, Right, Down
            k == jQuery.Event.Keys.RETURN || k == jQuery.Event.Keys.TAB || k == jQuery.Event.Keys.ESC;
  },

  isBackspaceKey: function(){
    return this.which == jQuery.Event.Keys.BACKSPACE;
  },

  isDeleteKey: function(){
    return this.which == jQuery.Event.Keys.DELETE;
  },

  isTabKey: function(){
    return this.which == jQuery.Event.Keys.TAB;
  },

  isEnterKey: function(){
    return this.which == jQuery.Event.Keys.RETURN;
  },

  isEscKey: function(){
    return this.which == jQuery.Event.Keys.ESC;
  },

  isUpKey: function(){
    return this.which == jQuery.Event.Keys.UP;
  },

  isDownKey: function(){
    return this.which == jQuery.Event.Keys.DOWN;
  }

});