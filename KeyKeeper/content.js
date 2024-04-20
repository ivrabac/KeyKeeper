// Function to generate random password
function generateRandomPassword(length) {
  var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?></.,;'[]!@#$%^&*()_+{}";
  var password = "";
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

// Function to create and display modal dialog next to the password field
function showCloudDialog(inputField) {
  // Check if a popup is already open
  if (document.getElementById('cloud-dialog')) {
    return;
  }

  // Calculate the position of the input field
  var inputRect = inputField.getBoundingClientRect();
  var inputFieldTop = inputRect.top + window.pageYOffset;
  var inputFieldLeft = inputRect.left + window.pageXOffset;

  // Create modal dialog
  var cloudDialog = document.createElement('div');
  cloudDialog.id = 'cloud-dialog';
  cloudDialog.innerHTML = `
    <style>
      #cloud-dialog {
        position: absolute;
        background-color: rgba(197, 159, 170, 0.6);
        padding: 20px;
        border-radius: 100%;
        box-shadow: 0 0 10px rgba(197, 159, 170, 0.45);
        z-index: 9999;
        /* Adjust position */
        top: ${inputFieldTop}px;
        left: ${inputFieldLeft + inputField.offsetWidth}px;
      }

      .cloud-content {
        text-align: center;
        font-weight: bold;
        font-family: arial;
        color: rgba(255, 255, 255, 0.8);
      }

      .cloud-content button {
        margin-top: 10px;
        border: 0;
        border-radius: 100%;
        width: 40px;
        height: 40px;
        padding: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add box shadow */
      }

      #autofill-btn {
        background-color: rgba(0, 255, 0, 0.45);
        font-weight: bold;
        font-family: arial;
        color: rgba(255, 255, 255, 0.8);
      }

      #cancel-btn {
        background-color: rgba(255, 0, 0, 0.45);
        font-weight: bold;
        font-family: arial;
        color: rgba(255, 255, 255, 0.8);
      }

      #password-length-slider {
        color: rgba(255, 160, 0, 0.75);
        border: 2px solid rgba(255, 160, 0, 0.75); /* Add border */
      }
    </style>
  
    <div class="cloud-content">
      <h4>Autofill Password?</h4>
      <span id="password-length-label">Password Length: 14</span><br>
      <input type="range" id="password-length-slider" min="10" max="64" value="14">
      <br>
      <button id="autofill-btn">Yes</button>
      <button id="cancel-btn">No</button>
    </div>
  `;

  // Append modal dialog to body
  document.body.appendChild(cloudDialog);

  // Add event listener for slider
  var passwordLengthSlider = cloudDialog.querySelector('#password-length-slider');
  var passwordLengthLabel = cloudDialog.querySelector('#password-length-label');
  passwordLengthSlider.addEventListener('input', function() {
    passwordLengthLabel.textContent = 'Password Length: ' + passwordLengthSlider.value;
  });

  // Add event listeners for buttons
  var autofillButton = cloudDialog.querySelector('#autofill-btn');
  autofillButton.addEventListener('click', function() {
    var passwordLength = parseInt(passwordLengthSlider.value);
    var generatedPassword = generateRandomPassword(passwordLength);
    inputField.value = generatedPassword;
    closeCloudDialog();
  });

  var cancelButton = cloudDialog.querySelector('#cancel-btn');
  cancelButton.addEventListener('click', function() {
    closeCloudDialog();
  });
}

// Function to close modal dialog
function closeCloudDialog() {
  var cloudDialog = document.getElementById('cloud-dialog');
  if (cloudDialog) {
    cloudDialog.remove();
  }
}

// Function to handle click event on input fields
function handleInputFieldClick(event) {
  var target = event.target;
  if (target.nodeName === 'INPUT' && target.type === 'password') {
    showCloudDialog(target);
  }
}

// Event listener to trigger handling of click event on input fields
document.addEventListener('click', handleInputFieldClick);
