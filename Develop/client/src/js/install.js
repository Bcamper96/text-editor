const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome 76 and later from showing the mini-infobar
  event.preventDefault();

  // Stash the event so it can be triggered later.
  deferredPrompt = event;

  // Show the install button
  butInstall.style.display = 'block';
});

// Install the PWA
butInstall.addEventListener('click', async () => {
  // Hide the install button
  butInstall.style.display = 'none';

  // Show the install prompt
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  const choiceResult = await deferredPrompt.userChoice;

  // Log the user's choice
  console.log(`User ${choiceResult.outcome} the install prompt`);

  // Clear the deferredPrompt variable
  deferredPrompt = null;
});

// Logic for handling the appinstalled event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed successfully');
});
