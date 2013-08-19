module("Core - is.js");

test("Basic requirements", function() {

	ok( jQuery, "jQuery" );
	ok( $, "$" );

  ok( $.ext, "$.ext not present" );
  ok( $.ext.Extender, "$.ext.Extender not present" );

});

test("Extender: addUtilityMethods", function() {
  var a = 1;
  equal(false, $.isUndefined(a));
  equal(true, $.isUndefined(a.b));
  equal(true, $.isArray([1,3]));
  equal(false, $.isArray({}));
  equal(false, $.isString({}));
  equal(false, $.isNumber({}));
  equal(true, $.isNumber(a));
  equal(true, $.isString("asdf"));
  equal(true, $.isBoolean(true));
  equal(true, $.isBoolean(false));
  equal(false, $.isBoolean('false'));
  equal(false, $.isBoolean('true'));
});


