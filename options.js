// Saves options to chrome.storage
function save_options() {
    let status = document.getElementById('status');
    let username = document.getElementById('username').value;
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
        status.textContent = 'Invalid name. Alphanumeric characters only.';
        return;
    }
    chrome.storage.sync.set({
       username: username
    }, () => {
        // Update status to let user know options were saved.
        status.textContent = 'Options saved.';
        setTimeout(function() {
          status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
      username: '',
    }, items => {
       document.getElementById('username').value = items.username;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
