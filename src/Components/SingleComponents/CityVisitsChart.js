import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CityVisitsChart = ({ data }) => {
  const cityData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
        ],
      },
    ],
  };

  return (
    <div style={{ height: "400px", width: "600px" }}>
      <Pie data={cityData} />
    </div>
  );
};

export default CityVisitsChart;
