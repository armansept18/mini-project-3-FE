import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import api from "../../api/api";
import { ModalProduct } from "../modals/modal-create-edit-product";

export const SearchBar = ({ setSearch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearchChange = (event) => {
    setSearch((search) => {
      return { ...search, [event.target.id]: event.target.value };
    });
  };
  const debouncedChangeHandler = useCallback(
    debounce(handleSearchChange, 300),
    []
  );
  return (
    <>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 4, md: 2 }}
        alignItems="flex-start"
        justify="center"
        marginLeft={{ base: 0, md: "256px" }}
        marginTop={{ base: "102px", md: 0 }}
        px={{ base: 4, md: 0 }}
      >
        <Select
          size="sm"
          width={{ base: "100%", md: "35%" }}
          maxWidth="180px"
          backgroundColor="#F1F1F1"
          placeholder="Products Category :"
          id="category"
          onChange={debouncedChangeHandler}
        >
          <option value="1">Coffee</option>
          <option value="2">Non Coffee</option>
          <option value="3">Food</option>
          <option value="4">Snack</option>
        </Select>
        <InputGroup
          size="md"
          width="100%"
          maxWidth={{ base: "100%", md: "550px" }}
          backgroundColor="#F0F0F0"
        >
          <InputLeftElement pointerEvents="none">
            <SearchIcon boxSize={3} />
          </InputLeftElement>
          <Input
            placeholder="Find Your Products Here!"
            id="search"
            onChange={debouncedChangeHandler}
            size="sm"
          />
        </InputGroup>
        <Button
          colorScheme="green"
          onClick={onOpen}
          size={{ base: "sm", md: "md" }}
          width="100%"
          maxWidth={{ base: "100%", md: "150px" }}
          marginStart={{ base: 0, md: 4 }}
          marginTop={{ base: 4, md: 0 }}
        >
          Add Product
        </Button>
        <ModalProduct isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </Stack>
    </>
  );
};
