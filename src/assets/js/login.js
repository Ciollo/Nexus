$(document).ready(function () {
  setTimeout(function () {
    $("body").animate({ opacity: 1 }, 1000);
  }, 750);
});

var toggleViewPasswordElement = document.getElementById("toggleViewPassword");
var userPassword = document.getElementById("userPassword");
var btnContinueSignIn = document.getElementById("btn-continue");

toggleViewPasswordElement.addEventListener("click", toggleViewPassword);

btnContinueSignIn.addEventListener("click", continueSignIn);

function continueSignIn() {
  var containerpass = document.getElementById("container-pass");
  containerpass.hidden = false;
  btnContinueSignIn.classList.remove("btn-continue");
  btnContinueSignIn.classList.add("btn-sign-in");
  btnContinueSignIn.innerHTML = "Sign In";
}

function toggleViewPassword() {
  if (toggleViewPasswordElement.classList.contains("bxs-hide")) {
    toggleViewPasswordElement.classList.remove("bxs-hide");
    toggleViewPasswordElement.classList.add("bxs-show");
    userPassword.type = "text";
  } else {
    toggleViewPasswordElement.classList.remove("bxs-show");
    toggleViewPasswordElement.classList.add("bxs-hide");
    userPassword.type = "password";
  }
}

var linkSignUp = document.getElementById("link-sign-up");

linkSignUp.addEventListener("click", goToSignUp);

function goToSignUp() {
  $(document).ready(function () {
    $("body").fadeOut("slow", function () {
      window.location.href = "register.html";
    });
  });
}

var nexusLogo = document.getElementById("nexusLogo");
nexusLogo.addEventListener("click", goToIndex);

function goToIndex() {
  $(document).ready(function () {
    $("body").fadeOut("slow", function () {
      window.location.href = "index.html";
    });
  });
}
