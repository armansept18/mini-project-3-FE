import { Button, FormLabel } from "@chakra-ui/react";
import { NavTemplateAdmin } from "../../components/template/template";
import { useNavigate } from "react-router-dom";
import { LineChart } from "../../components/dashboard/line-chart";
import {
  PieChartCategory,
  PieChartProduct,
} from "../../components/dashboard/pie-chart";
import { ReportCard } from "../../components/dashboard/report-card";
import React, { useState } from "react";
import { SelectDateCakra } from "../../components/selectdate/selectdatecakra";
import { useEffect } from "react";
import api from "../../api/api";

export const DashboardPage = () => {
  const [date, setDate] = useState("");
  const [chartData, setChartData] = useState([]);

  const nav = useNavigate();
  function toCashier() {
    nav("/cashier");
  }

  const fetchTotalSoldByDate = async (dateTo, dateFrom) => {
    await api
      .get("/transactiondetails/bydate", { params: { dateTo, dateFrom } })
      .then((result) => setChartData(result.data));
  };
  return (
    <>
      <NavTemplateAdmin>
        <div className="flex flex-col justify-center items-center mt-10">
          <p className="font-bold text-xl ml-64">Sales Report</p>
          <div className="flex justify-center items-center mt-10">
            <ReportCard />
          </div>
          <div className="mt-20 justify-start items-start">
            <p>Select Transaction Date :</p>
            <SelectDateCakra fetchTotalSoldByDate={fetchTotalSoldByDate} />
          </div>
          <div className="flex flex-col justify-center items-center mt-10">
            <LineChart chartData={chartData} />
            <div className="flex justify-center items-center mt-7 gap-10">
              <PieChartProduct />
              <PieChartCategory />
            </div>
          </div>
          <Button className="mt-10" onClick={toCashier} colorScheme="green">
            {"To Cashier Page >"}
          </Button>
        </div>
      </NavTemplateAdmin>
    </>
  );
};
