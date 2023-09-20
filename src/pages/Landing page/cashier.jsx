import { NavBarLPCashier } from "../../components/navbar/navbarLPCashier";
import { SideBarCashier } from "../../components/sidebar/sidebarCashier";

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
