document.addEventListener("DOMContentLoaded", () => {
  const domainLabels = [];
  const domainDurations = [];
  chrome.storage.local.get(null, function (obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key].isDomain === true) {
        domainLabels.push(key);
        domainDurations.push(obj[key].duration);
      }
    });

    const barChartCanvas = document.getElementById("barChart").getContext("2d");
    const pieChartCanvas = document.getElementById("pieChart").getContext("2d");
    const data = {
      datasets: [
        {
          data: domainDurations,
        },
      ],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: domainLabels,
      color: ["red", "green", "yellow"],
    };
    var myBarChart = new Chart(barChartCanvas, {
      type: "bar",
      data: data,
    });

    var myPieChart = new Chart(pieChartCanvas, {
      type: "doughnut",
      data: data,
    });
  });
});
