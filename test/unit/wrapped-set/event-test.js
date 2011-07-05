module("WrappedSet - event.js");

test("Basic requirements", function() {
});

asyncTest("bindLater()", function() {
  var clicked = {
    bind1: false,
    bind2: false,
    bind3: false,
    bindLater1: false,
    bindLater2: false,
    bindLater3: false,
    bindLater4: false,
    bindLater5: false,
    bindLater6: false
  };
  $(document).bind('click', function(event){ clicked.bind1 = true; });
  $(document).bindLater('click', function(event){ clicked.bindLater1 = true; });

  $(document).bind('click', {arg1: 33}, function(event){
    clicked.bind2 = true;
    equals(event.data.arg1, 33);
  });

  $(document).bindLater('click', {arg1: 133}, function(event){
    clicked.bindLater2 = true;
    equals(event.data.arg1, 133);
  });

  $(document).bind({
    click: function(event){ clicked.bind3 = true; }
  });

  $(document).bindLater({
    click: function(event){ clicked.bindLater3 = true; }
  });
  $(document).bindLater('click', function(event){ clicked.bindLater4 = true; }, 100);

  $(document).bindLater('click', {arg1: 555}, function(event){
    clicked.bindLater5 = true;
    equals(event.data.arg1, 555);
  }, 100);

  $(document).bindLater({
    click: function(event){ clicked.bindLater6 = true; }
  }, 100);

  setTimeout(function(){
    $(document).click();
    ok(clicked.bind1, "document bind('click', func) wans't called");
    ok(clicked.bind2, "document bind('click', {arg1: 33}, func) wans't called");
    ok(clicked.bind3, "document bind({click: func}) wans't called");
    ok(clicked.bindLater1, "document bindLater('click', func) wans't called");
    ok(clicked.bindLater2, "document bindLater('click', {arg1: 133}, func) wans't called");
    ok(clicked.bindLater3, "document bindLater({click: func}) wans't called");
    ok(clicked.bindLater4, "document bindLater('click', func, timeout) wans't called");
    ok(clicked.bindLater5, "document bindLater('click',  {arg1: 555}, func, timeout) wans't called");
    ok(clicked.bindLater6, "document bindLater({click: func}, timeout) wans't called");
    start();
  }, 500);

});