import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../api/api";
export const ModalAddCategoryName = ({ isOpen, onClose, fetchCategory }) => {
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      category_name: "",
    },
    validationSchema: yup.object().shape({
      category_name: yup.string().required("Category name harus di isi!"),
    }),
    onSubmit: async (values) => {
      try {
        await api.post("/productcategories", { ...values });
        toast({
          title: "success add new category name",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        fetchCategory();
        onClose();
      } catch (err) {
        console.log(err?.message);
      }
    },
  });
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Category Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl
              isInvalid={
                formik.errors.category_name && formik.touched.category_name
              }
            >
              <Input
                placeholder="Category Name"
                onChange={formik.handleChange("category_name")}
              />
              <FormErrorMessage>{formik.errors.category_name}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={formik.handleSubmit}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
