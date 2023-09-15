import { Button } from "@chakra-ui/react";
import { NavTemplateAdmin } from "../../components/template/template";
import { useNavigate } from "react-router-dom";

export const DashboardPage = () => {
  const nav = useNavigate();
  function toCashier() {
    nav("/cashier");
  }
  return (
    <>
      <NavTemplateAdmin>
        <div class="flex items-center justify-center h-24 rounded bg-gray-50 max-md:mt-28">
          <h1>INI PAGE DASHBOARD MANAGEMENT</h1>
          <Button onClick={toCashier} ml={"8"}>
            to Cashier Page
          </Button>
        </div>
      </NavTemplateAdmin>
    </>
  );
};
