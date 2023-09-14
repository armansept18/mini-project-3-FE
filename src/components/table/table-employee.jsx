import { useEffect, useState } from "react";
import api from "../../api/api";
import { Button, useToast } from "@chakra-ui/react";
import { ModalDisableCashier } from "../modals/modal-disable-cashier";

export const TableEmployee = ({ onClose }) => {
  const [cashier, setCashier] = useState([]);
  const toast = useToast();
  const [openModalDisable, setOpenModalDisable] = useState(false);
  const [userToDisable, setUserToDisable] = useState({
    email: "",
    isDisabled: false,
  });

  const fetchCashier = async () => {
    await api.get("/users/cashier").then((result) => setCashier(result.data));
  };

  const toggleDisable = async (email, isDisabled) => {
    setUserToDisable({ email, isDisabled });
    // Set the modal to open
    setOpenModalDisable(true);
  };

  const confirmToggleDisable = async () => {
    try {
      const { email, isDisabled } = userToDisable;
      const updatedStatus = isDisabled ? false : true;

      await api.patch("/users/disable", { email, isDisable: updatedStatus });

      setCashier((prevCashier) =>
        prevCashier.map((employee) =>
          employee.email === email
            ? { ...employee, isDisable: updatedStatus }
            : employee
        )
      );
      // Show a success toast message
      toast({
        title: isDisabled ? "User Enabled" : "User Disabled",
        description: isDisabled
          ? "The user has been enabled successfully."
          : "The user has been disabled successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log("error toggling user status", error);
      toast({
        title: "Error",
        description: "An error occurred while toggling the user status.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setOpenModalDisable(false);
    }
  };

  useEffect(() => {
    fetchCashier();
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
            <th class="border border-slate-600 p-1.5">Action</th>
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
              <td class="border border-slate-700 p-2">
                <Button
                  colorScheme={employee.isDisable ? "green" : "red"}
                  size={"xs"}
                  onClick={() =>
                    toggleDisable(employee.email, employee.isDisable)
                  }
                >
                  {employee.isDisable ? "Enable" : "Disable"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalDisableCashier
        isOpen={openModalDisable}
        onClose={() => setOpenModalDisable(false)}
        onConfirm={confirmToggleDisable}
      />
    </>
  );
};
