console.log("✅ Service worker loaded!");

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("🔍 Tab updated:", tab.url);

  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes("https://chat.openai.com")
  ) {
    console.log("🚀 ChatGPT detected — opening side panel...");

    chrome.sidePanel.setOptions({
      tabId: tabId,
      path: "sidepanel.html",
      enabled: true
    }).then(() => {
      chrome.sidePanel.open({ tabId: tabId });
    }).catch((err) => {
      console.error("❌ Failed to open side panel:", err);
    });
  }
});
