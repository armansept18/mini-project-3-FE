import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import api from "../../api/api";

export const PieChartCategory = () => {
  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        width: 200,
        type: "pie",
      },
      title: {
        text: "Best Selling Categories Alltime",
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
        type="pie"
        width="450"
        className="shadow-xl"
      />
    </div>
  );
};

export const PieChartProduct = () => {
  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        width: 200,
        type: "donut",
      },
      title: {
        text: "Best Selling Product Alltime",
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
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
              },
              value: {
                show: true,
                formatter: function (val, opt) {
                  return opt.w.globals.labels[opt.seriesIndex] + ": " + val;
                },
              },
              total: {
                show: true,
                label: "Total",
                formatter: function (w) {
                  const total = w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                  const productName = w.config.labels[0];

                  return `${productName}: ${total}`;
                },
              },
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    api
      .get("/transactiondetails/soldproducts")
      .then((response) => {
        const data = response.data;
        data.sort((a, b) => b.total_sold - a.total_sold);
        const top5Data = data.slice(0, 5);
        const productNames = top5Data.map((item) => item.product_name);
        const productCounts = top5Data.map((item) => parseInt(item.total_sold));

        setState((prevState) => ({
          ...prevState,
          options: {
            ...prevState.options,
            labels: productNames,
          },
          series: productCounts,
        }));
      })
      .catch((error) => {
        console.error("Error fetching most sold product:", error);
      });
  }, []);

  return (
    <div className="flex justify-center items-center mt-10">
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        width="500"
        className="shadow-xl"
      />
    </div>
  );
};
