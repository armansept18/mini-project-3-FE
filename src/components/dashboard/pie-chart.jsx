import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import api from "../../api/api";

export const PieChartCategory = () => {
  const [state, setState] = useState({
    series: [],
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
      labels: [],
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
            labels: categoryNames,
          },
          series: productCounts,
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="flex justify-center items-center mt-10">
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        width="400"
        className="shadow-xl"
      />
    </div>
  );
};

export const PieChartProduct = () => {
  const [state, setState] = useState({
    series: [
      // total data nama produk yang terjual
    ],
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
      labels: [
        // data nama produk paling banyak terjual
      ],
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