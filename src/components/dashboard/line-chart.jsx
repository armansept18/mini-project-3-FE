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
          colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
          xaxis: {
            categories: chartData.map((data) => data.category_name),
          },
          title: {
            text: "Total Sold Product-Category Per Day",
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
            name: "Product Category Sold",
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
