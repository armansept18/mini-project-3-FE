import { useEffect, useState } from "react";
import api from "../../api/api";
import { TiTick } from "react-icons/ti";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";

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
    <>
      {product?.product?.map((item, i) => {
        return (
          <div
            className="bg-white flex justify-between w-full p-4  bg-gray-200 mt-2 items-center"
            style={{ borderRadius: "12px", border: "1px solid black" }}
            key={i}
            // onClick={() => toggleStick(i)}
          >
            <div className="w-11 h-7 items-center flex">
              <div
                className="flex items-center p-1 w-7 h-7"
                // style={{ border: "2px solid black" }}
              >
                {isTickVisible[i] && <TiTick />}
              </div>
              <img
                className="object-fill w-12 h-10"
                style={{
                  boxShadow: "1px 2px 3px black",
                  border: "1px solid white",
                  // marginLeft: "32px",
                }}
                // src={item.image}
                src={`http://localhost:2000/static/${item.image}`}
                alt=""
              />
            </div>
            <div className="flex items-center">
              <span>{item.product_name}</span>
              <hr style={{ color: "black" }} />
            </div>
            <div className="flex items-center">
              <span>{CategoryToName(item.category_id)}</span>
              <hr style={{ color: "black" }} />
            </div>
            <div className="flex items-center">
              <span>{formatIdr(item.price)}</span>
              <hr style={{ color: "black" }} />
            </div>
            <div className="flex items-center">
              <span>{item.stock}</span>
              <hr style={{ color: "black" }} />
            </div>
            <div className="flex items-center gap-3">
              <EditIcon cursor={"pointer"} onClick={() => onEdit(item)} />
              <DeleteIcon
                cursor={"pointer"}
                onClick={() => handleDelete(item)}
              />
              <hr style={{ color: "black" }} />
            </div>
          </div>
        );
      })}
    </>
  );
};
