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
