import React from "react";
import Chart from "react-apexcharts";

export const LineChart = ({ chartData }) => {
  return (
    <>
      <Chart
        options={{
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: chartData.map((data) => data.category_name),
          },
          title: {
            text: "Grafik Penjualan per Kategori",
            align: "center",
            style: {
              fontSize: "16px",
              color: "#666",
            },
          },
          stroke: {
            curve: "smooth",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"],
              opacity: 0.5,
            },
          },
        }}
        series={[
          {
            name: "Total Penjualan per Kategori",
            data: chartData.map((data) => data.total_sold),
          },
        ]}
        type="bar"
        width="1024"
        height="300"
        className="mt-10 shadow-xl"
      />
    </>
  );
};
