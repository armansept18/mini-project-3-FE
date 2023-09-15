import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import api from "../../api/api";
import { ModalProduct } from "./product-modal";

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "55px",
        }}
      >
        <Select
          size={"md"}
          width={"300px"}
          backgroundColor={"#F1F1F1"}
          placeholder="Kategori Produk :"
          // value={category}
          id="category"
          onChange={debouncedChangeHandler}
        >
          <option value="1">Coffee</option>
          <option value="2">Snack</option>
        </Select>
        <InputGroup size={"md"} width={"450px"} backgroundColor={"#F0F0F0"}>
          <InputLeftElement pointerEvents={"none"}>
            <SearchIcon />
          </InputLeftElement>
          <Input
            placeholder="Cari Produk Disini!"
            // value={search}
            id="search"
            onChange={debouncedChangeHandler}
          />
        </InputGroup>
        <Button colorScheme="green" onClick={onOpen}>Tambah Produk</Button>
        <ModalProduct isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </div>
    </>
  );
};
