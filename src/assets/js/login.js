$(document).ready(function(){
    setTimeout(function() {
        $("body").animate({opacity: 1}, 1000);
    }, 750);
});

var toggleViewPasswordElement = document.getElementById("toggleViewPassword");
var userPassword =  document.getElementById("userPassword");
var id =  document.getElementById("cas");

toggleViewPasswordElement.addEventListener("click", toggleViewPassword);

// id.addEventListener("click", function nada () {
//     var containerpass = document.getElementById("container-pass")
//     containerpass.hidden = false;
// })

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


var nexusLogo = document.getElementById("nexusLogo");
nexusLogo.addEventListener("click", goToIndex);

function goToIndex() {
$(document).ready(function () {
    $("body").fadeOut("slow", function () {
      window.location.href = "index.html";
    });
});

}
