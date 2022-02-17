import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

function BarChart({ ormPercentage, datePercentage }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const labels = ["% completed from starting 1RM"];

  const data = {
    labels,
    datasets: [
      {
        label: "Current 1RM",
        data: [ormPercentage],
        backgroundColor: "rgba(255, 99, 132)",
      },
      {
        label: "Time passed",
        data: [datePercentage],
        backgroundColor: "rgba(53, 162, 235)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default BarChart;
