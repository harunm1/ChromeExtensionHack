document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(null, function (obj) {
    document.getElementById("password").innerHTML = JSON.stringify(obj);
  });
  console.log("hello world");

  var ctx = document.getElementById("myChart").getContext("2d");
  // And for a doughnut chart

  const websiteData = [
    {
      domain: "google.com",
      time: 2365362623,
      limit: 325362623632622,
    },
    {
      domain: "linkedin.com",
      time: 3532623236,
      limit: 353252335,
    },
  ];
  const websiteUrl = [];
  const websiteTime = [];
  for (let i = 0; i < websiteData.length; i++) {
    websiteUrl[i] = websiteData[i].domain;
    websiteTime[i] = websiteData[i].time;
  }
  const data = {
    datasets: [
      {
        data: websiteTime,
      },
    ],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: websiteUrl,
    color: ["red", "green", "yellow"],
  };
  var myDoughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: data,
  });
});
