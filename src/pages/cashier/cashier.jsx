import { Employee } from "../../components/employee/employee";
import {
  NavTemplateAdmin,
  NavTemplateCashier,
} from "../../components/template/template";

export const CashierPage = () => {
  return (
    <>
      <NavTemplateAdmin>
        <div className="col-auto h-24 rounded max-md:mt-28 md:ml-64 md:max-w-7xl h-auto">
          <Employee />
        </div>
      </NavTemplateAdmin>
    </>
  );
};
