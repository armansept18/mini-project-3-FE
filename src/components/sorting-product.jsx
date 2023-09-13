import React, { useState } from "react";
import {
  ArrowUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import api from "../api/api";

export const SortingBar = ({ onSort }) => {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortClick = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    onSort(field, sortOrder);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
      }}
    >
      <span onClick={() => handleSortClick("product_name")}>
        Nama Produk{" "}
        {sortField === "product_name" && sortOrder === "asc" && (
          <ChevronUpIcon />
        )}
        {sortField === "product_name" && sortOrder === "desc" && (
          <ChevronDownIcon />
        )}
      </span>
      <span onClick={() => handleSortClick("category_id")}>
        Kategori{" "}
        {sortField === "category_id" && sortOrder === "asc" && <ChevronUpIcon />}
        {sortField === "category_id" && sortOrder === "desc" && (
          <ChevronDownIcon />
        )}
      </span>
      <span onClick={() => handleSortClick("price")}>
        Harga{" "}
        {sortField === "price" && sortOrder === "asc" && <ChevronUpIcon />}
        {sortField === "price" && sortOrder === "desc" && <ChevronDownIcon />}
      </span>
      <span onClick={() => handleSortClick("stock")}>
        Stok{" "}
        {sortField === "stock" && sortOrder === "asc" && <ChevronUpIcon />}
        {sortField === "stock" && sortOrder === "desc" && <ChevronDownIcon />}
      </span>
    </div>
  );
};
