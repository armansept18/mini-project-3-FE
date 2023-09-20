import { NavTemplateCashier } from "../../components/template/template";
const beHonest = require("../../assets/pictures/behonet-removebg-preview.png");
export const CashierLandingPage = () => {
  return (
    <>
      <NavTemplateCashier>
        <div className="flex justify-center ">
          <img src={beHonest} alt="" className="object-cover" />
        </div>
      </NavTemplateCashier>
    </>
  );
};
