import { Button } from "@chakra-ui/button";
import { TableEmployee } from "../table/table-employee";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ModalCreateCashier } from "../modals/modal-create-new-cashier";

export const Employee = () => {
  const [isCreateCashierModalOpen, setCreateCashierModalOpen] = useState(false);

  const userSelector = useSelector((state) => state.auth);

  const openCreateCashierModal = () => {
    setCreateCashierModalOpen(true);
  };

  return (
    <>
      <div className="flex align-middle justify-evenly mb-3 mt-3 font-bold ">
        <div className="md:ml-96">TABEL DATA EMPLOYEE</div>
        <Button onClick={openCreateCashierModal}>Create New Cashier</Button>
        <ModalCreateCashier
          isOpen={isCreateCashierModalOpen}
          onClose={() => setCreateCashierModalOpen(false)}
        />
      </div>

      <div className="flex justify-center">
        <TableEmployee onClose={() => setCreateCashierModalOpen(false)} />
      </div>
    </>
  );
};
