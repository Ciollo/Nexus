// TODO per comodita' forse e' meglio fare il file html e poi metterlo nella funzione
export function addSettingPanel(overlay) {
  overlay.innerHTML = `
         <div class="container-user-setting-panel display-block" id="container-user-settings-panel">
            <div class="setting-navbar">
                <div class="setting-title">
                    Settings
                </div>
                <div role="button" class="setting-element" id="setting-element-setting">
                    <i class='bx bx-cog'></i>
                    <span class="title-element">
                        Settings
                    </span>
                </div>
                <div role="button" class="setting-element" id="setting-element-people">
                    <i class='bx bxs-group'></i>
                    <span class="title-element">
                      User
                    </span>
                </div>
                <div role="button" class="setting-element" id="setting-element-upgrade">
                    <i class='bx bx-up-arrow-circle'></i>                    
                    <span class="title-element">
                        Info
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

let originalTitle = '';
let originalDescription = '';

function settingsPanelContent(settingContent) {
  settingContent.innerHTML = `
  <div class="setting-workspace-content" style="max-height: 600px; overflow-y: auto;">
      <div class="setting-workspace-content-title">
          Settings of page
      </div>
      <div class="breakLine"></div>
      <div class="setting-workspace-content-element">
          <div class="setting-workspace-content-element-title">
              Title of page
          </div>
          <div class="setting-workspace-content-element-input">
              <input type="text" id="input-setting-workspace-name" class="input-setting-workspace-name">
          </div>
          <div class="breakLine"></div>
      </div>
      <div class="setting-workspace-content-element">
          <div class="setting-workspace-content-element-title">
              Description of page
          </div>
          <div class="setting-workspace-content-element-input">
              <textarea id="textarea-setting-workspace-description" class="input-setting-workspace-name" rows="4" style="resize: none;" maxlength="2000"></textarea>
          </div>
          <div class="breakLine"></div>
      </div>
      <div class="setting-workspace-content-element">
          <div class="setting-workspace-content-element-title">
              Icon
          </div>
          <div class="setting-workspace-content-element-icon">
              <img id="setting-workspace-icon" src="" alt="Workspace's logo" class="setting-workspace-icon">
          </div>
          <div class="breakLine"></div>
      </div>
      <div class="setting-workspace-content-button">
          <button id="btn-update" class="btn-default btn-setting-workspace">Update</button>
          <button id="btn-cancel" class="btn-cancel btn-setting-workspace">Cancel</button>
      </div>
      <div class="breakLine"></div>
  </div>`;


  // Recupera il titolo e la descrizione dalla API e impostali nell'input e nella textarea
  fetch('../includes/getInfoPage.php')
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error:', data.error);
      } else {
        originalTitle = data.Title;
        originalDescription = data.Description;

        const inputElement = document.getElementById('input-setting-workspace-name');
        const textareaElement = document.getElementById('textarea-setting-workspace-description');
        const iconElement = document.getElementById('setting-workspace-icon');
        inputElement.value = originalTitle;
        textareaElement.value = originalDescription;
        iconElement.src = data.Image_path;
      }
    })
    .catch(error => console.error('Error fetching page data:', error));

  document.getElementById('btn-update').addEventListener('click', handleUpdate);
  document.getElementById('btn-cancel').addEventListener('click', handleCancel);

  function handleUpdate() {
    const newTitle = document.getElementById('input-setting-workspace-name').value;
    const newDescription = document.getElementById('textarea-setting-workspace-description').value;
    const newData = {
      title: newTitle,
      description: newDescription
    };

    // Effettua una richiesta AJAX per aggiornare i dati nel backend
    fetch('../includes/updatePage.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
      .then(response => response.json())
      .then(data => {
        // Gestisci la risposta dal backend
        console.log(data);
        // Esegui eventuali azioni dopo l'aggiornamento
      })
      .catch(error => console.error('Error updating page:', error));
  }

  function handleCancel() {
    // Recupera i valori correnti nei campi di input
    const currentTitle = document.getElementById('input-setting-workspace-name').value;
    const currentDescription = document.getElementById('textarea-setting-workspace-description').value;

    // Verifica se i valori correnti sono diversi dai valori originali
    if (currentTitle !== originalTitle || currentDescription !== originalDescription) {
      // Se almeno uno dei campi è stato modificato, chiedi conferma prima di annullare le modifiche
      const confirmCancel = confirm("Sei sicuro di voler ripristinare le modifiche fatte?");
      if (!confirmCancel) {
        return; // Interrompi l'operazione di annullamento se l'utente ha scelto di non procedere
      }
    }

    // Ripristina i valori originali nei campi di input
    document.getElementById('input-setting-workspace-name').value = originalTitle;
    document.getElementById('textarea-setting-workspace-description').value = originalDescription;
  }
}
