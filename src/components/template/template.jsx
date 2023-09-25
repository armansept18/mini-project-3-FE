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

export const NavTemplateCashier = ({
  children,
  fetchSearch,
  category,
  fetchCategory,
  setCategoryId,
}) => {
  return (
    <>
      <NavBarCashier fetchSearch={fetchSearch} />
      <div>
        <div>{children}</div>
      </div>
      <SideBarCashier
        category={category}
        fetchCategory={fetchCategory}
        setCategoryId={setCategoryId}
      />
    </>
  );
};
