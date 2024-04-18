$(document).ready(function(){
    setTimeout(function() {
        $("body").animate({opacity: 1}, 1000);
    }, 750);
});

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

