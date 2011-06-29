module("Core - is.js");

test("Basic requirements", function() {

	ok( jQuery, "jQuery" );
	ok( $, "$" );

  ok( $.ext, "$.ext not present" );
  ok( $.ext.extender, "$.ext.extender not present" );

});

test("Extender: addUtilityMethods", function() {
  var a = 1;
  equal(false, jQuery.isUndefined(a));
  equal(true, jQuery.isUndefined(a.b));
  equal(true, jQuery.isArray([1,3]));
  equal(false, jQuery.isArray({}));
  equal(false, jQuery.isString({}));
  equal(false, jQuery.isNumber({}));
  equal(true, jQuery.isNumber(a));
  equal(true, jQuery.isString("asdf"));
});


