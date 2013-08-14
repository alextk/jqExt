module("jQuery - events on plain objects");

test("test on() and fire()", function() {

  var AnimalClass = $.ext.Class.create({
    age: 21,

    initialize: function(name){
      this.name = name;
    },

    getName: function(){
      return this.name;
    },

    setName: function(value){
      var oldValue = this.name;
      if($(this).trigger('beforeNameChange', {oldValue: oldValue, newValue: value})){
        this.name = value;
        $(this).trigger('nameChange', {oldValue: oldValue, newValue: value});
      }
    }

  });

  var CatClass = $.ext.Class.create(AnimalClass, {

    initialize: function(name, breed){
      this.superMethod(name);
      this.breed = breed;
    },

    say: function(){
      return "Miau: " + this.superMethod();
    }
  });

  var c1 = new CatClass('capara1');
  equals(c1.getName(), 'capara1');
  var triggered = [];
  $(c1).on('nameChange', function(e, params){
    triggered.push('nameChange');
    equals(e.target, c1);
  });
  c1.setName('zlu4ka');
  equals(triggered.length, 1);
  equals(triggered.include('nameChange'), true);
  equals(c1.getName(), 'zlu4ka');

  triggered.clear();
  $(c1).on('nameChange.ns1', function(e, params){
    triggered.push('nameChange.ns1');
  });
  c1.setName('zlu4ka2');
  equals(triggered.length, 2);
  equals(triggered.include('nameChange'), true);
  equals(triggered.include('nameChange.ns1'), true);

  triggered.clear();
  $(c1).off('nameChange.ns1');
  c1.setName('zlu4ka3');
  equals(triggered.length, 1);
  equals(triggered.include('nameChange'), true);

  triggered.clear();
  $(c1).on('nameChange.ns1', function(e, params){
    triggered.push('nameChange.ns1');
  });
  $(c1).off('nameChange');
  c1.setName('zlu4ka4');
  equals(triggered.length, 0);

  triggered.clear();
  $(c1).on('beforeNameChange', function(e, params){
    triggered.push('beforeNameChange1');
    return false;
  });
  $(c1).on('beforeNameChange', function(e, params){
    triggered.push('beforeNameChange2');
    //return 44;
  });
  $(c1).on('nameChange', function(e, params){
    triggered.push('nameChange');
  });
  var e = $.Event('beforeNameChange');
  var triggerResult = $(c1).triggerHandler(e);
  equals(triggerResult, e.result);
  equals(triggerResult, false);
  equals(triggered.length, 2);
  equals(triggered.include('beforeNameChange1'), true);
  equals(triggered.include('beforeNameChange2'), true);

});
