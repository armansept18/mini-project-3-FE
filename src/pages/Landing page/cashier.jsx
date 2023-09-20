
import { NavBarLPCashier } from "../../components/navbar/navbarLPCashier";
import { SideBarCashier } from "../../components/sidebar/sidebarCashier";

import { NavTemplateCashier } from "../../components/template/template";
const beHonest = require("../../assets/pictures/behonet-removebg-preview.png");

export const CashierLandingPage = () => {
  const fetchSearch = () => {
    console.log("apa ini");
  };
  return (
    <>
      <NavBarLPCashier />
      <div className="center flex justify-center">
        Welcome to cashier page :)
      </div>
      <SideBarCashier />
    </>
  );
};
