import { useEffect, useState } from "react";
import api from "../../api/api";
import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { ModalDisableCashier } from "../modals/modal-disable-cashier";
import { DeleteIcon } from "@chakra-ui/icons";
import { ModalCreateCashier } from "../modals/modal-create-new-cashier";
import { ModalDeleteCashier } from "../modals/modal-delete-cashier";

export const TableEmployee = ({ onClose, isOpen }) => {
  const [cashier, setCashier] = useState([]);
  const toast = useToast();
  const [openModalDisable, setOpenModalDisable] = useState(false);
  const [userToDisable, setUserToDisable] = useState({
    email: "",
    isDisabled: false,
  });
  //delete
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState("");

  function openDeleteModalWithCashier(emailToDelete) {
    setEmailToDelete(emailToDelete);
    setOpenDeleteModal(true);
  }

  function closeDeleteModal() {
    setOpenDeleteModal(false);
  }

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

  const deleteCashier = async (emailToDelete) => {
    try {
      await api.delete(`/users/delete/${emailToDelete}`);

      setCashier((prevCashier) =>
        prevCashier.filter((employee) => employee.email !== emailToDelete)
      );
      toast({
        title: "Cashier Deleted",
        description: "The cashier has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log("error deleting cashier", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the cashier.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchCashier();
  }, []);

  return (
    <Box overflowX="auto">
      <Table
        variant="simple"
        size={["sm", "md", "lg"]} // Responsive table size based on screen size
        spacing={3} // Add spacing between columns and rows
      >
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
            <Th>Gender</Th>
            <Th display={"flex"} justifyContent={"center"}>
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {cashier.map((employee, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{employee.first_name}</Td>
              <Td>{employee.last_name}</Td>
              <Td>{employee.email}</Td>
              <Td>{employee.gender}</Td>
              <Td>
                <Flex justify={"space-around"} alignItems={"center"}>
                  <Button
                    colorScheme={employee.isDisable ? "green" : "red"}
                    size={["xs", "sm", "sm"]} // Responsive button size based on screen size
                    boxShadow={"xl"}
                    onClick={() =>
                      toggleDisable(employee.email, employee.isDisable)
                    }
                  >
                    {employee.isDisable ? "Enable" : "Disable"}
                  </Button>
                  <Button
                    ml={"3"}
                    size={"sm"}
                    boxShadow={"lg"}
                    onClick={() => openDeleteModalWithCashier(employee.email)}
                  >
                    <DeleteIcon />
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ModalCreateCashier
        isOpen={isOpen}
        onClose={onClose}
        fetchCashier={fetchCashier}
      />
      <ModalDisableCashier
        isOpen={openModalDisable}
        onClose={() => setOpenModalDisable(false)}
        onConfirm={confirmToggleDisable}
      />
      <ModalDeleteCashier
        isOpen={openDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={() => {
          deleteCashier(emailToDelete);
          closeDeleteModal();
        }}
      />
    </Box>
  );
};
