import { useState } from "react";
import Chart from 'react-apexcharts';

export const LineChart = () => {
    const [state, setState] = useState({
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
            "Minggu",
          ],
        },
        title: {
          text: "Grafik Penjualan Produk",
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
          name: "Total Penjualan Produk",
          data: [30, 90, 45, 50, 31, 60, 70],
        },
      ],
    });
    
    return (
      <>
        <Chart
          options={state.options}
          series={state.series}
          type="line"
          width="1024"
          height="300"
          className="mt-10 shadow-xl"
          
        />
      </>
    );
}