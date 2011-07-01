(function($) {

  /**
   * @namespace $.ext.mixins.Observable
   * This is a module (=mixin), that can be included in any object prototype to provide that object instances with
   * event handling capabilities.
   */
  var ObservableModule = {

    __initListeners: function(eventName) {
      this.__listeners = this.__listeners || {};
      this.__listeners[eventName] = this.__listeners[eventName] || [];
    },

    /**
     * There are 3 parameter forms, see below for detailed parameter information. Examples:
     * <pre>
     *   //Bind single event to handler
     *   obj.on('someEvent', handlerFunc, scope, [arg1, arg2, arg3]);
     *
     *   //Bind multiple events to the same handler
     *   obj.on('event1 event2 event3', handlerFunc, scope, [arg1, arg2, arg3]);
     *
     *   //Bind multiple events to different handles with the same scope and bind args:
     *   obj.on({
     *    event1: handlerFunc1,
     *    event2: handlerFunc2,
     *    scope: sameScopeObj,
     *    args: [1,2,3]
     *   });
     *
     *   //Bind multiple events to different handles with various scope and bind args:
     *   obj.on({
     *    event1: { fn: handlerFunc1, scope: otherObj1, args: [1,2,3] },
     *    event2: { fn: handlerFunc2, scope: otherObj2, args: [4,5,6] }
     *   });
     * </pre>
     * 
     * @function {public void} ?
     * Add listener to this object.
     * @paramset Classic
     * @param {String} eventName - name of the event (or multiple events names separated by space)
     * @param {Function} handler - function to invoke when event is fired
     * @param {optional Object} scope - the scope to invoke handler function in. If not specified or null, defaults to the object firing the event
     * @param {optional Object} args - arguments to pass to the handler function as part of the event object (bindArgs property of the event object)
     * <pre>
     *   //<b>Bind single event to handler</b>: <u>someEvent</u> of <u>obj</u> will be bound to <u>handlerFunc</u> which will be
     *   //invoked in scope <u>scope</u>, and event object <u>bindArgs</u> property will be <u>[arg1, arg2, arg3]</u>
     *   obj.on('someEvent', handlerFunc, scope, [arg1, arg2, arg3]);
     *
     *   //Bind multiple events to the same handler
     *   obj.on('event1 event2 event3', handlerFunc, scope, [arg1, arg2, arg3]);
     * </pre>
     *
     * @paramset Config object - type 1
     * @param {Object} options - configuration hash with keys being event names and values handler functions. In addition, scope and args keys can be specified.
     * @... {Function} eventName1 - key is the event name, value is handler function
     * @... {optional Object} scope - the scope to invoke all handler functions in. If not specified or null, defaults to the object firing the event
     * @... {optional Object} args - arguments to pass to all handler functions as part of the event object (bindArgs property of the event object)
     * <pre>
     *   //Bind multiple events to different handles with the same scope and bind args:
     *   obj.on({
     *    event1: handlerFunc1,
     *    event2: handlerFunc2,
     *    scope: sameScopeObj,
     *    args: [1,2,3]
     *   });
     * </pre>
     *
     * @paramset Config object - type 2
     * @param {Object} options - configuration hash with keys being event names and values configuration objects. In addition, scope and args keys can be specified.
     * @... {Function} eventName1 - key is the event name, value is configuration object with the following keys:
     * <ul>
     *   <li><code><span class="type">Function</span> fn</code> - function to invoke when event is fired</li>
     *   <li><code>[ <span class="type">Object</span> scope ]</code> - scope to invoke fn in</li>
     *   <li><code>[ <span class="type">Object</span> args ]</code> - bind args to pass as part of event object</li>
     * </ul>
     * @... {optional Object} scope - the scope to invoke all handler functions in. If not specified or null, defaults to the object firing the event
     * @... {optional Object} args - arguments to pass to all handler functions as part of the event object (bindArgs property of the event object)
     *
     * <pre>
     *   //Bind multiple events to different handles with various scope and bind args:
     *   obj.on({
     *    event1: { fn: handlerFunc1, scope: otherObj1, args: [1,2,3] },
     *    event2: { fn: handlerFunc2, scope: otherObj2, args: [4,5,6] }
     *   });
     * </pre>
     */
    addListener: function(eventName, handler, scope, args) {
      if ($.type(eventName) === "string" && eventName.length > 0) { //event name is string: use form1
        if (eventName.indexOf(' ') == -1) {
          handler = handler || null;
          var listenerObj = {fn: handler, scope: scope || this, args: args || null};
          if (!this.hasListener(eventName, listenerObj.fn, listenerObj.scope, listenerObj.args)) {
            this.__initListeners(eventName);
            this.__listeners[eventName].push(listenerObj);
          }
        } else { //attach multiple events to the same handler, e.g: obj.on('focus blur', function(e){ alert(e) })
          var eventNames = eventName.split(' ');
          for (var i = 0; i < eventNames.length; i++) {
            this.addListener.call(this, eventNames[i], handler, scope, args);
          }
        }
      } else { //event name is object (use form2): attaching multiple listeners to multiple events
        var globalOpts = eventName;
        for (var name in globalOpts) {
          if (name != 'scope' && name != 'args'){ //skip scope and args keys (can't be event names)
            var eventOptsOrHandler = globalOpts[name];
            this.addListener(name, eventOptsOrHandler.fn || eventOptsOrHandler, eventOptsOrHandler.scope || globalOpts.scope, {args: eventOptsOrHandler.args || globalOpts.args});
          }
        }
      }
      return this;
    },

    /**
     * Usages:
     *  - Remove specific listener for event: obj.removeListener('someEvent', eventListener)
     *  - Remove all listeners for event: obj.removeListener('someEvent')
     *  - Remove all events: myObject.un()
     *  - Remove multiple listeners for events (if listener value for event is null - all listeners for this event will be unbound):
     *          obj.un({event1: event1Listener, event2: event2Listener, event3: null, ...});
     *  - Remove all listeners for multiple events: myObject.un('event1 event2 event3');
     * @function {public Object} ?
     * Remove listeners from this object.
     */
    removeListener: function(eventName, handler, options) {
      if ($.type(eventName) === "string" && eventName.length > 0) {
        if (eventName.indexOf(' ') == -1) {
          this.__initListeners(eventName);
          if (arguments.length == 1) { //remove all listeners for this eventName
            this.__listeners[eventName].clear();
          } else {
            options = options || {};
            var l = this.findListener(eventName, handler, options.scope || this, options.args || null);
            if (l !== null) {
              this.__listeners[eventName].remove(l);
            }
          }
        } else { //attach multiple events to the same handler, e.g: obj.on('focus blur', function(e){ alert(e) })
          var eventNames = eventName.split(' ');
          for (var i = 0; i < eventNames.length; i++) {
            this.removeListener.call(this, eventNames[i], handler, options);
          }
        }
      } else { //event name is object, attaching multiple listeners to multiple events
        var globalOpts = eventName;
        for (var name in globalOpts) {
          if (name != 'scope' && name != 'args'){ //skip scope and args keys (can't be event names)
            var eventOptsOrHandler = globalOpts[name];
            this.removeListener(name, eventOptsOrHandler.fn || eventOptsOrHandler, eventOptsOrHandler.scope || globalOpts.scope, {args: eventOptsOrHandler.args || globalOpts.args});
          }
        }
      }
      return this;
    },

    /**
     * @function {public boolean} ?
     * Checks if this object has listener.
     * @param eventName
     * @param fn
     * @param scope
     * @param args
     * @returns true if this object has listener for given eventName, handler function scope and args
     */
    hasListener: function(eventName, fn, scope, args) {
      return this.findListener(eventName, fn, scope, args) !== null;
    },

    /**
     * @function {public Object} ?
     * Find listener metadata object that corresponds to given parameters
     * @param eventName
     * @param fn
     * @param scope
     * @param args
     * @returns listenerObject
     * @... {Function} fn - handler function
     * @... {Object} scope - scope in which to invoke handler function
     * @... {Object} args - arguments to pass as part of event
     */
    findListener: function(eventName, fn, scope, args) {
      this.__initListeners(eventName);
      var listeners = this.__listeners[eventName];
      for (var i = 0; i < listeners.length; i++) {
        var l = listeners[i];
        if (l.fn == fn && l.scope == scope && l.args == args){
          return l;
        }
      }
      return null;
    },

    /**
     * Note if one of the listeners throws an error, other listeners don't get invoked, and error is propagated. If your
     * listener can throw error, but you want to allow normal excecution, wrap your listener code in try/catch.
     * 
     * @function {public Array} ?
     * Fire all registered listeners for given event name.
     * @param {String} eventName - event name to fire listeners for
     * @param args... - arguments to pass to handler functions after the event object
     * @returns array of listeners return values (in the order of invokation) or false if excecution has been terminated by returning $.ext.$break from handler function (listener)
     */
    fireListener: function(eventName) {
      this.__initListeners(eventName);
      var listenersReturnValues = [];
      var args = $.makeArray(arguments).slice(1); //remove eventName (first argument)
      var e = {eventName: eventName, source: this, bindArgs: null}; //event object
      args.unshift(e); //add event object as the first parameter to the arguments list
      for (var i = 0; i < this.__listeners[eventName].length; ++i) {
        var l = this.__listeners[eventName][i];
        e.bindArgs = l.args;

        var res = l.fn.apply(l.scope, args) || null; //apply listener

        if(res == $.ext.$break){
          return false;
        }

        listenersReturnValues.push(res);
      }
      return listenersReturnValues;
    }

  };

  //define some aliases
  /** @function {public void} ? alias for {@link addListener} */
  ObservableModule.on = ObservableModule.addListener;
  /** @function {public void} ? alias for {@link removeListener} */
  ObservableModule.un = ObservableModule.removeListener;
  /** @function {public Array} ? alias for {@link fireListener} */
  ObservableModule.fire = ObservableModule.fireListener;

  //add module to jquery ext modules collection
  $.ext.mixins.Observable = ObservableModule;

})(jQuery);

