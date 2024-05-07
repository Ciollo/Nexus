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
}