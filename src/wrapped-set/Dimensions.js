jQuery.ext.Extender.addWrapedSetMethods(
  /**
   * @namespace $()
   * jQuery wrapped set methods
   */
  {

    /**
     * Return object that contains this element top,left,bottom,right coordinates relative to the document
     * @param outer (default true) - outerWidth/outerHeight (including padding and borders) coordinates are returned.
     */
    region: function(outer) {
      var self = jQuery(this);
      
      var offset = self.offset();
      var top = Math.ceil(offset.top);
      var left = Math.ceil(offset.left);
      var w, h;
      if (outer === false) {
        w = self.width();
        h = self.height();
      } else {
        w = self.outerWidth();
        h = self.outerHeight();
      }
      return {top: top, left: left, right: left + w, bottom: top + h};
    },

    outerHeight: function(outerOrHeight, includeMargins) {
      if (!this[0]) return null;

      if (jQuery.isNumber(outerOrHeight)) { //set outerHeight of component
        var delta = this.jq_original_outerHeight(includeMargins) - this.height();
        return this.height(outerOrHeight - delta);
      } else { //invoke original jquery getter
        return this.jq_original_outerHeight.apply(this, arguments);
      }
    },

    outerWidth: function(outerOrWidth, includeMargins) {
      if (!this[0]) return null;

      if (jQuery.isNumber(outerOrWidth)) {
        var delta = this.jq_original_outerWidth(includeMargins) - this.width();
        return this.width(outerOrWidth - delta);
      } else { //invoke original jquery getter
        return this.jq_original_outerWidth.apply(this, arguments);
      }
    },

    /**
     * @function {public boolean} ?
     * Return true if this element is contained inside one of the given parents.
     * @param {Array} possibleParents - array of jQuery wrapped sets or plain elements which are the parents to search for containment of this element
     * @returns true if first element of the wrapped set is contained in at least one of the given parents
     */
    containedIn: function(possibleParents) {
      if (!this[0]) return null;
      if (!jQuery.isArray(possibleParents)) possibleParents = [possibleParents];

      var el = this[0];
      for (var i = 0; i < possibleParents.length; i++) {
        var p = possibleParents[i];
        if (p instanceof jQuery) p = possibleParents[i].get(0);
        if (jQuery.contains(p, el)) return true; //clicked element is inside this component, so no blur is needed
      }
      return false;
    }

  }, true);
