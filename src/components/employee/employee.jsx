import { Button } from "@chakra-ui/button";
import { TableEmployee } from "../table/table-employee";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ModalCreateCashier } from "../modals/modal-create-new-cashier";
import { AddIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";

export const Employee = () => {
  // const [isCreateCashierModalOpen, setCreateCashierModalOpen] = useState(false);
  const disclousure = useDisclosure();
  // {onOpen, isOpen, onClose }
  const userSelector = useSelector((state) => state.auth);

  // const openCreateCashierModal = () => {
  //   setCreateCashierModalOpen(true);
  // };

  return (
    <>
      <div className="flex align-middle justify-evenly mb-3 mt-3 font-bold max-sm:mt-32 ">
        <div className="md:ml-64 border-b-2 border-black">
          TABEL DATA EMPLOYEE
        </div>

        <Button onClick={disclousure.onOpen} colorScheme="whatsapp" size={"sm"}>
          <AddIcon />
        </Button>
      </div>

      <div className="flex justify-center">
        <TableEmployee {...disclousure} />
      </div>
    </>
  );
};
