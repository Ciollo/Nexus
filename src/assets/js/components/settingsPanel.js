export function addClickListenersToButtons() {
  document.querySelectorAll(".setting-element").forEach((button) => {
    button.addEventListener("click", function () {
      let settingContent = document.getElementById("setting-content");
      switch (button.id) {
        case "setting-element-setting":
          settingsPanelContent(settingContent);
          break;
        case "setting-element-people":
          break;
        default:
          console.error("Button not found");
      }
    });
  });
}

//TODO TO CONTINUE
function settingsPanelContent(settingContent) {
  settingContent.innerHTML = "";
  settingContent.innerHTML += "";
}
