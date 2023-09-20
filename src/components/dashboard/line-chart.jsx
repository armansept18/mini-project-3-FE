import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import DatePicker from "react-date-picker";
import api from "../../api/api";

export const LineChart = () => {
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
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
    },
    series: [
      {
        name: "Total Penjualan per Kategori",
        data: [],
      },
    ],
  });

  useEffect(() => {
    api
      .get("/transactiondetails/soldproductcategory")
      .then((response) => {
        const data = response.data;

        const categoryNames = data.map((item) => item.category_name);
        const productCounts = data.map((item) => parseInt(item.total_sold));

        setState((prevState) => ({
          ...prevState,
          options: {
            ...prevState.options,
            xaxis: {
              categories: categoryNames,
            },
          },
          series: [
            {
              ...prevState.series[0],
              data: productCounts,
            },
          ],
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
