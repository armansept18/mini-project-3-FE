import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export const ModalDeleteCashier = ({ isOpen, onClose, onConfirm }) => {
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>YAKINN LURR?</ModalHeader>
          <ModalCloseButton />

          <ModalFooter
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button colorScheme="red" onClick={onClose}>
              GAK DULU
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onConfirm} ml={"5"}>
              YAKIN POLL
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
