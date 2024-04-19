$(document).ready(function () {
  setTimeout(function () {
    $("body").animate({ opacity: 1 }, 1000);
  }, 750);
});

var goToSignBtn = document.getElementById("goToSignBtn");
var goToSignUpBtn = document.getElementById("goToSignUpBtn");

goToSignBtn.addEventListener("click", goToLogin);
goToSignUpBtn.addEventListener("click", goToRegister);

function goToLogin() {
  $(document).ready(function () {
    $("body").fadeOut("slow", function () {
      window.location.href = "login.html";
    });
  });
}

function goToRegister() {
  $(document).ready(function () {
    $("body").fadeOut("slow", function () {
      window.location.href = "register.html";
    });
  });
}