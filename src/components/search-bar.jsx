import debounce from "lodash.debounce";
import api from "../api/api";
import { useCallback, useEffect, useState } from "react";
import { Input, InputGroup, InputLeftElement, Select } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const SearchBar = ({ onSearch }) => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const debouncedFilter = useCallback(
    debounce((query) => {
      onSearch(category, query);
    }, 500),
    [category]
  );
  const searching = (query) => {
    if (!query) return setSearch("");
    debouncedFilter(query);
  };
  // const fetchProduct = () => {
  //   api
  //     .get("/products/search", {
  //       params: {
  //         search,
  //       },
  //     })
  //     .then((result) => setProduct.send(result.data))
  //     .catch((err) => console.log(err));
  // };
  useEffect(() => {
    debouncedFilter(search);
    return debouncedFilter.cancel;
  }, [search, category]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "75px",
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
            value={search}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </div>
    </>
  );
};
