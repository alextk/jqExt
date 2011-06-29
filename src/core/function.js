jQuery.extend(Function, {
  emptyFn: function(){},
  identityFn: function(value) { return value; }
});

jQuery.extend(Function.prototype, {

  /**
   * Binds this function to the given context by wrapping it in another function and returning the wrapper.
   * Whenever the resulting "bound" function is called, it will call the original ensuring that this is set to context.
   * Also optionally curries arguments for the function
   * @param context - context to bind this function to
   */
  bind: function(context){
    if (arguments.length < 2 && jQuery.isUndefined(arguments[0])) return this;
    var self = this;
    var bindArgs = null; //remove context argument
    if(arguments.length > 1) bindArgs = Array.prototype.slice.call(arguments, 1);
    return function() {
      //append method arguments to bind arguments and call the original function in context
      var a = arguments;
      if(bindArgs){
        a = bindArgs;
        if(arguments.length > 0){
          var aLength = a.length, argsLength = arguments.length;
          while (argsLength--) a[aLength + argsLength] = arguments[argsLength]; //this is the fastest was of appending elements to array
        }
      }
      return self.apply(context, a);
    }
  }

});
