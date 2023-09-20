import { useEffect, useState } from "react";
import { useCart } from "./cartContext";
import useSound from "use-sound";
import boopSfx from "../../../assets/sounds/y2mate.com - Button click sound  sound effect_64kbps.mp3";

export const CardCoffe = ({ item }) => {
  const { addToCart } = useCart();

  const formatIdr = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const [play] = useSound(boopSfx, { volume: 0.3 });
  console.log("item", item);

  return (
    <>
      <div
        className="bg-gray-100 p-2 mt-10 max-md:w-28  cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-100 hover:scale-100"
        style={{ borderRadius: "12px", boxShadow: "2px 2px 3px black" }}
        onClick={() => {
          addToCart(item);
          play();
        }}
      >
        <div className="flex justify-center ">
          <img
            style={{
              borderRadius: "12px",
              boxShadow: "1px 1px 2px black",
              width: "150px",
              height: "90px",
            }}
            className="object-fill max-md:h-7"
            src={`http://localhost:2000/static/${item.image}`}
            alt=""
          />
        </div>
        <div className="col-auto items-center">
          <div className="flex justify-center p-2 text-center">
            <span
              className="font-bold text-sm w-20"
              style={{ fontSize: "14px" }}
            >
              {item.product_name}
            </span>
          </div>
          <div className="flex justify-center">
            <span style={{ fontSize: "14px" }}>
              {formatIdr.format(item.price)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
