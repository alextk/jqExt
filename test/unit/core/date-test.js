module("Core - date.js");

test("Basic requirements", function() {
});

test("nextMonth()", function() {
  var nextMonth = null;

  nextMonth = new Date(2012, 7, 2).nextMonth();
  equal(nextMonth.getFullYear(), 2012);
  equal(nextMonth.getMonth(), 8);
  equal(nextMonth.getDate(), 1);

  nextMonth = new Date(2012, 11, 12).nextMonth();
  equal(nextMonth.getFullYear(), 2013);
  equal(nextMonth.getMonth(), 0);
  equal(nextMonth.getDate(), 1);

  nextMonth = new Date(2012, 11, 1).nextMonth();
  equal(nextMonth.getFullYear(), 2013);
  equal(nextMonth.getMonth(), 0);
  equal(nextMonth.getDate(), 1);
});


test("prevMonth()", function() {
  var prevMonth = null;

  prevMonth = new Date(2012, 7, 2).prevMonth();
  equal(prevMonth.getFullYear(), 2012);
  equal(prevMonth.getMonth(), 6);
  equal(prevMonth.getDate(), 1);

  prevMonth = new Date(2012, 0, 15).prevMonth();
  equal(prevMonth.getFullYear(), 2011);
  equal(prevMonth.getMonth(), 11);
  equal(prevMonth.getDate(), 1);
});



test("strftime()", function() {
  equal(new Date(2012, 7, 2).strftime('%d-%m-%Y'), '02-08-2012');
});
