import { CardTransaction } from "../cardtransaction/cardtransaction";
import { NavBarAdmin } from "../navbar/navbaradmin";
import { NavBarCashier } from "../navbar/navbarcashier";
import { SideBarAdmin } from "../sidebar/sidebarAdmin";
import { SideBarCashier } from "../sidebar/sidebarCashier";

export const NavTemplateAdmin = ({ children }) => {
  return (
    <>
      <NavBarAdmin />
      <div>
        <div>{children}</div>
      </div>
      <SideBarAdmin />
    </>
  );
};

export const NavTemplateCashier = ({ children }) => {
  return (
    <>
      <NavBarCashier />
      <div>
        <div>{children}</div>
      </div>
      <SideBarCashier />
    </>
  );
};
