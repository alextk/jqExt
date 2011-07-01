module("OOP - inheritance.js");

test("Basic requirements", function() {
  ok($.ext.mixins.Observable, "$.ext.mixins.Observable not present");
});

test("test on() and fire()", function() {

  var AnimalClass = $.ext.Class.create({

      include: [$.ext.mixins.Observable],

      age: 21,

      initialize: function(name){
        this.name = name;
      },

      getName: function(){
        return this.name;
      },

      setName: function(value){
        var oldValue = this.name;
        this.name = value;
        this.fire('nameChange', {oldValue: oldValue, newValue: value});
      },

      say: function(){
        return this.getName();
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

    var DogClass = $.ext.Class.create(AnimalClass, {
      age: 21,

      initialize: function(name, age, gender){
        this.superMethod(name);
        this.age = age;
        this.gender = gender;
      },

      say: function(){
        return "Gav: " + this.superMethod();
      },

      getName: function(){
        return this.superMethod() + "!";
      }
    });

    var c1 = new CatClass('Pugi', 'Persian');
    c1.age = 32;
    var c2 = new CatClass('Muki', 'Street');
    var d1 = new DogClass('Dogi', 11, 'male');
    var d2 = new DogClass('Kari', 14, 'female');

    var triggered = false;
    var scope = this;
    var onC1NameChange = function(e, obj){
      triggered = true;
      equals(e.eventName, 'nameChange');
      equals(e.source, c1);
      equals(scope, this);
      equals(e.oldValue, undefined);
      equals(e.oldValue, undefined);
      equals(obj.oldValue, 'Pugi');
      equals(obj.newValue, 'Pugi1234');
    };
    c1.on('nameChange', onC1NameChange, scope);
    c1.setName('Pugi1234');
    ok(triggered);

});
