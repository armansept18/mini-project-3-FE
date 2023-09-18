import { useState } from "react";
import Chart from "react-apexcharts";

export const PieChartCategory = () => {
  const [state, setState] = useState({
    series: [14, 25, 17, 39],
    options: {
      chart: {
        width: 200,
        type: "donut",
      },
      title: {
          text: "Kategori Paling Laris",
          align: "left",
          style: {
            fontSize: "16px",
            color: "#666",
          },
        },
      labels: ["Coffee", "Non Coffee", "Food", "Snack"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  return (
    <div className="flex justify-center items-center mt-10">
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        width="400"
        className='shadow-xl'
      />
    </div>
  );
};

export const PieChartProduct = () => {
  const [state, setState] = useState({
    series: [44, 55, 13, 43],
    options: {
      chart: {
        width: 200,
        type: "pie",
      },
      title: {
        text: "Produk Paling Laris",
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666",
        },
      },
      labels: ["Caramel Coffee", "Coffee Latte", "Siomay", "Nasi Goreng"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  return (
    <div className="flex justify-center items-center mt-10">
      <Chart
        options={state.options}
        series={state.series}
        type="pie"
        width="420"
        className="shadow-xl"
      />
    </div>
  );
}