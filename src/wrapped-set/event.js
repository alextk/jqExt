jQuery.ext.Extender.addWrapedSetMethods({

  bindLater: function(type, data, fn, when) {
    var timeout = 200;
    if (arguments.length == 4){
      timeout = Array.prototype.pop.call(arguments); //full form: $().bind('click', {arg1: 2, arg2: 'asdf'}, function(){ //do stuff}, 4000);
    }
    else if (arguments.length == 3 && jQuery.isFunction(data) && jQuery.isNumber(fn)) {
      timeout = Array.prototype.pop.call(arguments);
    }
    else if (arguments.length == 2 && typeof type === "object" && jQuery.isNumber(data)) {
      timeout = Array.prototype.pop.call(arguments);
    }

    var self = this;
    var args = arguments;
    window.setTimeout(function() {
      self.bind.apply(self, args);
    }, timeout);
    return this;
  }

}, true);