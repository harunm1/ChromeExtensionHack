document.addEventListener("DOMContentLoaded", () => {
  const domainLabels = [];
  const domainDurations = [];
  const domainImages = [];
  const domainLastAccessed = [];
  window.setInterval(() => {
    chrome.storage.local.get("browseTime", (obj) => {
      document.getElementById("browse-time").innerHTML = parseFloat(
        obj.browseTime / 60
      ).toFixed(2);
    });
  }, 1000);

  chrome.storage.local.get(null, function (obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key].isDomain === true && key != "null") {
        domainLabels.push(key);
        domainDurations.push(
          parseFloat(obj[key].duration / 60000).toFixed(2) + " mins"
        );
        domainImages.push(obj[key].image);

        const d = new Date(obj[key].startTime);
        domainLastAccessed.push(d);
      }
    });

    for (let i = 0; i < domainLabels.length; i++) {
      document.getElementById("table-data").innerHTML += `
        <tr>
          <td><img src="${domainImages[i]}" style="width: 30px;height:30px;"/></td>
          <td>${domainLabels[i]}</td>
          <td>${domainDurations[i]}</td>
          <td>${domainLastAccessed[i]}</td>
        </tr>`;
    }
  });
  const clearDataButton = document.getElementById("clear-data");
  clearDataButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({
      msg: "clear",
      data: {
        subject: "clear data",
      },
    });
    chrome.storage.local.clear(function () {
      var error = chrome.runtime.lastError;
      if (error) {
        console.error(error);
      }
      window.location.href = "../popup/popup.html";
    });
  });
});
