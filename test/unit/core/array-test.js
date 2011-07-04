module("Core - array.js");

test("Basic requirements", function() {
});

test("clear()", function() {
  equal(0, [1,2,3].clear().length);
  equal(0, [].clear().length);
  var arr = [1,2,3];
  equal(3, arr.length);
  arr.clear();
  equal(0, arr.length);
  equal(undefined, arr[0]);
  equal(undefined, arr[1]);
});

test("clone()", function() {
  var arr1 = [1,2,3];
  var arr2 = arr1.clone();
  equal(3, arr1.length);
  equal(3, arr2.length);
  arr1.push(44);
  equal(3, arr2.length);
  equal(4, arr1.length);
  arr1[0] = 11;
  equal(11, arr1[0]);
  equal(1, arr2[0]);
  arr2.pop();
  equal(2, arr2.length);
  equal(4, arr1.length);
});

test("first()", function() {
  var arr1 = [1,2,3];
  equal(1, arr1.first());
  arr1[0] = 23;
  equal(23, arr1.first());
  arr1.clear();
  equal(undefined, arr1.first());
  equal(undefined, [].first());
});

test("last()", function() {
  var arr1 = [1,2,3];
  equal(3, arr1.last());
  arr1[arr1.length-1] = 23;
  equal(23, arr1.last());
  arr1.clear();
  equal(undefined, arr1.last());
  equal(undefined, [].last());
});

test("indexOf()", function() {
  var arr1 = [1,2,3];
  equal(0, arr1.indexOf(1));
  equal(2, arr1.indexOf(3));
  arr1[0] = 23;
  equal(-1, arr1.indexOf(1));
  equal(0, arr1.indexOf(23));
  arr1.push(2);
  equal(1, arr1.indexOf(2));
});

test("lastIndexOf()", function() {
  var arr1 = [1,2,3];
  equal(0, arr1.lastIndexOf(1));
  equal(2, arr1.lastIndexOf(3));
  arr1[0] = 23;
  equal(-1, arr1.lastIndexOf(1));
  equal(0, arr1.lastIndexOf(23));
  arr1.push(2);
  equal(3, arr1.lastIndexOf(2));
});

test("removeAt()", function() {
  var arr = [1,2,3];
  equal(1, arr.first());
  equal(3, arr.length);
  arr.removeAt(0);
  equal(2, arr.first());
  equal(2, arr.length);
  arr.removeAt(arr.length - 1);
  equal(1, arr.length);
  equal(2, arr.first());
});

test("remove()", function() {
  var arr = [1,2,3];
  equal(1, arr.first());
  equal(3, arr.length);
  arr.remove(2);
  equal(1, arr.first());
  equal(2, arr.length);
  equal(3, arr[1]);

  arr.push(2, 23, 2);
  equal(5, arr.length);
  arr.remove(2);
  equal(23, arr[2]);
  equal(2, arr[arr.length-1]);
});
