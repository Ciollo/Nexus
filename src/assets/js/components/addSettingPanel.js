// TODO per comodita' forse e' meglio fare il file html e poi metterlo nella funzione
export function addSettingPanel(overlay) {
	overlay.innerHTML = `
         <div class="container-user-setting-panel display-block" id="container-user-settings-panel">
            <div class="setting-navbar">
                <div class="setting-title">
                    Setting workspace
                </div>
                <div role="button" class="setting-element" id="setting-element-setting">
                    <i class='bx bx-cog'></i>
                    <span class="title-element">
                        Settings
                    </span>
                </div>
                <div role="button" class="setting-element" id="setting-element-people">
                    <i class='bx bxs-group'></i>
                    <span class="title-element"> </span>
                </div>
                <div role="button" class="setting-element" id="setting-element-upgrade">
                    <i class='bx bx-up-arrow-circle'></i>                    
                    <span class="title-element">
                        Upgrade
                    </span>
                </div>
            </div>
            <div class="setting-content" id="setting-content">
                <div class="setting-home-screen">
                    <img src="../assets/images/Nexus_logo_no_bg.png" alt="Nexus logo" class="img-setting-home-screen">
                </div>
            </div>
        </div>`;

	addClickListenersToButtons();
}

function addClickListenersToButtons() {
	document.querySelectorAll(".setting-element").forEach((button) => {
		button.addEventListener("click", function () {
			let settingContent = document.getElementById("setting-content");
			switch (button.id) {
				case "setting-element-setting":
					settingsPanelContent(settingContent);
					console.log("Setting button clicked");
					break;
				case "setting-element-people":
					// peoplePanelContent(settingContent);//TODO implementare
					console.log("Setting button clicked");
					break;
				case "setting-element-upgrade":
					// upgradePanelContent(settingContent); //TODO implementare
					console.log("Setting button clicked");
					break;
				default:
					console.error("Button not found");
					break;
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
