import { useEffect, useState } from "react";
import api from "../../api/api";
import {
  ArrowUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";

const CategoryToName = (category_id) => {
  switch (category_id) {
    case 1:
      return "Coffee";
    case 2:
      return "Non Coffee";
    case 3:
      return "Food";
    case 4:
      return "Snack";
    default:
      return "-";
  }
};

export const CardProduct = ({
  product,
  onEdit,
  onDelete,
  fetchSearch,
  setSortOrder,
  sortOrder,
}) => {
  const toast = useToast();
  const columnName = [
    { column_name: "Product Name", sortname: "product_name" },
    { column_name: "Category", sortname: "category_id" },
    { column_name: "Price", sortname: "price" },
    { column_name: "Stock", sortname: "stock" },
  ];
  const handleColumnClick = (sortname) => {
    const newSortOrder = { orderBy: sortname, sortBy: "asc" };

    if (sortOrder.orderBy === sortname) {
      newSortOrder.sortBy = sortOrder.sortBy === "asc" ? "desc" : "asc";
    }
    setSortOrder(newSortOrder);
  };

  const formatIdr = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const handleDelete = (item) => {
    const shouldDelete = window.confirm("Anda Yakin Akan Hapus Produk Ini?");
    if (shouldDelete) {
      api
        .delete(`/products/${item.id}`)
        .then((result) => {
          console.log(result.data.message);
          toast({
            title: "Berhasil Dihapus!",
            status: "success",
            description: "Produk Telah Dihapus",
            isClosable: true,
            position: "top",
            duration: 2023,
          });

          onDelete(item);
        })
        .catch((error) => {
          console.error("Error Hapus Produk:", error);
          // toast({
          //   title: "Gagal Menghapus!",
          //   description: error?.response?.data,
          //   status: "error",
          //   position: "top",
          //   isClosable: true,
          //   duration: 2023,
          // });
        });
      fetchSearch(1, 1);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <Box overflowX="auto" marginLeft={{ base: 0, md: "256px" }}>
        <Table variant={"simple"} size={["sm", "md", "lg"]} spacing={3}>
          <Thead>
            <Tr>
              <Th className="max-[480px]:hidden"></Th>
              {columnName.map((val) => (
                <Th
                  className="text-xs"
                  key={val.sortname}
                  width={["120px", "120px"]}
                  minW={["110px", "110px"]}
                  onClick={() => handleColumnClick(val.sortname)}
                  style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  {val.column_name}
                  {sortOrder.orderBy === val.sortname ? (
                    sortOrder.sortBy === "asc" ? (
                      <ChevronUpIcon />
                    ) : (
                      <ChevronDownIcon />
                    )
                  ) : (
                    <ArrowUpDownIcon
                      boxSize={3}
                      onClick={() => handleColumnClick(val.sortname)}
                    />
                  )}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {product?.product?.map((item, i) => (
              <Tr key={i} className="justify-center">
                <Td
                  className="max-[480px]:hidden"
                  width={["110px", "110px"]}
                  minW={["50px", "100px"]}
                >
                  <img
                    src={`https://api-mini-project-3.nazhifsetya.site/static/${item.image}`}
                    className="object-fill w-12 h-12 rounded-xl"
                    style={{
                      boxShadow: "1px 2px 3px black",
                      border: "1px solid white",
                    }}
                    alt=""
                  />
                </Td>
                <Td
                  className="text-sm"
                  width={["50px", "200px"]}
                  minW={["50px", "100px"]}
                >
                  {item.product_name}
                </Td>
                <Td
                  className="text-sm"
                  width={["50px", "200px"]}
                  minW={["50px", "100px"]}
                >
                  {CategoryToName(item.category_id)}
                </Td>
                <Td
                  className="text-sm"
                  width={["50px", "200px"]}
                  minW={["50px", "100px"]}
                >
                  {formatIdr(item.price)}
                </Td>
                <Td
                  className="text-sm"
                  width={["50px", "200px"]}
                  minW={["50px", "100px"]}
                >
                  {item.stock}
                </Td>
                <Td width={["50px", "50px"]} minW={["50px", "50px"]}>
                  <EditIcon cursor={"pointer"} onClick={() => onEdit(item)} />
                </Td>
                <Td width={["50px", "50px"]} minW={["50px", "50px"]}>
                  <DeleteIcon
                    cursor={"pointer"}
                    onClick={() => handleDelete(item)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
};
