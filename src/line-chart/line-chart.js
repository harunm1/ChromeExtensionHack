document.addEventListener("DOMContentLoaded", () => {
  const domainLabels = [];
  const domainDurations = [];
  chrome.storage.local.get(null, function (obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key].isDomain === true && key != "null") {
        domainLabels.push(key);
        domainDurations.push(parseInt(obj[key].duration / 60000));
      }
    });

    const barChartCanvas = document.getElementById("barChart").getContext("2d");

    const colors = chooseColor(domainLabels.length);
    const data = {
      datasets: [
        {
          data: domainDurations,
          backgroundColor: colors,
        },
      ],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: domainLabels,
    };

    //auto generate color

    function hexCodeGen() {
      let code = (Math.random() * 0xffff * 55).toString();
      return "#" + code.slice(0, 6);
    }

    function chooseColor(dataSize) {
      var i;
      var colorArray = [];
      for (i = 0; i < dataSize; i++) {
        colorArray.push(hexCodeGen());
      }

      return colorArray;
    }

    var myBarChart = new Chart(barChartCanvas, {
      type: "bar",
      data: data,
    });
  });
});