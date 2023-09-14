import {
  Button,
  FormControl,
  FormErrorMessage,
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
import { useEffect, useState } from "react";
import * as Yup from "yup";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { receiveUser, userLogin } from "../../middlewares/auth-middlewares";

export const ModalCreateCashier = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  //sub modal
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const openSubModal = () => setIsSubModalOpen(true);

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
      role_id: 2,
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
        console.log(res.data);
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
          description: "email already registered",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        return { success: false, error: error.message };
      }
    },
  });

  const handleFormik = formik.handleSubmit;

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {OverlayOne()}
        <ModalContent>
          <ModalHeader>Create New Cashier</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl
              mr="5%"
              isInvalid={formik.errors.first_name && formik.touched.first_name}
            >
              <FormLabel fontWeight={"normal"}>First name</FormLabel>
              <Input
                type="text"
                required
                onChange={formik.handleChange("first_name")}
                value={formik.values.first_name}
                onBlur={formik.handleBlur}
                placeholder="First name"
              />
              <FormErrorMessage>{formik.errors.first_name}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={formik.errors.last_name && formik.touched.last_name}
            >
              <FormLabel fontWeight={"normal"}>Last name</FormLabel>
              <Input
                type="text"
                required
                onChange={formik.handleChange("last_name")}
                value={formik.values.last_name}
                placeholder="last name"
              />
              <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={formik.errors.gender && formik.touched.gender}
            >
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
              <FormErrorMessage>{formik.errors.gender}</FormErrorMessage>
            </FormControl>

            <FormControl
              mt="2%"
              isInvalid={formik.errors.email && formik.touched.email}
            >
              <FormLabel fontWeight={"normal"}>Email address</FormLabel>
              <Input
                type="email"
                required
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={formik.errors.password && formik.touched.password}
            >
              <FormLabel fontWeight={"normal"} mt="2%">
                Password for new cashier
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
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl display={"none"}>
              <FormLabel fontWeight={"normal"}>role_id</FormLabel>
              <Input value={formik.values.role_id} defaultValue={2} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
            <Button
              ml={"3"}
              colorScheme="green"
              onClick={openSubModal}
              // isDisabled={!formik.isValid}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Submodal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        handleFormik={handleFormik}
      />
    </>
  );
};

const Submodal = ({ isOpen, onClose, handleFormik }) => {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const email = userSelector.email;
  // console.log("email: ", email);
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const formik2 = useFormik({
    initialValues: {
      email: userSelector.email,
      password: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required("password required"),
    }),
    onSubmit: async (value) => {
      // console.log(value);
      try {
        const res = await api.post("/users/passwordValidation", {
          ...value,
        });

        console.log("res", res);

        if (res.data) {
          handleFormik();
        } else {
          toast({
            title: "failed to create cashier",
            description: "Invalid admin email or password. Please try again.",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        }

        onClose();
        return { success: true, res };
      } catch (error) {
        return console.log(error?.message);
      }
    },
  });
  useEffect(() => {
    formik2.setFieldValue("email", userSelector.email);
  }, [userSelector]);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onclose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Input Admin Password</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl display={"none"}>
              <FormLabel>email</FormLabel>
              <Input type="email" placeholder="email" defaultValue={email} />
            </FormControl>

            <FormControl
              isInvalid={formik2.errors.password && formik2.touched.password}
            >
              <FormLabel fontWeight={"normal"} mt="2%">
                Admin Password
              </FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  required
                  onChange={formik2.handleChange("password")}
                  value={formik2.values.password}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik2.errors.password}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={formik2.handleSubmit}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
