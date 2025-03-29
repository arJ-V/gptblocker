import { tldLocales } from './locales.js';

let totalRecentUserMessage = null;

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      if (details.method === "POST" && details.url.includes("chat.openai.com/backend-api/conversation")) {
        // Extract the request body
        let requestBody = details.requestBody;
        
        // Decode the request body if it's available
        if (requestBody && requestBody.raw) {
          const rawData = new TextDecoder().decode(new Uint8Array(requestBody.raw));
          
          try {
            // Parse the raw data into JSON
            let jsonData = JSON.parse(rawData);
            let mostRecentUserMessage = null;
            
            // Check if there's a "user" role message
            for (let i = jsonData.messages.length - 1; i >= 0; i--) {
                let message = jsonData.messages[i];
                if (message.role === "user") {
                  mostRecentUserMessage = message.content.parts[0];
                  break; // Stop once we find the most recent "user" message
                }
            }

            // If a user message is found, log it
            if (mostRecentUserMessage && mostRecentUserMessage != totalRecentUserMessage) {
                totalRecentUserMessage = mostRecentUserMessage;
                console.log("Most recent user message detected:", mostRecentUserMessage);
                chrome.sidePanel.setOptions({
                    path: 'sidePanel.html',
                    enabled: true
                });
            } else {
                console.log("No user message found in the request.");
            }
          } catch (e) {
            console.error("Error parsing JSON:", e);
          }
        }
      }
    },
    { urls: ["*://chat.openai.com/backend-api/conversation"] },
    ["requestBody"]
);