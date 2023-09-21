import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export const ModalDisableCashier = ({ isOpen, onClose, onConfirm }) => {
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure want to disable cashier?</ModalHeader>
          <ModalCloseButton />

          <ModalFooter
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button colorScheme="red" onClick={onClose}>
              No
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onConfirm} ml={"5"}>
              Yes,I'm Sure
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
