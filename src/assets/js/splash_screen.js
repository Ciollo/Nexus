console.log("splash_screen.js");
$(document).ready(function () {
  setTimeout(function () {
    $("body").fadeOut("slow", function () {
      window.location.href = "login.html";
    });
  }, 3000);
});
