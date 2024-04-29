export function addClickListenersToButtons() {
  document.querySelectorAll(".setting-element").forEach((button) => {
    button.addEventListener("click", function () {
      let settingContent = document.getElementById("setting-content");
      switch (button.id) {
        case "setting-element-setting":
          settingsPanelContent(settingContent);
          break;
        case "setting-element-people":
          peoplePanelContent(settingContent);
          break;
        default:
        case "setting-element-upgrade":
          upgradePanelContent(settingContent);
          break;
          console.error("Button not found");
      }
    });
  });
}

function settingsPanelContent(settingContent) {
  settingContent.innerHTML = `
    <div class="setting-workspace-content">
      <div class="setting-workspace-content-title">
        Workspace's Settings
      </div>
      <div class="breakLine"></div>
      <div class="setting-workspace-content-element">
        <div class="setting-workspace-content-element-title">
          Workspace's name
        </div>
        <div class="setting-workspace-content-element-input">
          <input type="text" id="input-setting-workspace-name" class="input-setting-workspace-name">
        </div>
        <div class="breakLine"></div>
      </div>
      <div class="setting-workspace-content-element">
        <div class="setting-workspace-content-element-title">
          Icon
        </div>
        <div class="setting-workspace-content-element-icon">
          <img src="../assets/images/Nexus_logo_no_bg.png" alt="Workspace's logo" class="setting-workspace-icon">
        </div>
        <div class="breakLine"></div>
      </div>
      <div class="setting-workspace-content-button">
        <button class="btn-default btn-setting-workspace">Update</button>
        <button class="btn-cancel btn-setting-workspace">Cancel</button>
      </div>
    </div>`;
}

function peoplePanelContent(settingContent) {
  settingContent.innerHTML = "";
}

function upgradePanelContent(settingContent) {
  settingContent.innerHTML = "";
}