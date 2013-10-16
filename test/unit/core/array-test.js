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
  arr.removeAt(-1);
  equal('1,2,3', arr.join(','));
  arr.removeAt(0);
  equal(2, arr.first());
  equal('2,3', arr.join(','));
  arr.removeAt(arr.length - 1);
  equal('2', arr.join(','));
  arr.removeAt(5);
  equal('2', arr.join(','));
});

test("remove()", function() {
  var arr = [1,2,3,2,4,3];
  arr.remove(2);
  equal('1,3,4,3', arr.join(','));
  arr.remove(3);
  equal('1,4', arr.join(','));
  arr.remove(33);
  equal('1,4', arr.join(','));
});

test("append()", function() {
  var arr = [1,2,3];
  ok($.isArray(arr.append(10, 11, 222)));
  equal(arr.length, 6);
  equal(arr.last(), 222);
});

test("prepend()", function() {
  var arr = [1,2,3];
  ok($.isArray(arr.prepend(10, 11, 222)));
  equal(arr.length, 6);
  equal(arr.first(), 10);
  equal(arr.last(), 3);
});

test("in_groups_of()", function() {
  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] ;
  var groups = arr.in_groups_of(3);
  equal(arr.length, 10);
  equal(groups.length, 4);
  equal(groups[0].join(','), '1,2,3');
  equal(groups[1].join(','), '4,5,6');
  equal(groups[2].join(','), '7,8,9');
  equal(groups[3].join(','), '10');
  equal([].in_groups_of(3).length, 0);

  arr = [11];
  groups = arr.in_groups_of(4);
  equal(groups.length, 1);
  equal(groups[0].join(','), '11');
});

test("index()", function() {
  var arr = [1,2,3];
  equal(-1, arr.index(33));
  equal(0, arr.index(1));
  equal(2, arr.index(3));
  equal(1, arr.index(function(i){ return i%2==0; }));
});
