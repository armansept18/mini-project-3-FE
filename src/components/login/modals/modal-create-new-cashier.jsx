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
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import api from "../../../api/api";

export const ModalCreateCashier = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("invalid email format")
        .required("email is required"),
      password: Yup.string().required("password required"),
      first_name: Yup.string().required("first name required"),
      last_name: Yup.string().required("last name required"),
      gender: Yup.string()
        .oneOf(["male", "female"], "please select valid gender")
        .required("gender is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await api.post("users/cashier", {
          ...values,
        });
        console.log(res);
        toast({
          title: "success add new cashier",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });

        onClose();
        return { success: true, res };
      } catch (error) {
        toast({
          title: "failed create new cashier",
          description: error?.message || "An error occurred",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        return { success: false, error: error.message };
      }
    },
  });

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {OverlayOne()}
        <ModalContent>
          <ModalHeader>Create New Cashier</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl mr="5%">
              <FormLabel fontWeight={"normal"}>First name</FormLabel>
              <Input
                type="text"
                required
                onChange={formik.handleChange("first_name")}
                value={formik.values.first_name}
                placeholder="First name"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight={"normal"}>Last name</FormLabel>
              <Input
                type="text"
                required
                onChange={formik.handleChange("last_name")}
                value={formik.values.last_name}
                placeholder="last name"
              />
            </FormControl>

            <Select
              placeholder="Gender"
              mt={"4%"}
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange("gender")}
              onBlur={formik.handleBlur}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>

            <FormControl mt="2%">
              <FormLabel fontWeight={"normal"}>Email address</FormLabel>
              <Input
                type="email"
                required
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight={"normal"} mt="2%">
                Password
              </FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  required
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
            <Button
              ml={"3"}
              colorScheme="green"
              onClick={formik.handleSubmit}
              isDisabled={!formik.isValid}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
