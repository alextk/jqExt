module("Core - string.js");

test("Basic requirements", function() {
});

test("format()", function() {
  equal("(11,12)", "({0},{1})".format(11, 12));
  equal("(11,12): 11", "({0},{1}): {0}".format(11, 12));
});

test("startsWith()", function() {
  equal(true, "  asdf  ".startsWith("  "));
  equal(true, "  asdf  ".startsWith("  a"));
  equal(false, "sdsd".startsWith("ds"));
  equal(true, "sdsd".startsWith("sdsd"));
  equal(true, "sdsd".startsWith("sd"));
  equal(false, "a sd sd".startsWith("sd"));
});

test("include()", function() {
  equal(true, "  asdf  ".include("  "));
  equal(true, "  asdf  ".include("  a"));
  equal(true, "sdsd".include("ds"));
  equal(true, "sdsd".include("sdsd"));
  equal(true, "sdsd".include("sd"));
  equal(false, "a sd sd".include("asd"));
});

test("endsWith()", function() {
  equal(true, "  asdf  ".endsWith("  "));
  equal(true, "  asdf  ".endsWith("f  "));
  equal(false, "sdsd".endsWith("ds"));
  equal(true, "sdsd".endsWith("sdsd"));
  equal(true, "sdsd".endsWith("sd"));
  equal(false, "a sd sd a".endsWith("sd"));
});

test("trim()", function() {
  equal("asdf", "  asdf  ".trim());
  equal("as df", "  as df  ".trim());
  equal("as df", "  as df".trim());
  equal("as df", "as df".trim());
  equal("", " ".trim());
  equal("", "".trim());
});



