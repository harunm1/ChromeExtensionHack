let activeTabId = 0;
let activeTabInfo = "";

let startTime = 0;
let endTime = 0;

const ongoingUrls = [];
const tabMap = {};

chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (currentTabInfo) => {
    activeTabId = tab.tabId;
    activeTabInfo = currentTabInfo;

    populateTabMap(currentTabInfo.tabId, currentTabInfo.url);
    startTimer(currentTabInfo, tab.tabId);
  });
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  for (let i = ongoingUrls.length - 1; i > 0; i--) {
    console.log(ongoingUrls[i].url, "ongoing url");
    console.log(tabMap[tabId], "tab ID");
    if (ongoingUrls[i].url === tabMap[tabId]) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - ongoingUrls[i].startTime;

      chrome.storage.local.set(
        { productivityData: [{ domain: ongoingUrls[i].url, elapsedTime }] },
        (data) => {
          console.log(data, "what is this data");
        }
      );
      ongoingUrls.splice(i, 1);
    }
  }
  console.log(ongoingUrls, "ongoing urls");
});

const populateTabMap = (tabId, url) => {
  tabMap[tabId] = getDomain(url);
  console.log(tabMap[tabId], "setting tabMap");
};

const startTimer = (currentTabInfo, tabId) => {
  const tabStartTime = Date.now();
  ongoingUrls.push({
    url: getDomain(currentTabInfo.url),
    tabId: tabId,
    startTime: startTime,
  });
};

function getDomain(url) {
  var hostName = getHostName(url);
  var domain = hostName;

  if (hostName != null) {
    var parts = hostName.split(".").reverse();

    if (parts != null && parts.length > 1) {
      domain = parts[1] + "." + parts[0];

      if (hostName.toLowerCase().indexOf(".co.uk") != -1 && parts.length > 2) {
        domain = parts[2] + "." + domain;
      }
    }
  }
  return domain;
}

function getHostName(url) {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (
    match != null &&
    match.length > 2 &&
    typeof match[2] === "string" &&
    match[2].length > 0
  ) {
    return match[2];
  } else {
    return null;
  }
}

// const tabIdListener = chrome.tabs.onUpdated.addListener(
//   (tabId, changeInfo, tab) => {
//     console.log(tabId, "tabID");
//     console.log(changeInfo, "changeInfo");
//     console.log(tab, "Tab");
//   }
// );
