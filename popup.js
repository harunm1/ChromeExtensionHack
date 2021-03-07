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

  //auto generate color

  function hexCodeGen (){
    let code = (Math.random() * 0xffff*55 ).toString();
    return '#' + code.slice(0, 6);
  };

  function chooseColor(dataSize){
    var i;
    var colorArray = [];
    for (i = 0; i < dataSize; i++) {
      colorArray.push(hexCodeGen());
    }

    return colorArray;
  }

  var colors = chooseColor(websiteData.length)
  const data = {
    datasets: [
      {
        data: websiteTime,
        backgroundColor: colors,
      }
    ],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: websiteUrl,
    //color: ["red", "green", "yellow"],
  };
  var myDoughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: {
  }
    
    var myPieChart = new Chart(pieChartCanvas, {
      type: "doughnut",
      data: data,
    });
  });
});
