import { isEmailValid } from "../utils/emailUtils.js";
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

function checkEmailValidation(userEmail) {
	if (isEmailValid(userEmail.value)) {
		if (userEmail.classList.contains("border-error-red")) {
			userEmail.classList.remove("border-error-red");
		} else if (userEmail.classList.contains("border-default")) {
			userEmail.classList.remove("border-default");
		}

		userEmail.classList.add("border-confirm-green");
	} else {
		if (userEmail.classList.contains("border-confirm-green")) {
			userEmail.classList.remove("border-confirm-green");
		} else if (userEmail.classList.contains("border-default")) {
			userEmail.classList.remove("border-default");
		}
		userEmail.classList.add("border-error-red");
	}
}

function continueSignUp() {

  let userEmail = document.getElementById("userEmail");
  if (isEmailValid(userEmail.value)) {

    var containerUserPassword = document.getElementById(
      "container-user-password"
    );
    var containerUserUsername = document.getElementById(
      "container-user-username"
    );
    var containerUserConfirmPassword = document.getElementById(
      "container-user-confirm-password"
    );

    containerUserPassword.classList.remove("hidden");
    containerUserConfirmPassword.classList.remove("hidden");
    containerUserUsername.classList.remove("hidden");
    btnContinueSignUp.classList.remove("btn-continue");
    btnContinueSignUp.classList.add("btn-sign-up");
    btnContinueSignUp.innerHTML = "Sign Up";

    if (userEmail.classList.contains("border-error-red")) {
      userEmail.classList.remove("border-error-red");
    } else if (userEmail.classList.contains("border-default")) {
      userEmail.classList.remove("border-default");
    }

    userEmail.classList.add("border-confirm-green");
  } else {
    if (userEmail.classList.contains("border-confirm-green")) {
      userEmail.classList.remove("border-confirm-green");
    } else if (userEmail.classList.contains("border-default")) {
      userEmail.classList.remove("border-default");
    }
    userEmail.classList.add("border-error-red");
  }

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
userEmail.addEventListener("input", function () {
	checkEmailValidation(userEmail);
});