"use client";

import { useState } from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";

const Form1 = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Create New Cashier
      </Heading>
      <Flex mt={"5%"}>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            First name
          </FormLabel>
          <Input id="first-name" placeholder="First name" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="last-name" fontWeight={"normal"}>
            Last name
          </FormLabel>
          <Input id="last-name" placeholder="First name" />
        </FormControl>
      </Flex>

      <Select placeholder="Gender" mt={"4%"}>
        <option value="option1">Male</option>
        <option value="option2">Female</option>
      </Select>

      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Email address
        </FormLabel>
        <Input id="email" type="email" />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password" fontWeight={"normal"} mt="2%">
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
};

export default function Multistep() {
  const toast = useToast();

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Form1 />
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Button
              w="7rem"
              colorScheme="green"
              variant="solid"
              onClick={() => {
                toast({
                  title: "Account created.",
                  description: "We've created your account for you.",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              }}
            >
              Submit
            </Button>
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
