$(document).ready(function () {
  setTimeout(function () {
    $("body").animate({ opacity: 1 }, 1000);
  }, 750);
});

var toggleViewPasswordElement = document.getElementById("toggleViewPassword");
var userPassword = document.getElementById("userPassword");
var btnContinueSignIn = document.getElementById("btn-continue");
var userEmail = document.getElementById("userEmail");

toggleViewPasswordElement.addEventListener("click", toggleViewPassword);

btnContinueSignIn.addEventListener("click", continueSignIn);

userEmail.addEventListener("input", function () {
  checkEmailValidation(userEmail);
});

function isEmailValid(email) {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
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
    var continueContainer = document.getElementById("continue-container");
    var signInContainer = document.getElementById("sign-in-container");
    var containerPassword = document.getElementById("container-password");

    if (!containerPassword.classList.contains("hidden")) {
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
    var continueContainer = document.getElementById("continue-container");
    var signInContainer = document.getElementById("sign-in-container");
    var containerPassword = document.getElementById("container-password");

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

var btnSignIn = document.getElementById("btn-sign-in");
btnSignIn.addEventListener("click", goToHome);

function goToHome() {
  $(document).ready(function () {
    $("body").fadeOut("slow", function () {
      window.location.href = "home.html";
    });
  });
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
// TODO CHANGE WHEN DB IMPLEMENTED

function goToIndex() {
  $(document).ready(function () {
    $("body").fadeOut("slow", function () {
      window.location.href = "index.html";
    });
  });
}
