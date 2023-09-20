import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Toast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ModalHeader } from "react-bootstrap";

export const ModalChangePassword = ({
  isOpen,
  onClose,
  onConfirm,
  emailToChange,
}) => {
  const [newPassword, setNewPassword] = useState("");
  console.log("newPasswordModal: ", newPassword);

  const handleConfirm = () => {
    onConfirm(emailToChange, newPassword, setNewPassword); // Pass the new password value to the parent component
  };

  useEffect(() => {
    if (isOpen) {
      setNewPassword("");
    }
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="pt-3 pl-3 font-bold">
            Change Cashier Password
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl display={"none"}>
              <FormLabel>email</FormLabel>
              <Input
                type="email"
                placeholder="email"
                defaultValue={emailToChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight={"normal"} mt="2%">
                New Password
              </FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type="text"
                  placeholder="Enter password"
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleConfirm}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
