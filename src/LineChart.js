import { useContext, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import ProgressContext from "./context/progressContext";

function LineChart({ goalData }) {
  const { progressData, setProgressData } = useContext(ProgressContext);

  /** Use progress data to create array of objects to populate chart
   *
   * [ { x: Date, y: 1RM }, { x: Date, y: 1RM } ]
   */
  useEffect(
    function setup() {
      goalData.progress.map((prog) => {
        setProgressData((progressData) => [
          ...progressData,
          { x: +prog.date, y: prog.orm },
        ]);
      });
    },
    [goalData]
  );

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "week",
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "My 1RM",
        data: progressData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Target 1RM",
        data: [
          { x: +goalData.start_date, y: goalData.target_weight },
          { x: +goalData.end_date, y: goalData.target_weight },
        ],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default LineChart;
