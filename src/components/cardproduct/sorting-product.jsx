import React, { useEffect, useState } from "react";
import {
  ArrowUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import api from "../../api/api";
import '../../styles/sorting-bar-responsive.css';

export const SortingBar = ({ setSortOrder, sortOrder }) => {
  const columnName = [
    { column_name: "Nama Produk", sortname: "product_name" },
    { column_name: "Kategori", sortname: "category_id" },
    { column_name: "Harga", sortname: "price" },
    { column_name: "Stok", sortname: "stock" },
  ];

  const handleColumnClick = (sortname) => {
    const newSortOrder = { orderBy: sortname, sortBy: "asc" };

    if (sortOrder.orderBy === sortname) {
      newSortOrder.sortBy = sortOrder.sortBy === "asc" ? "desc" : "asc";
    }
    setSortOrder(newSortOrder);
  };

  return (
    <div className="sorting-bar flex justify-center items-center gap-32 mt-5 ">
      {columnName.map((val) => (
        <span
          key={val.sortname}
          onClick={() => handleColumnClick(val.sortname)}
          style={{ cursor: "pointer" }}
        >
          {val.column_name}
          {sortOrder.orderBy === val.sortname ? (
            sortOrder.sortBy === "asc" ? (
              <ChevronUpIcon
              // onClick={() =>
              //   setSortOrder({ orderBy: val.sortname, sortBy: "desc" })
              // }
              />
            ) : (
              <ChevronDownIcon
              // onClick={() =>
              //   setSortOrder({ orderBy: val.sortname, sortBy: "asc" })
              // }
              />
            )
          ) : (
            <ArrowUpDownIcon
              boxSize={3}
              // onClick={() =>
              //   setSortOrder({ orderBy: val.sortname, sortBy: "desc" })
              // }
              onClick={() => handleColumnClick(val.sortname)}
            />
          )}
        </span>
      ))}
    </div>
  );
};
