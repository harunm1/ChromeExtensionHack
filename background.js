let activeTabId = 0;
let activeTabInfo = "";

let startTime = 0;
let endTime = 0;

let openTabs = [];
let tabIdUrlMap = {};
let browseTime = 0;
window.setInterval(() => {
  browseTime += 1;
  chrome.storage.local.set({
    browseTime: browseTime,
  });
}, 1000);

chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (currentTabInfo) => {
    activeTabId = tab.tabId;
    activeTabInfo = currentTabInfo;

    chrome.tabs.getAllInWindow(null, (tabs) => {
      openTabs = tabs;
      console.log(openTabs);
    });

    populateTabIdUrlMap(tab.tabId, currentTabInfo.url);
    startTimer(currentTabInfo, tab.tabId);
  });
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  const endTime = Date.now();
  const domain = tabIdUrlMap[tabId];
  chrome.storage.local.get(domain, (obj) => {
    const timeElapsed = endTime - obj[domain].startTime;

    chrome.storage.local.set({
      [domain]: {
        isDomain: true,
        activeTab: false,
        startTime: 0,
        image: obj[domain].image,
        duration: obj[domain].duration + timeElapsed,
      },
    });
    // execute when tab is closed
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(tab, "changeInfo");
  chrome.tabs.getAllInWindow(null, (tabs) => {
    openTabs = tabs;
    console.log(openTabs);
  });
  startTimer(tab, tabId);
});

const populateTabIdUrlMap = (tabId, url) => {
  tabIdUrlMap[tabId] = getDomain(url);
};

const startTimer = (currentTabInfo, tabId) => {
  let tabStartTime = Date.now();
  const domain = getHostName(currentTabInfo.url);
  chrome.storage.local.get(domain, (obj) => {
    if (Object.entries(obj).length === 0 && obj.constructor === Object) {
      //if this is the first time user has visited domain
      addNewDomain(domain, tabStartTime, currentTabInfo.favIconUrl);
    } else {
      if (obj[domain].activeTab == true) {
        const currentTime = Date.now();
        const timeElapsed = currentTime - obj[domain].startTime;
        chrome.storage.local.set({
          [domain]: {
            isDomain: true,
            activeTab: true,
            startTime: tabStartTime,
            image: currentTabInfo.favIconUrl,
            duration: obj[domain].duration + timeElapsed,
          },
        });
      } else {
        chrome.storage.local.set({
          [domain]: {
            isDomain: true,
            activeTab: true,
            startTime: tabStartTime,
            image: currentTabInfo.favIconUrl,
            duration: obj[domain].duration,
          },
        });
      }
    }
  });
};

const addNewDomain = (domain, tabStartTime, image) => {
  chrome.storage.local.set({
    [domain]: {
      isDomain: true,
      activeTab: true,
      startTime: tabStartTime,
      image: image,
      duration: 0,
    },
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg === "clear") {
    browseTime = 0;
  }
  console.log(request.msg);
});
