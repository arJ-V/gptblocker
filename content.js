// Function to detect new prompts on ChatGPT
function monitorForPrompts() {
  // The main textarea where users type prompts
  const promptArea = document.querySelector('textarea[data-id="root"]');
  
  if (!promptArea) {
    // If the textarea isn't found yet, try again in a moment
    setTimeout(monitorForPrompts, 1000);
    return;
  }
  
  // Listen for the Enter key to detect when a prompt is submitted
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey && promptArea.value.trim()) {
      // Send the prompt to the background script
      chrome.runtime.sendMessage({
        action: "newPrompt",
        prompt: promptArea.value.trim()
      });
    }
  });
  
  // Also monitor for clicks on the send button
  const sendButton = document.querySelector('button[data-testid="send-button"]');
  if (sendButton) {
    sendButton.addEventListener('click', () => {
      if (promptArea.value.trim()) {
        chrome.runtime.sendMessage({
          action: "newPrompt",
          prompt: promptArea.value.trim()
        });
      }
    });
  }
}

// Start monitoring when the page loads
window.addEventListener('load', monitorForPrompts);
// Also try immediately in case the page is already loaded
monitorForPrompts();
