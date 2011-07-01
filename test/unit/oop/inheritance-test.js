module("OOP - inheritance.js");

test("Basic requirements", function() {
  ok($.ext.Class, "$.ext.Class not present");
});

test("creation", function() {

  var PersonClass = $.ext.Class.create({
    age: 21,

    initialize: function(name) {
      this.name = name;
    },

    sayName: function() {
      return "My name is: " + this.name;
    }
  });

  var p1 = new PersonClass('Yosi');
  var p2 = new PersonClass('David');
  p2.age = 33;

  equals(p1.age, 21);
  equals(p1.name, 'Yosi');
  equals(p1.sayName(), 'My name is: Yosi');

  equals(p2.age, 33);
  equals(p2.name, 'David');
  equals(p2.sayName(), 'My name is: David');

});

test("inheritance", function() {

  var AnimalClass = $.ext.Class.create({
    age: 21,

    initialize: function(name) {
      this.name = name;
    },

    getName: function() {
      return this.name;
    },

    say: function() {
      return this.getName();
    }
  });

  var CatClass = $.ext.Class.create(AnimalClass, {

    initialize: function(name, breed) {
      this.superMethod(name);
      this.breed = breed;
    },

    say: function() {
      return "Miau: " + this.superMethod();
    }
  });

  var DogClass = $.ext.Class.create(AnimalClass, {
    age: 21,

    initialize: function(name, age, gender) {
      this.superMethod(name);
      this.age = age;
      this.gender = gender;
    },

    say: function() {
      return "Gav: " + this.superMethod();
    },

    getName: function() {
      return this.superMethod() + "!";
    }
  });

  var c1 = new CatClass('Pugi', 'Persian');
  c1.age = 32;
  var c2 = new CatClass('Muki', 'Street');
  var d1 = new DogClass('Dogi', 11, 'male');
  var d2 = new DogClass('Kari', 14, 'female');
  equals(c1.age, 32);
  equals(c1.name, 'Pugi');
  equals(c2.name, 'Muki');
  equals(d1.name, 'Dogi');
  equals(d2.name, 'Kari');
  equals(c2.age, 21);
  equals(d1.age, 11);
  equals(d2.age, 14);
  equals(c1.say(), 'Miau: Pugi');
  equals(c2.say(), 'Miau: Muki');
  equals(d1.say(), 'Gav: Dogi!');
  equals(d2.say(), 'Gav: Kari!');
});

