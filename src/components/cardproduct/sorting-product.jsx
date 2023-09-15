import React, { useEffect, useState } from "react";
import {
  ArrowUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import api from "../../api/api";

export const SortingBar = ({ setSortOrder, sortOrder }) => {
  // const [sortField, setSortField] = useState(null);
  // const [sortOrder, setSortOrder] = useState("asc");
  const columnName = [
    { column_name: "Nama Produk", sortname: "product_name" },
    { column_name: "Kategori", sortname: "category_id" },
    { column_name: "Harga", sortname: "price" },
    { column_name: "Stok", sortname: "stock" },
  ];
  // const handleSortClick = (field) => {
  //   if (field === sortField) {
  //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortField(field);
  //     setSortOrder("asc");
  //   }
  //   let sortingRoute;
  //   switch (field) {
  //     case "product_name":
  //       sortingRoute = "/products/name-sorting";
  //       break;
  //     case "category_id":
  //       sortingRoute = "/products/category-sorting";
  //       break;
  //     case "price":
  //       sortingRoute = "/products/price-sorting";
  //       break;
  //     case "stock":
  //       sortingRoute = "/products/stock-sorting";
  //       break;
  //     default:
  //       sortingRoute = "/products/name-sorting";
  //   }
  //   api
  //     .get(sortingRoute, { params: { order: sortOrder } })
  //     .then((response) => {
  //       onSort(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error sorting data:", error);
  //     });
  // };
  // useEffect(() => {
  //   if (sortField) {
  //     onSort(sortField, sortOrder);
  //   }
  // }, [sortField, sortOrder]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
      }}
    >
      {columnName.map((val) => (
        <span>
          {val.column_name}
          {sortOrder.orderBy === val.sortname ? (
            sortOrder.sortBy === "asc" ? (
              <ChevronUpIcon
                onClick={() =>
                  setSortOrder({ orderBy: val.sortname, sortBy: "desc" })
                }
              />
            ) : (
              <ChevronDownIcon
                onClick={() =>
                  setSortOrder({ orderBy: val.sortname, sortBy: "asc" })
                }
              />
            )
          ) : (
            <ArrowUpDownIcon
              boxSize={3}
              onClick={() =>
                setSortOrder({ orderBy: val.sortname, sortBy: "desc" })
              }
            />
          )}
        </span>
      ))}

      {/* <span onClick={() => handleSortClick("category_id")}>
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
      </span> */}
    </div>
  );
};
