module("Core - object.js");

test("Basic requirements", function() {
});

test("keys()", function() {
  var keys = Object.keys({a: 1, age: 2});
  keys.sort();
  ok(keys.include('a'));
  ok(keys.include('age'));
  ok(!keys.include('age1'));
});