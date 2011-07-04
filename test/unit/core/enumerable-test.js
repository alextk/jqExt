module("Core - enumerable.js");

test("Basic requirements", function() {
});

test("each()", function() {
  var arr = [11,22,33];
  var str = "";
  arr.each(function(item, index){ str += "["+index+"]="+item+";"; });
  equals(str, "[0]=11;[1]=22;[2]=33;");
});
