module("Core - math.js");

test("Basic requirements", function() {
  ok( Math.uuid, "Math.emptyFn not present" );
});

test("uuid", function() {
  var map = {};
  for(var i=0; i<1000; i++){
    var uuid = Math.uuid();
    ok(undefined == map[uuid], 'asdf');
    map[uuid] = i;
  }
});


