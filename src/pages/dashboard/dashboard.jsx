import { Button, FormLabel } from "@chakra-ui/react";
import { NavTemplateAdmin } from "../../components/template/template";
import { useNavigate } from "react-router-dom";
import { LineChart } from "../../components/dashboard/line-chart";
import { PieChartCategory, PieChartProduct } from "../../components/dashboard/pie-chart";
import { ReportCard } from "../../components/dashboard/report-card";
import React, { useState } from "react";


export const DashboardPage = () => {
  const [date, setDate] = useState();
  const nav = useNavigate();
  function toCashier() {
    nav("/cashier");
  }
  return (
    <>
      <NavTemplateAdmin>
        <div className="flex flex-col justify-center items-center mt-10">
          <div className="flex justify-center items-center mt-10">
            <ReportCard />{" "}
            <Button className=" ml-5" onClick={toCashier} colorScheme="green">
              {"To Cashier Page >"}
            </Button>
          </div>
          <div className="mt-20 justify-start items-start"> 
            <p>Pilih Tanggal Transaksi :</p>
            <input type="date" onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="flex flex-col justify-center items-center mt-10">
            <LineChart />
            <div className="flex justify-center items-center mt-7 gap-10">
              <PieChartProduct />
              <PieChartCategory />
            </div>
          </div>
        </div>
      </NavTemplateAdmin>
    </>
  );
};
