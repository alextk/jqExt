module("Base");

test("Basic requirements", function() {

	ok( jQuery, "jQuery" );
	ok( $, "$" );

  ok( $.ext, "$.ext not present" );
  ok( $.ext.Extender, "$.ext.Extender not present" );

});

test("Extender: addUtilityMethods", function() {
  equal($.myTestMethod, undefined);
  $.ext.Extender.addUtilityMethods({myTestMethod: function(){ return 'mua puki'; } });
  notEqual($.myTestMethod, undefined);
  ok(jQuery.isFunction($.myTestMethod));
  equal('mua puki', $.myTestMethod());
});

test("Extender: addWrapedSetMethods", function() {
  equal($('<div/>').myTestMethod, undefined);
  $.ext.Extender.addWrapedSetMethods({myTestMethod: function(){ return $(this).children().length; } });
  notEqual($('<div/>').myTestMethod, undefined);
  equal(0, $('<div/>').myTestMethod());
  equal(1, $('<div><span>asdf</span></div>').myTestMethod());

  //try adding method that overrides existing method
  notEqual($('<div/>').width, undefined);
  equal($('<div/>').width(), 0);
  $.ext.Extender.addWrapedSetMethods({width: function(){ return 100; } }, true);
  equal($('<div/>').width(), 100);
  equal($('<div/>').jq_original_width(), 0);
});
