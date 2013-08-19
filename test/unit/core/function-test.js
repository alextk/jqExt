module("Core - function.js");

test("Basic requirements", function() {

});

test("bind", function() {
  ok( function(){}.bind, ".bind not present" );
  var argsToString = function(){ return jQuery.makeArray(arguments).join(','); };
  equal(argsToString(1,2,3), '1,2,3');
  equal(argsToString.bind(this, 9)(2,3), '9,2,3');

  var objClass = function(a, b){
    this.a = a;
    this.b = b;

    this.str = function(){
      return "("+this.a + "," + this.b+")(" + jQuery.makeArray(arguments).join(',') + ")";
    }
  };

  var o1 = new objClass(1,4);
  var o2 = new objClass(11,44);
  equal(o1.str(), "(1,4)()");
  equal(o1.str(100), "(1,4)(100)");
  equal(o1.str.bind(o2)(), "(11,44)()");
  equal(o1.str.bind(o2, 100)(), "(11,44)(100)");
  equal(o1.str.bind(o2, 100)(200), "(11,44)(100,200)");

});


