$(document).ready(function(){
    setTimeout(function() {
        $("body").animate({opacity: 1}, 1000);
    }, 750);
});


$(document).ready(function () {
  setTimeout(function () {
    $("body").fadeOut("slow", function () {
      window.location.href = "login.html";
    });
  }, 3000);
});
