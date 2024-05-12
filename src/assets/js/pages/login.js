import { isEmailValid } from "../utils/emailUtils.js";
import { isPasswordRobust } from "../utils/passwordUtils.js";
import { goToPage } from "../utils/goToPages.js";
import { toggleViewPassword } from "../utils/formUtils.js";

var btnSignIn = document.getElementById("btn-sign-in");
var nexusLogo = document.getElementById("nexusLogo");
var toggleViewPasswordElement = document.getElementById("toggleViewPassword");
var btnContinueSignIn = document.getElementById("btn-continue");
var userEmail = document.getElementById("userEmail");
var userPassword = document.getElementById("userPassword");
var linkSignUp = document.getElementById("link-sign-up");
var btnGoToSignUp = document.getElementById("btnGoToSignUp");

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

    let containerPassword = document.getElementById("container-password");
    if (!containerPassword.classList.contains("hidden")) {
      let userPassword = document.getElementById("userPassword");
      let continueContainer = document.getElementById("continue-container");
      let signInContainer = document.getElementById("sign-in-container");
      continueContainer.classList.remove("hidden");
      signInContainer.classList.add("hidden");
      containerPassword.classList.add("hidden");
      userPassword.value = "";
    }
  }
}

function continueSignIn() {
  let userEmail = document.getElementById("userEmail");
  if (isEmailValid(userEmail.value)) {
    //console.log(userEmail.value);

    let continueContainer = document.getElementById("continue-container");
    let signInContainer = document.getElementById("sign-in-container");
    let containerPassword = document.getElementById("container-password");

    continueContainer.classList.add("hidden");
    signInContainer.classList.remove("hidden");
    containerPassword.classList.remove("hidden");

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

function checkPasswordValidation (userPassword){
  console.log(userPassword.value);
  if (isPasswordRobust(userPassword.value)) {
    if (userPassword.classList.contains("border-error-red")) {
      userPassword.classList.remove("border-error-red");
    } else if (userPassword.classList.contains("border-default")) {
      userPassword.classList.remove("border-default");
    }

    userPassword.classList.add("border-confirm-green");
  } else {
    if (userPassword.classList.contains("border-confirm-green")) {
      userPassword.classList.remove("border-confirm-green");
    } else if (userPassword.classList.contains("border-default")) {
      userPassword.classList.remove("border-default");
    }
    userPassword.classList.add("border-error-red");
  }
}

navBarSetUp();

function navBarSetUp() {
  nexusLogo.addEventListener("click", function () {
    goToPage("home.html");
  });
  btnGoToSignUp.addEventListener("click", function () {
    goToPage("register.html");
  });
}

linkSignUp.addEventListener("click", function () {
  goToPage("register.html");
});

toggleViewPasswordElement.addEventListener("click", function () {
  let userPassword = document.getElementById("userPassword");
  toggleViewPassword(userPassword, toggleViewPasswordElement);
});

btnContinueSignIn.addEventListener("click", continueSignIn);
userEmail.addEventListener("input", function () {
  checkEmailValidation(userEmail);
});