import { useSelector } from "react-redux";
import { NavBarLPCashier } from "../../components/navbar/navbarLPCashier";
import { SideBarCashier } from "../../components/sidebar/sidebarCashier";
import { NavTemplateCashier } from "../../components/template/template";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const beHonest = require("../../assets/pictures/behonet-removebg-preview.png");
const workSpirit = require("../../assets/pictures/semangat-removebg-preview.png");
const loading = require("../../assets/icons/loading.gif");

export const CashierLandingPage = () => {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  const isAdmin = userSelector.role_id == 1;

  const toAdmin = () => {
    nav("/admin");
  };
  return (
    <>
      <NavBarLPCashier />
      <div className="flex justify-center items-center max-sm:mt-20">
        <div className="flex flex-col justify-center col-auto items-center">
          <img src={workSpirit} alt="" className="object-cover " />
          {isAdmin ? (
            <Button onClick={toAdmin} colorScheme="green">
              {" To Admin Page >"}
            </Button>
          ) : null}
        </div>
      </div>
      <SideBarCashier />
    </>
  );
};
