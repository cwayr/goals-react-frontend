// quickchart-js https://github.com/typpo/quickchart-js

import QuickChart from "quickchart-js";

function quickChart() {
  const chart = new QuickChart();

  chart.setWidth(500);
  chart.setHeight(300);

  chart.setConfig({
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgb(255, 99, 132)",
          fill: false,
          data: [-58, -87, 70, 98, -38, 88, 70],
          yAxisID: "y",
        },
        {
          label: "My Second dataset",
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgb(54, 162, 235)",
          fill: false,
          data: [-79, 43, -57, 75, 20, -3, -95],
          yAxisID: "y1",
        },
      ],
    },
    options: {
      stacked: false,
      title: {
        display: true,
        text: "Chart.js Line Chart - Multi Axis",
      },
      scales: {
        yAxes: [
          {
            id: "y",
            type: "linear",
            display: true,
            position: "left",
          },
          {
            id: "y1",
            type: "linear",
            display: true,
            position: "right",
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
      },
    },
  });

  console.log(chart.getUrl());
  return chart.getUrl();
}

export default quickChart;
