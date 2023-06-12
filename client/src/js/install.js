const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    // event.preventDefault();
    butInstall.style.visibility = 'visible';
    // const promptEvent = event;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    if (choice.outcome === 'accepted') {
        console.log('PWA installation accepted');
      } else {
        console.log('PWA installation denied');
      }
    butInstall.style.visibility = 'hidden';
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA installed', event);
    butInstall.style.visibility = 'hidden';
    window.deferredPrompt = null;
});