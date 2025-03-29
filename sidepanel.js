// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updatePanel") {
      // Update the side panel with the new prompt
      document.getElementById("prompt-container").textContent = message.prompt;
    }
  });
  