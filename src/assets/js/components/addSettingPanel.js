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
          break;
        case "setting-element-people":
          userPanelContent(settingContent);
          break;
        case "setting-element-upgrade":
          upgradePanelContent(settingContent);
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
        <h1>Page's settings</h1>
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
              <img id="setting-workspace-icon" src="../assets/images/pagePhoto/nexus_logo.png" alt="Workspace's logo" class="setting-workspace-icon">
          </div>
          <div class="breakLine"></div>
      </div>
      <div class="setting-workspace-content-button">
          <button id="btn-update" class="btn-default btn-setting-workspace">Update</button>
          <button id="btn-cancel" class="btn-cancel btn-setting-workspace">Go back</button>
      </div>
  </div>`;

  document.getElementById('btn-cancel').addEventListener('click', () => confirmCancel());
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
        iconElement.src = "../assets/images/pagePhoto/nexus_logo.png";
      }
    })
    .catch(error => console.error('Error fetching page data:', error));

  document.getElementById('btn-update').addEventListener('click', handleUpdate);
  document.getElementById('btn-cancel').addEventListener('click', handleCancel);

  function handleUpdate() {
    const newTitle = document.getElementById('input-setting-workspace-name').value;
    const newDescription = document.getElementById('textarea-setting-workspace-description').value;

    if (newTitle !== originalTitle || newDescription !== originalDescription) {
      const newData = {
        title: newTitle,
        description: newDescription
      };

      // console.log(newData);
      // Effettua una richiesta AJAX per aggiornare i dati nel backend

      fetch('../includes/updatePageSettings.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })
        .then(response => response.text())  // Ottieni la risposta come testo
        .then(text => {
          console.log(text);  // Stampa la risposta
          return JSON.parse(text);  // Poi prova a analizzarla come JSON
        })
        .then(data => {
          if (data.error) {
            console.error('Error updating page:', data.error);
          } else {
            alert('Update successful!');
            window.location.href = 'main.php';
          }
        })
        .catch(error => console.error('Error updating page:', error));
    }
  }
}

let originalPassword = '';
let originalUsername = '';
let originalEmail = '';

function userPanelContent(settingContent) {
  settingContent.innerHTML = `
 <div class="user-workspace-content" style="max-height: 600px; overflow-y: auto;">
    <div class="setting-workspace-content-title">
        <h1>User's settings</h1>
    </div>
    <div class="breakLine"></div>

    <div class="setting-workspace-content-element">
        <div class="setting-workspace-content-element-title">
            Username
        </div>
        <div class="setting-workspace-content-element-input">
            <input type="text" id="input-user-username" class="input-setting-workspace-name" readonly>
        </div>
        <div class="breakLine"></div>
    </div>

    <div class="setting-workspace-content-element">
        <div class="setting-workspace-content-element-title">
            Email
        </div>
        <div class="setting-workspace-content-element-input">
            <input type="email" id="input-user-email" class="input-setting-workspace-name" readonly>
        </div>
        <div class="breakLine"></div>
    </div>

    <div class="setting-workspace-content-element">
        <div class="setting-workspace-content-element-title">
            Password
        </div>
        <div class="setting-workspace-content-element-input">
            <input type="password" id="input-user-password" class="input-setting-workspace-name" readonly>
            <button id="btn-show-password" class="btn-default btn-setting-workspace">Show Password</button>
        </div>
        <div class="breakLine"></div>
    </div>

    <div class="setting-workspace-content-element">
        <div class="setting-workspace-content-element-title">
            Account Creation Date
        </div>
        <div class="setting-workspace-content-element-input">
            <input type="text" id="input-user-account-creation-date" class="input-setting-workspace-name" readonly>
        </div>
        <div class="breakLine"></div>
    </div>

    <div class="user-workspace-content-button">
        <button id="btn-cancel" class="btn-cancel btn-setting-workspace">Go back</button>
        <button id="btn-logout" class="btn-default btn-setting-workspace">Logout</button>
    </div>
</div>`;
 

  setupUserPanel();
}

function setupUserPanel() {
  fetch('../includes/getUserDetails.php')
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error:', data.error);
      } else {
        // Assegna i valori originali alle variabili corrispondenti
        originalUsername = data.Username;
        originalEmail = data.Email;
        originalPassword = data.Password;

        // Assegna i valori recuperati ai campi di input
        document.getElementById('input-user-email').value = originalEmail;
        document.getElementById('input-user-username').value = originalUsername;
        document.getElementById('input-user-password').value = originalPassword;
        document.getElementById('input-user-account-creation-date').value = data.Account_creation_date;
      }
    })
    .catch(error => console.error('Error fetching user data:', error));

  document.getElementById('btn-cancel').addEventListener('click', () => confirmCancel());
  document.getElementById('btn-logout').addEventListener('click', () => logout());
  // Aggiungi il listener per mostrare o nascondere la password
  const btnShowPassword = document.getElementById('btn-show-password');
  btnShowPassword.addEventListener('click', togglePasswordVisibility);
}

function logout() {
  const confirmation = confirm("Are you sure you want to log out?");

  if (confirmation) {
    window.location.href = '../includes/logout.php';
  }
}

function togglePasswordVisibility() {
  const passwordInput = document.getElementById('input-user-password');
  const btnShowPassword = document.getElementById('btn-show-password');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    btnShowPassword.textContent = 'Hide Password';
  } else {
    passwordInput.type = 'password';
    btnShowPassword.textContent = 'Show Password';
  }
}

function upgradePanelContent(settingContent) {
  settingContent.innerHTML = `
  <div class="setting-workspace-content" style="max-height: 600px; overflow-y: auto;">
      <div class="setting-workspace-content-title">
          <h1>Nexus Version 1.0</h1>
      </div>
      <div class="breakLine"></div>
      <div class="setting-workspace-content-element">
          <div class="setting-workspace-content-element-title">
              Icon
          </div>
          <div class="setting-workspace-content-element-icon">
              <img id="setting-workspace-icon" src="../assets/images/pagePhoto/nexus_logo.png" alt="Workspace's logo" class="setting-workspace-icon">
          </div>
          <div class="breakLine"></div>
      </div>
      <div class="setting-workspace-content-copyright">
          <p>&copy; 2024 Nexus. All rights reserved.</p>
      </div>
      <div class="breakLine"></div>
      <div class="setting-workspace-content-button">
          <button id="btn-cancel" class="btn-cancel btn-setting-workspace">Go back</button>
      </div>
  </div>`;

  document.getElementById('btn-cancel').addEventListener('click', () => confirmCancel());
}

function confirmCancel() {
  window.location.href = 'main.php';
}