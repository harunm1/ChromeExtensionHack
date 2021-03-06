document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(null, function (obj) {
    document.getElementById("password").innerHTML = JSON.stringify(obj);
  });
});
