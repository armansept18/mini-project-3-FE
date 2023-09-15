import React, { useEffect, useState } from "react";
import {
  ArrowUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import api from "../../api/api";

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
    let sortingRoute;
    switch (field) {
      case "product_name":
        sortingRoute = "/products/name-sorting";
        break;
      case "category_id":
        sortingRoute = "/products/category-sorting";
        break;
      case "price":
        sortingRoute = "/products/price-sorting";
        break;
      case "stock":
        sortingRoute = "/products/stock-sorting";
        break;
      default:
        sortingRoute = "/products/name-sorting";
    }
    api
      .get(sortingRoute, { params: { order: sortOrder } })
      .then((response) => {
        onSort(response.data);
      })
      .catch((error) => {
        console.error("Error sorting data:", error);
      });
  };
  useEffect(() => {
    if (sortField) {
      onSort(sortField, sortOrder);
    }
  }, [sortField, sortOrder]);

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
        {sortField === "product_name" ? (
          sortOrder === "asc" ? (
            <ChevronUpIcon />
          ) : (
            <ChevronDownIcon />
          )
        ) : (
          <ArrowUpDownIcon boxSize={3} />
        )}
      </span>
      <span onClick={() => handleSortClick("category_id")}>
        Kategori{" "}
        {sortField === "category_id" ? (
          sortOrder === "asc" ? (
            <ChevronUpIcon />
          ) : (
            <ChevronDownIcon />
          )
        ) : (
          <ArrowUpDownIcon boxSize={3} />
        )}
      </span>
      <span onClick={() => handleSortClick("price")}>
        Harga{" "}
        {sortField === "price" ? (
          sortOrder === "asc" ? (
            <ChevronUpIcon />
          ) : (
            <ChevronDownIcon />
          )
        ) : (
          <ArrowUpDownIcon boxSize={3} />
        )}
      </span>
      <span onClick={() => handleSortClick("stock")}>
        Stok{" "}
        {sortField === "stock" ? (
          sortOrder === "asc" ? (
            <ChevronUpIcon />
          ) : (
            <ChevronDownIcon />
          )
        ) : (
          <ArrowUpDownIcon boxSize={3} />
        )}
      </span>
    </div>
  );
};
