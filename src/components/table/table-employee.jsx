import { useEffect, useState } from "react";
import api from "../../api/api";

export const TableEmployee = ({ onClose }) => {
  const [cashier, setCashier] = useState([]);

  const fetchCashier = async () => {
    await api.get("/users/cashier").then((result) => setCashier(result.data));
  };

  useEffect(() => {
    fetchCashier();
    console.log(cashier);
  }, []);
  useEffect(() => {
    fetchCashier();
  }, [onClose]);

  return (
    <>
      <table class="border-collapse border border-slate-500 md:table-fixed">
        <thead>
          <tr>
            <th className="border border-slate-600 p-1.5">#</th>
            <th class="border border-slate-600 p-1.5">First Name</th>
            <th class="border border-slate-600 p-1.5">Last Name</th>
            <th class="border border-slate-600 p-1.5">Email</th>
            <th class="border border-slate-600 p-1.5">Gender</th>
          </tr>
        </thead>

        <tbody>
          {cashier.map((employee, index) => (
            <tr key={index}>
              <td className="border border-slate-700 p-1.5">{index + 1}</td>
              <td class="border border-slate-700 p-1.5">
                {employee.first_name}
              </td>
              <td class="border border-slate-700 p-1.5">
                {employee.last_name}
              </td>
              <td class="border border-slate-700 p-1.5">{employee.email}</td>
              <td class="border border-slate-700 p-1.5">{employee.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
