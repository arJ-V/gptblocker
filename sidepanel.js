// sidepanel.js
document.addEventListener('DOMContentLoaded', () => {
  const promptContainer = document.getElementById('prompt-container');
  
  // Function to update the prompt display
  function updatePromptDisplay(prompt) {
    promptContainer.textContent = prompt || 'No prompt detected yet.';
  }
  
  // Listen for changes to chrome storage
  chrome.storage.local.get('currentPrompt', (data) => {
    updatePromptDisplay(data.currentPrompt);
  });
  
  // Listen for updates to the prompt in real-time
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.currentPrompt) {
      updatePromptDisplay(changes.currentPrompt.newValue);
    }
  });
});