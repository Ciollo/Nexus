let btnCloseOpenNavbar = document.getElementById("btn-close-open-navbar");
let btnSettings = document.getElementById("btn-page-settings");

function toggleNavbar() {
  btnCloseOpenNavbar.classList.toggle("btn-navbar-not-active");
  btnCloseOpenNavbar.classList.toggle("btn-navbar-active");

  let navbar = document.getElementById("navbar-side");
  navbar.classList.toggle("navbar-side-not-active");
  navbar.classList.toggle("navbar-side-active");

  let imgTitle = document.getElementById("img-title");
  imgTitle.classList.toggle("display-none");
  imgTitle.classList.toggle("display-block");

  let textNavbar = document.querySelectorAll(".nav-link-title");
  for (let i = 0; i < textNavbar.length; i++) {
    let text = textNavbar[i];
    text.classList.toggle("display-none");
    text.classList.toggle("display-block");
  }

  let mainPageContent = document.querySelector(".main-page-content");
  mainPageContent.classList.toggle("main-page-content-not-active");
  mainPageContent.classList.toggle("main-page-content-active");

}

function toggleOverlayVisibility() {
  let mainOverlay = document.getElementById("main-overlay");
  mainOverlay.classList.toggle('display-none');
  mainOverlay.classList.toggle('display-block');
}

function openSettingsPanel() {
  toggleOverlayVisibility();
  let settingsPanel = document.getElementById("container-user-settings-panel");;
  settingsPanel.classList.toggle("display-none");
  settingsPanel.classList.toggle("display-block");
}

btnCloseOpenNavbar.addEventListener("click", toggleNavbar);
btnSettings.addEventListener("click", openSettingsPanel);