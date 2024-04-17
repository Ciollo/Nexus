$(document).ready(function(){
    $("body").hide().fadeIn(1000);
});


$(document).ready(function () {
  setTimeout(function () {
    $("body").fadeOut("slow", function () {
      window.location.href = "login.html";
    });
  }, 3000);
});
