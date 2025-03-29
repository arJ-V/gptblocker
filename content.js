// content.js
let lastPrompt = '';

// Function to observe the ChatGPT input field
function observeChatGPTInput() {
  // Find the main textarea where users type prompts
  const textareaSelector = 'textarea[data-id="root"]';
  
  // Create a MutationObserver to watch for changes
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      const textarea = document.querySelector(textareaSelector);
      if (textarea && textarea.value && textarea.value !== lastPrompt) {
        lastPrompt = textarea.value;
        
        // Send the new prompt to the background script
        chrome.runtime.sendMessage({
          type: 'NEW_PROMPT',
          prompt: lastPrompt
        });
      }
    }
  });
  
  // Start observing the document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Also listen for input events on the textarea
  document.addEventListener('input', (e) => {
    if (e.target.matches(textareaSelector) && e.target.value !== lastPrompt) {
      lastPrompt = e.target.value;
      
      // Send the new prompt to the background script
      chrome.runtime.sendMessage({
        type: 'NEW_PROMPT',
        prompt: lastPrompt
      });
    }
  }, true);
}

// Start observing when the page is loaded
if (document.readyState === 'complete') {
  observeChatGPTInput();
} else {
  window.addEventListener('load', observeChatGPTInput);
}