import { addClickListenersToButtons } from "../components/settingsPanel.js";
// import { addPage } from "../components/addPage.js";
import { addSettingPanel } from "../components/addSettingPanel.js";
import {
  openComponentPanel,
  closeComponentPanel,
  isAddComponentTriggered,
} from "../utils/addComponent.js";

// let btnCloseOpenNavbar = document.getElementById("btn-close-open-navbar");
let btnSettings = document.getElementById("btn-page-settings");
let mainOverlay = document.getElementById("main-overlay");
// let addPageBtn = document.getElementById("add-page-navbar-option");
let userContent = document.getElementById("user-content");

function toggleOverlayVisibility() {
  mainOverlay.classList.toggle("display-none");
  mainOverlay.classList.toggle("display-block");
}

function openSettingsPanel() {
  toggleOverlayVisibility();
  addSettingPanel(mainOverlay);

  // let settingsPanel = document.getElementById("container-user-settings-panel");
  // settingsPanel.classList.toggle("display-none");
  // settingsPanel.classList.toggle("display-block");
}

addClickListenersToButtons();

btnSettings.addEventListener("click", openSettingsPanel);

mainOverlay.addEventListener("click", function (event) {
  let settingsPanel = document.getElementById("container-user-settings-panel");
  if (!settingsPanel.contains(event.target)) {
    mainOverlay.innerHTML = "";
    toggleOverlayVisibility();
  }
});

// addPageBtn.addEventListener("click", addPage);

userContent.addEventListener("input", function (event) {
  let newTextContent = event.target.textContent;
  const triggerCharacter = "/+"; //TODO maybe dopo si cambia per farlo scegliere all'utente

  if (isAddComponentTriggered(newTextContent, triggerCharacter)) {
    openComponentPanel();
  } else {
    closeComponentPanel();
  }
});
