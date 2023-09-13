import { useEffect, useState } from "react";
import api from "../../api/api";
import { TiTick } from "react-icons/ti";

export const CardProduct = ({ product }) => {
  const [isTickVisible, setIsTickVisible] = useState(
    Array(product.length).fill(false)
  );

  const toggleStick = (index) => {
    const newIsTick = [...isTickVisible];
    newIsTick[index] = !newIsTick[index];
    setIsTickVisible(newIsTick);
  };

  return (
    <>
      {product.product?.map((item, i) => {
        return (
          <div
            className="bg-white flex justify-between w-full p-4  bg-gray-200 mt-2 items-center"
            style={{ borderRadius: "12px", border: "1px solid black" }}
            key={i}
            onClick={() => toggleStick(i)}
          >
            <div className="w-11 h-7 items-center flex">
              <img
                className="object-fill w-12 h-10"
                style={{
                  boxShadow: "1px 2px 3px black",
                  border: "1px solid white",
                }}
                src={item.image}
                alt=""
              />
            </div>
            <div className="flex items-center">
              <span>{item.product_name}</span>
              <hr style={{ color: "black" }} />
            </div>
            <div
              className="flex items-center p-1 w-7 h-7"
              style={{ border: "2px solid black" }}
            >
              {isTickVisible[i] && <TiTick />}
            </div>
          </div>
        );
      })}
    </>
  );
};
