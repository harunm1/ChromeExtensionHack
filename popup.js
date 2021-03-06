document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(null, function (obj) {
    document.getElementById("password").innerHTML = JSON.stringify(obj);
  });
  console.log("hello world");

  const ctx = document.getElementById("myChart").getContext("2d");
  const data = {
    datasets: [
      {
        data: [10, 20, 30],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Red", "Yellow", "Blue"],
  };
  const myDoughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: options,
  });
});
