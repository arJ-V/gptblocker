// Set the side panel to open when the action button is clicked
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "newPrompt") {
    // Open the side panel when a new prompt is detected
    chrome.sidePanel.open({ windowId: sender.tab.windowId });
    
    // Send the prompt to the side panel
    chrome.runtime.sendMessage({
      action: "updatePanel",
      prompt: message.prompt
    });
  }
});
