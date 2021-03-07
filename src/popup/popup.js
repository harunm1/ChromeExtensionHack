document.addEventListener("DOMContentLoaded", () => {
  const domainLabels = [];
  const domainDurations = [];
  const domainImages = [];
  const domainLastAccessed = [];
  chrome.storage.local.get(null, function (obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key].isDomain === true && key != "null") {
        domainLabels.push(key);
        domainDurations.push(parseInt(obj[key].duration / 60000));
        domainImages.push(obj[key].image);
        domainLastAccessed.push(obj[key].startTime);
      }
    });

    const pieChartCanvas = document.getElementById("pieChart").getContext("2d");

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

    var myPieChart = new Chart(pieChartCanvas, {
      type: "doughnut",
      data: data,
      options: {
        legend: {
          position: "right",
        },
      },
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
});
