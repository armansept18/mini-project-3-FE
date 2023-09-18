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
import { SelectCategory } from "../selectoption/selectoptioncategory";
export const ModalAddCategoryName = ({
  isOpen,
  onClose,
  fetchCategory,
  edit,
  category,
  onSelectCategoryEdit,
  idSeselectCategoryModal,
  fetchProduct,
}) => {
  console.log(idSeselectCategoryModal);
  const toast = useToast();
  const validationSchemaAdd = yup.object().shape({
    category_name: yup.string().required("Category name harus di isi!"),
  });

  const validationSchemaEdit = yup.object().shape({
    category_name: yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      category_name: "",
    },
    validationSchema: edit ? validationSchemaEdit : validationSchemaAdd,
    onSubmit: async (values) => {
      try {
        if (edit) {
          await api.patch(`/products/editcategoryproduct/${edit.id}`, {
            category_id: idSeselectCategoryModal,
          });

          toast({
            title: "success add new category name",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
          fetchCategory();
          fetchProduct();
          onClose();
        } else {
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
        }
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
          {edit ? (
            <ModalHeader>Edit Category Name</ModalHeader>
          ) : (
            <ModalHeader>Add Category Name</ModalHeader>
          )}

          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl
              isInvalid={
                formik.errors.category_name && formik.touched.category_name
              }
            >
              {edit ? (
                <SelectCategory
                  edit={edit}
                  category={category}
                  onSelectCategoryEdit={onSelectCategoryEdit}
                />
              ) : (
                <Input
                  placeholder="Category Name"
                  onChange={formik.handleChange("category_name")}
                />
              )}

              <FormErrorMessage>{formik.errors.category_name}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {edit ? (
              <Button
                disabled={idSeselectCategoryModal === undefined}
                colorScheme="blue"
                mr={3}
                onClick={formik.handleSubmit}
              >
                Edit Category
              </Button>
            ) : (
              <Button colorScheme="blue" mr={3} onClick={formik.handleSubmit}>
                Add
              </Button>
            )}

            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
