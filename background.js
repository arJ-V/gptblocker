chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (
      changeInfo.status === "complete" &&
      tab.url &&
      tab.url.includes("https://chat.openai.com")
    ) {
      chrome.sidePanel.setOptions({
        tabId: tabId,
        path: "sidepanel.html",
        enabled: true
      }).then(() => {
        chrome.sidePanel.open({ tabId: tabId });
      }).catch((err) => {
        console.error("Failed to open side panel:", err);
      });
    }
  });
  