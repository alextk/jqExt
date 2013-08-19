module("Core - string.js");

test("Basic requirements", function() {
});

test("capitalize()", function() {
  equal("hello".capitalize(), "Hello");
  equal("HELLO".capitalize(), "Hello");
  equal("123ABC".capitalize(), "123abc");
  equal("".capitalize(), "");
  equal("A".capitalize(), "A");
  equal("a".capitalize(), "A");
});

test("camelize()", function() {
  equal("hello".camelize(), "Hello");
  equal("HELLO".camelize(), "HELLO");
  equal("123ABC".camelize(), "123ABC");
  equal("".camelize(), "");
  equal("A".camelize(), "A");
  equal("a".camelize(), "A");

  equal("my_underscored_string".camelize(), "MyUnderscoredString");
  equal("MyUnderscoredString".camelize(), "MyUnderscoredString");
  equal("myUnderscoredString".camelize(), "MyUnderscoredString");
});

test("format()", function() {
  equal("({0},{1})".format(11, 12), "(11,12)");
  equal("({0},{1}): {0}".format(11, 12), "(11,12): 11");
});

test("startsWith()", function() {
  equal(true, "  asdf  ".startsWith("  "));
  equal(true, "  asdf  ".startsWith("  a"));
  equal(false, "sdsd".startsWith("ds"));
  equal(true, "sdsd".startsWith("sdsd"));
  equal(true, "sdsd".startsWith("sd"));
  equal(false, "a sd sd".startsWith("sd"));
});

test("contains()", function() {
  equal(true, "  asdf  ".contains("  "));
  equal(true, "  asdf  ".contains("  a"));
  equal(true, "sdsd".contains("ds"));
  equal(true, "sdsd".contains("sdsd"));
  equal(true, "sdsd".contains("sd"));
  equal(false, "a sd sd".contains("asd"));
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

test("lpad()", function() {
  equal("asdf", "asdf".lpad(1, ' '));
  equal("asdf", "asdf".lpad(4, ' '));
  equal("  asdf", "asdf".lpad(6, ' '));
  equal("@@@asdf", "asdf".lpad(7, '@'));
});

test("rpad()", function() {
  equal("asdf", "asdf".rpad(1, ' '));
  equal("asdf", "asdf".rpad(4, ' '));
  equal("asdf  ", "asdf".rpad(6, ' '));
  equal("asdf@@@", "asdf".rpad(7, '@'));
});

test("underscore()", function() {
  equal("".underscore(), "");
  equal("aasdf".underscore(), "aasdf");
  equal("Aasdf".underscore(), "aasdf");
  equal("MyCamelCaseWord".underscore(), "my_camel_case_word");
  equal("yourCamelCaseWord".underscore(), "your_camel_case_word");
});



