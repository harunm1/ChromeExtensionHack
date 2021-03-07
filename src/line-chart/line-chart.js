document.addEventListener("DOMContentLoaded", () => {
  const domainLabels = [];
  const domainDurations = [];
  const domainImages = [];
  const domainLastAccessed = [];
  chrome.storage.local.get(null, function (obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key].isDomain === true && key != "null") {
        domainLabels.push(key);
        domainDurations.push(parseFloat(obj[key].duration / 60000).toFixed(2));
        domainImages.push(obj[key].image);
        domainLastAccessed.push(obj[key].startTime);
      }
    });

    const barChartCanvas = document.getElementById("barChart").getContext("2d");

    const colors = chooseColor(domainLabels.length);
    const data = {
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: domainLabels,
      datasets: [
        {
          label: "Time spent on Websites",
          data: domainDurations,
          backgroundColor: colors,
        },
      ],
    };

    //auto generate color

    function hexCodeGen() {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      document.body.style.backgroundColor = "#" + randomColor;
      return "#" + randomColor;
    }

    function chooseColor(dataSize) {
      var i;
      var colorArray = [];
      for (i = 0; i < dataSize; i++) {
        colorArray.push(hexCodeGen());
      }

      return colorArray;
    }
    Chart.defaults.global.defaultFontColor = "white";

    var myBarChart = new Chart(barChartCanvas, {
      type: "horizontalBar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
    const noDataMessage = document.getElementById("no-data");

    if (domainLabels.length === 0) {
      noDataMessage.innerHTML = "Start visiting websites to see data.";
      document.getElementById("chart-container").style.display = "none";
    } else {
      noDataMessage.style.display = "none";
    }
  });
});
