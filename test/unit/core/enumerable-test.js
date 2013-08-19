module("Core - enumerable.js");

test("Basic requirements", function() {
});

test("each()", function() {
  var arr = [11,22,33];
  var str = "";
  arr.each(function(item, index){ str += "["+index+"]="+item+";"; });
  equals(str, "[0]=11;[1]=22;[2]=33;");
});

test("detect()", function() {
  var arr = [6,11,22,33];
  equals(11, arr.detect(function(item, index){ return item % 2 == 1 }));
  equals(undefined, arr.detect(function(item, index){ return item % 222 == 0 }));
});

test("include()", function() {
  var arr = [6,11,22,33];
  equals(true, arr.include(22));
  equals(false, []);
  equals(false, arr.include(222));
});

test("min()", function() {
  var arr = [6,11,22,33,4,5];
  equals(undefined, [].min());
  equals(4, arr.min());
  equals(0, arr.min(function(i){ return i%11; }));
});

test("max()", function() {
  var arr = [6,11,22,33,4,5];
  equals(undefined, [].max());
  equals(3, [11,22,3].max(function(i){ return i%11; }));
});

test("sum()", function() {
  equals(0, [].sum());
  equals(6, [1,2,3].sum());
  equals(10, ['zero', 'one', 'two'].sum(function(item) { return item.length; }));
});
