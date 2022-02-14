import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

function LineChart({ goalData }) {
  console.log("CHART DATA", goalData);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
  };

  const labels = Array(goalData.timeline)
    .fill(0)
    .map((_, i) => `Week ${i + 1}`);

  const target = Array(labels.length).fill(goalData.target_weight);

  /** allow progress input for any given day
   * group by week and take the best from that week and display it
   */

  // 604_800_100 milliseconds in a week
  // 86_400_000 milliseconds in a day

  const data = {
    labels,
    datasets: [
      {
        label: "My 1RM",
        data: [2, 345, 98, 12, 544, 2, 0],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Target 1RM",
        data: target,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default LineChart;
