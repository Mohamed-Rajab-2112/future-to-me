$(document).ready(function() {
  // the default status for slide shows
  $(".page1").prop("checked",true);
  $(".slide2").hide();
  // function for navigatin scroll and set active navigation button when clicked
  var lastId,
      topMenu = $("#menu"),
      topMenuHeight,
      menuItems = topMenu.find("a"),
      scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });
  // function to get the current width of the window so we can update the distance needed before the menu button being active  
  function getTopMenuHeight() {
    topMenuHeight = $(window).width() > 770 ? topMenu.outerHeight()+15 : topMenu.outerHeight()+50
  };
  // calling the function to activate
  getTopMenuHeight();
  $(window).resize(getTopMenuHeight);
  //apply click event on menu li(s)
  menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight;
    $('html, body').stop().animate({ 
      scrollTop: offsetTop
    }, 1000);
    e.preventDefault();
  });
  // calling builtin scroll function on window query
  $(window).scroll(function(){
    var fromTop = $(this).scrollTop()+topMenuHeight*2;
    var cur = scrollItems.map(function(){
      if ($(this).offset().top < fromTop)
        return this;
    });
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
      console.log(id)
      menuItems.removeClass("active");
      menuItems.filter("[href='#"+id+"']").addClass("active");
    }                   
  });
  // portfolio section effects like the brown overlay when hover on images and slideshow
  $('#portfolio').find(".overlay").mouseenter(function() {
    $(this).parent("div").toggleClass("img-animation");
  });
  $('#portfolio').find(".overlay").mouseleave(function() {
    $(this).parent("div").toggleClass("img-animation");
  });
  $("#portfolio").find(".page1").click(function() {
    $(".page1").prop("checked",true);
    $(".page2").prop("checked",false);
    $(".slide2").slideUp();
    $(".slide1").slideDown();
  })
  $("#portfolio").find(".page2").click(function() {
    $(".page2").prop("checked",true);
    $(".page1").prop("checked",false);
    $(".slide1").slideUp();
    $(".slide2").slideDown();
  })
  // function to make contact details hidden for resolution less than 740
  function contactDetails () {
    if ($(document).width() >= 740) {
      $("#contact").find("article").show();
      $("#contact").find("h2").show();
      $("#contact").find("img").show();
      $("#contact").find("button").hide();
    }
    else {
      $("#contact").find("article").hide();
      $("#contact").find("h2").hide();
      $("#contact").find("img").hide();
      $("#contact").find("button").show();
    }
  }
  contactDetails();
  //  calling the function for event listener resize window (website width)
  $(window).resize(contactDetails);
  $("#contact").find("button").click(function() {
    $(this).closest("#contact").find("article").toggle();
  })
});