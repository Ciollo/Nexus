import { goToPage } from "../utils/goToPages.js";

var linkSignIn = document.getElementById("link-sign-in");
var toggleViewPasswordElement = document.getElementById("toggleViewPassword");
var userPassword = document.getElementById("userPassword");
var btnContinueSignUp = document.getElementById("btn-continue");
var nexusLogo = document.getElementById("nexusLogo");
var toggleViewConfirmPassword = document.getElementById("toggleViewConfirmPassword");

$(document).ready(function () {
  setTimeout(function () {
    $("body").animate({ opacity: 1 }, 1000);
  }, 750);
});

function continueSignUp() {
  var containerUserPassword = document.getElementById(
    "container-user-password"
  );
  var containerUserUsername = document.getElementById(
    "container-user-username"
  );
  var containerUserConfirmPassword = document.getElementById(
    "container-user-confirm-password"
  );

  containerUserUsername.hidden = false;
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


linkSignIn.addEventListener("click", function () {
  goToPage("login.html");
});
nexusLogo.addEventListener("click", function () {
  goToPage("home.html");
});

toggleViewPasswordElement.addEventListener("click", function () {
  toggleViewPassword(toggleViewPasswordElement, userPassword);
});

toggleViewConfirmPassword.addEventListener("click", function () {
  toggleViewPassword(toggleViewConfirmPassword, userConfirmPassword);
});

btnContinueSignUp.addEventListener("click", continueSignUp);
