import { useEffect, useState } from "react";
import api from "../../api/api";
import { TiTick } from "react-icons/ti";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

const CategoryToName = (category_id) => {
  switch (category_id) {
    case 1:
      return "Coffee";
    case 2:
      return "Snack";
    default:
      return "-";
  }
};

export const CardProduct = ({ product, onEdit, onDelete }) => {
  const [isTickVisible, setIsTickVisible] = useState(
    Array(product.length).fill(false)
  );
  // console.log(product, "inni ashdhasd");
  const toggleStick = (index) => {
    const newIsTick = [...isTickVisible];
    newIsTick[index] = !newIsTick[index];
    setIsTickVisible(newIsTick);
  };

  const formatIdr = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <>
      {product?.map((item, i) => {
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
                  marginLeft: "32px",
                }}
                // src={item.image}
                src={`http://localhost:3000/static/${item.image}`}
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
              <span>{item.price}</span>
              <hr style={{ color: "black" }} />
            </div>
            <div className="flex items-center">
              <span>{item.stock}</span>
              <hr style={{ color: "black" }} />
            </div>
            <div className="flex items-center gap-5">
              <EditIcon cursor={"pointer"} onClick={() => onEdit(item)} />
              <DeleteIcon cursor={"pointer"} onClick={() => onDelete(item)} />
              <hr style={{ color: "black" }} />
            </div>
          </div>
        );
      })}
    </>
  );
};
