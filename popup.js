console.log("✅ popup.js loaded");

document.getElementById("open-panel").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.sidePanel.setOptions({
    tabId: tab.id,
    path: "sidepanel.html",
    enabled: true
  });

  await chrome.sidePanel.open({ tabId: tab.id });
});