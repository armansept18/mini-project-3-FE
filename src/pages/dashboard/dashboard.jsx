import { Button } from "@chakra-ui/react";
import { NavTemplateAdmin } from "../../components/template/template";
import { useNavigate } from "react-router-dom";
import { LineChart } from "../../components/dashboard/line-chart";
import { PieChartCategory, PieChartProduct } from "../../components/dashboard/pie-chart";
import { ReportCard } from "../../components/dashboard/report-card";

export const DashboardPage = () => {
  const nav = useNavigate();
  function toCashier() {
    nav("/cashier");
  }
  return (
    <>
      <NavTemplateAdmin>
        <div className="flex flex-col justify-center items-center">
          <ReportCard />
          <div className="flex flex-col justify-center items-center">
            <LineChart />
            <div className="flex justify-center items-center gap-10">
              <PieChartProduct />
              <PieChartCategory />
            </div>
          </div>
        </div>
      </NavTemplateAdmin>
    </>
  );
};
