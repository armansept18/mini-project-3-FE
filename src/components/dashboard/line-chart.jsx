import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export const LineChart = ({ chartData }) => {
  const { categories, quantities } = chartData;

  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories,
      },
      title: {
        text: "Total Product Category Selling Report",
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
    },
    series: [
      {
        name: "Total Category Selling",
        data: quantities,
      },
    ],
  };

  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        width="1024"
        height="300"
        className="mt-10 shadow-xl"
      />
    </>
  );
};
