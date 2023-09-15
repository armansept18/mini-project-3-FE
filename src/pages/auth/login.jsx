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
  Img,
  Input,
  InputGroup,
  InputRightElement,
  ScaleFade,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import activeLabelStyles, {
  theme,
} from "../../components/login/floating-label";
import "../../../src/App.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../../redux/types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userLogin } from "../../middlewares/auth-middlewares";
import jwt_decode from "jwt-decode";
import background from "../../assets/pictures/peakpx.jpg";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

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
        const isDisable = result.user.isDisable;
        console.log("result", result);

        if (isDisable) {
          toast({
            title: "Account Disabled",
            description: "Your account has been disabled. Please contact Admin",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          return; // Prevent login
        } else if (result.success) {
          toast({
            title: "welcome",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });

          const tokenLocal = localStorage.getItem("auth");
          const decoded = jwt_decode(tokenLocal);

          console.log("decoded", decoded);
          if (decoded.role_id === 1) {
            return nav("/admin");
          } else if (decoded.role_id === 2) {
            return nav("/cashier-product");
          }
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
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    },
  });

  return (
    <>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex
          p={8}
          flex={1}
          align={"center"}
          justify={"center"}
          style={{
            backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.5), 
      rgba(0, 0, 0, 0.5)
    ), url(${background})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            color={"white"}
            bgColor={"rgb(17,24,39)"}
            rounded={"md"}
            p={"8"}
          >
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>

            <FormControl
              isInvalid={formik.errors.email && formik.touched.email}
            >
              <FormLabel>Email address</FormLabel>
              <Input
                type="text"
                required
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                value={formik.values.email}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            <Flex alignItems="center">
              <FormControl
                isInvalid={formik.errors.password && formik.touched.password}
                flex="1" // This makes the input take up the remaining space
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
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
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
            </Flex>

            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
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
        {/* <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://sprudge.com/wp-content/uploads/2017/12/mafia-coffee.jpg"
            }
          />
        </Flex> */}
      </Stack>
    </>
  );
};
