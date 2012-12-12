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

test("beginningOfMonth()", function() {
  var beginningOfMonth = null;

  beginningOfMonth = new Date(2012, 7, 12).beginningOfMonth();
  equal(beginningOfMonth.getFullYear(), 2012);
  equal(beginningOfMonth.getMonth(), 7);
  equal(beginningOfMonth.getDate(), 1);

  beginningOfMonth = new Date(2012, 0, 1).beginningOfMonth();
  equal(beginningOfMonth.getFullYear(), 2012);
  equal(beginningOfMonth.getMonth(), 0);
  equal(beginningOfMonth.getDate(), 1);
});

test("endOfMonth()", function() {
  var endOfMonth = null;

  endOfMonth = new Date(2012, 5, 12).endOfMonth(); //12 of June 2012
  equal(endOfMonth.getFullYear(), 2012);
  equal(endOfMonth.getMonth(), 5);
  equal(endOfMonth.getDate(), 30);

  endOfMonth = new Date(2012, 1, 5).endOfMonth(); //5 of February 2012
  equal(endOfMonth.getFullYear(), 2012);
  equal(endOfMonth.getMonth(), 1);
  equal(endOfMonth.getDate(), 29);

  endOfMonth = new Date(2011, 1, 5).endOfMonth(); //5 of February 2011
  equal(endOfMonth.getFullYear(), 2011);
  equal(endOfMonth.getMonth(), 1);
  equal(endOfMonth.getDate(), 28);
});


test("nextDay()", function() {
  var nextDay = null;

  nextDay = new Date(2012, 5, 12).nextDay(); //12 of June 2012
  equal(nextDay.getFullYear(), 2012);
  equal(nextDay.getMonth(), 5);
  equal(nextDay.getDate(), 13);

  nextDay = new Date(2012, 8, 23).nextDay(); //23 of Sep 2012 (day changing hours at 02:00 hour forward)
  equal(nextDay.getFullYear(), 2012);
  equal(nextDay.getMonth(), 8);
  equal(nextDay.getDate(), 24);
});


test("prevDay()", function() {
  var prevDay = null;

  prevDay = new Date(2012, 5, 12).prevDay(); //12 of June 2012
  equal(prevDay.getFullYear(), 2012);
  equal(prevDay.getMonth(), 5);
  equal(prevDay.getDate(), 11);

  prevDay = new Date(2012, 8, 24).prevDay(); //23 of Sep 2012 (day changing hours at 02:00 hour forward)
  equal(prevDay.getFullYear(), 2012);
  equal(prevDay.getMonth(), 8);
  equal(prevDay.getDate(), 23);
});



test("strftime()", function() {
  equal(new Date(2012, 7, 2).strftime('%d-%m-%Y'), '02-08-2012');
});
