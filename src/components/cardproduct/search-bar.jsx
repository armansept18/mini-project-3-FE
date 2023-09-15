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

export const SearchBar = ({ onSearch }) => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  

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
          value={category}
          onChange={handleCategoryChange}
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
            onChange={handleSearchChange}
          />
        </InputGroup>
        <Button onClick={onOpen}>Tambah Produk</Button>
        <ModalProduct isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </div>
    </>
  );
};
