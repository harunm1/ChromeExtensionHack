document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(null, function (obj) {
    document.getElementById("password").innerHTML = JSON.stringify(obj);
  });
  // test: display the data in Storage
  chrome.storage.local.get(null, (value) => {
    console.log(value)
  });


  var ctx = document.getElementById("myChart").getContext("2d");
  // And for a doughnut chart

  const websiteData = [
    {
      domain: "google.com",
      time: 1000,
      limit: 325362623632622,
    },
    {
      domain: "linkedin.com",
      time: 1000,
      limit: 353252335,
    },

    {
      domain: "twitter.com",
      time: 1000,
      limit: 353252335,
    },
  ];
  const websiteUrl = [];
  const websiteTime = [];
  for (let i = 0; i < websiteData.length; i++) {
    websiteUrl[i] = websiteData[i].domain.slice(0,-4).toUpperCase();
    websiteTime[i] = new Date(websiteData[i].time);
  }

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
    
  });
});
