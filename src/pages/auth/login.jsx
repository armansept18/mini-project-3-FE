import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import activeLabelStyles, {
  theme,
} from "../../components/login/floating-label";
import "../../../src/App.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../api/api";
import { useDispatch } from "react-redux";
import { types } from "../../redux/types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userLogin } from "../../middlewares/auth-middlewares";
// import { useHistory } from "react-router-dom";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const toast = useToast();
  // const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("invalid email format")
        .required("email is required"),
      password: Yup.string().required("password required"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await dispatch(userLogin(values));
        if (result.success) {
          toast({
            title: "welcome",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });

          return nav("home");
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid email or password. Please try again.",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    console.log();
  });
  return (
    <>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
            <FormControl
              isInvalid={formik.errors.email && formik.touched.email}
            >
              <FormLabel>Email address</FormLabel>
              <Input
                type="text"
                placeholder="input your email / username"
                required
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                value={formik.values.email}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="password"
                required
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                value={formik.values.password}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && formik.isValid) {
                    formik.handleSubmit();
                  }
                }}
              />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.500"}>Forgot password?</Text>
              </Stack>
              <Button
                colorScheme={"blue"}
                variant={"solid"}
                onClick={formik.handleSubmit}
                isDisabled={!formik.isValid}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://sprudge.com/wp-content/uploads/2017/12/mafia-coffee.jpg"
            }
          />
        </Flex>
      </Stack>
    </>
  );
};