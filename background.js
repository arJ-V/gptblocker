// background.js
chrome.action.onClicked.addListener((tab) => {
  // Open the side panel when the extension icon is clicked
  chrome.sidePanel.open({ tabId: tab.id });
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'NEW_PROMPT') {
    // Store the prompt in chrome storage
    chrome.storage.local.set({ currentPrompt: message.prompt });
    
    // Open the side panel
    chrome.sidePanel.open({ tabId: sender.tab.id });
  }
});