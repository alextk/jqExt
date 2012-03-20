jQuery.ext.Extender.addWrapedSetMethods({

  serializeObject: function() {
    var arrayData, objectData;
    arrayData = this.serializeArray();
    objectData = {};

    $.each(arrayData, function() {
      var value, name;

      name = this.name.replace('[]', '');

      if (this.value != null) {
        value = this.value;
      } else {
        value = '';
      }

      if (objectData[name] != null) {
        if (!objectData[name].push) {
          objectData[name] = [objectData[name]];
        }

        objectData[name].push(value);
      } else {
        objectData[name] = value;
      }
    });

    return objectData;
  }

}, true);
