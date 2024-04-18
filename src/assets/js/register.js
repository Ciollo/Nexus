$(document).ready(function () {
  setTimeout(function () {
    $("body").animate({ opacity: 1 }, 1000);
  }, 750);
});

var toggleViewPasswordElement = document.getElementById("toggleViewPassword");
var userPassword = document.getElementById("userPassword");
var btnContinueSignUp = document.getElementById("btn-continue");
var toggleViewConfirmPassword = document.getElementById("toggleViewConfirmPassword");

toggleViewPasswordElement.addEventListener("click", function() {
  toggleViewPassword(toggleViewPasswordElement, userPassword);
});

toggleViewConfirmPassword.addEventListener("click", function() {
  toggleViewPassword(toggleViewConfirmPassword, userConfirmPassword);
});
btnContinueSignUp.addEventListener("click", continueSignUp);

function continueSignUp() {
  var containerUserPassword = document.getElementById("container-user-password");
  var containerUserConfirmPassword = document.getElementById("container-user-confirm-password");


  containerUserPassword.hidden = false;
containerUserConfirmPassword.hidden = false;
  btnContinueSignUp.classList.remove("btn-continue");
  btnContinueSignUp.classList.add("btn-sign-up");
  btnContinueSignUp.innerHTML = "Sign Up";
}

function toggleViewPassword(toggleElement, passwordInput) {
  if (toggleElement.classList.contains("bxs-hide")) {
    toggleElement.classList.remove("bxs-hide");
    toggleElement.classList.add("bxs-show");
    passwordInput.type = "text";
  } else {
    toggleElement.classList.remove("bxs-show");
    toggleElement.classList.add("bxs-hide");
    passwordInput.type = "password";
  }
}


var linkSignIn = document.getElementById("link-sign-in");

linkSignIn.addEventListener("click", goToSignIn);

function goToSignIn() {
  $(document).ready(function () {
    $("body").fadeOut("slow", function () {
      window.location.href = "login.html";
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
