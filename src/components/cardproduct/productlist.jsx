import { useEffect, useState } from "react";
import api from "../../api/api";
import { TiTick } from "react-icons/ti";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
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

export const CardProduct = ({ product, onEdit, onDelete, fetchSearch }) => {
  const [isTickVisible, setIsTickVisible] = useState(
    Array(product.length).fill(false)
  );
  const toast = useToast();

  const toggleStick = (index) => {
    const newIsTick = [...isTickVisible];
    newIsTick[index] = !newIsTick[index];
    setIsTickVisible(newIsTick);
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
    <Box overflowX="auto">
      <Table variant={"simple"} size={["sm", "md", "lg"]} spacing={3}>
        <Tbody>
          {product?.product?.map((item, i) => (
            <Tr key={i} className="justify-center">
              <Td
                className=" max-[473px]:hidden"
                width={["110px", "110px"]}
                minW={["100px", "100px"]}
              >
                <img
                  src={`http://localhost:2000/static/${item.image}`}
                  className="object-fill w-12 h-12 rounded-xl"
                  style={{
                    boxShadow: "1px 2px 3px black",
                    border: "1px solid white",
                  }}
                  alt=""
                />
              </Td>
              <Td width={["50px", "200px"]} minW={["50px", "200px"]}>
                {item.product_name}
              </Td>
              <Td width={["50px", "200px"]} minW={["50px", "200px"]}>
                {CategoryToName(item.category_id)}
              </Td>
              <Td width={["50px", "100px"]} minW={["50px", "100px"]}>
                {formatIdr(item.price)}
              </Td>
              <Td width={["50px", "100px"]} minW={["50px", "100px"]}>
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
  );
};
