import photo from "../../assets/pictures/ngopi.jpeg";
import React, { useEffect } from "react";
import {
  CartProvider,
  useCart,
} from "../cardproduct/cardproductcashier/cartContext";
import emptyCart from "../../assets/icons/cart.svg";
import api from "../../api/api";
import { useToast } from "@chakra-ui/react";
import useSound from "use-sound";
import boopSfx from "../../assets/sounds/y2mate.com - Button click sound  sound effect_64kbps.mp3";
import submitSfx from "../../assets/sounds/submit.mp3";
import errorSfx from "../../assets/sounds/error.mp3";

export const CardTransaction = () => {
  const { cart, incrementCart, decrementCart, clearCart } = useCart();
  const toast = useToast();
  const [playClear] = useSound(boopSfx, { volume: 0.3 });
  const [playSubmit] = useSound(submitSfx, { volume: 0.3 });
  const [playError] = useSound(errorSfx, { volume: 0.3 });

  async function submit() {
    try {
      // prepare data that are want to send to back end
      /*  const products = cart.map((cartItem) => ({
        id: cartItem.id,
        quantity: cartItem.quantity,
      })); */

      const products = JSON.parse(localStorage.getItem("cart"));

      const requestData = {
        products: products,
      };

      const response = await api.post("/transactions/create", requestData);
      if (response.status === 200) {
        const responseData = response.data;
        console.log("Transaction created:", responseData);
        playSubmit(); // ?
        toast({
          title: "Success",
          description: "Success Create Transaction",
          status: "success",
          duration: 2200,
          isClosable: true,
          position: "top",
        });
        clearCart();
      } else {
        console.error("Transaction creation failed");
        toast({
          title: "Failed",
          description: "Transaction creation failed",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log("Error creating transaction:", error?.response?.data);
      playError();
      toast({
        title: "Error creating transaction",
        description: error?.response?.data,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  }

  const isCartEmpty = cart.length === 0;

  const total = cart.reduce((total, item) => {
    const unitPrice = item.price;
    const quantity = item.quantity;
    return total + unitPrice * quantity;
  }, 0);

  return (
    <>
      <div className="bg-gray-900 rounded-xl md:w-96 md:h-full p-2 flex flex-col">
        {/* transaction */}
        <div className="text-white flex justify-center border-b-4 p-4">
          <span className="font-semibold text-lg">TRANSACTION</span>
        </div>

        {isCartEmpty ? (
          <div className="flex flex-col items-center justify-center bg-gray-300 rounded-xl mt-5 p-4 md:w-full h-24">
            <img src={emptyCart} alt="empty cart" className="w-10 h-10" />
            <div>Cart Empty!</div>
          </div>
        ) : (
          cart.map((cartItem) => (
            <div
              key={cartItem.id}
              className="flex justify-between items-center bg-gray-300 rounded-xl mt-2 p-4 md:w-full h-24"
            >
              {/* ...item content */}
              <div className="flex-shrink-0">
                <img
                  src={cartItem.image}
                  alt="pho"
                  class="w-16 h-16 rounded-full"
                />
              </div>

              {/* item 2 (description) */}
              <div className="flex-shrink-0 ">
                <div>{cartItem.product_name}</div>
                <div>Rp {Number(cartItem.price).toLocaleString(`id-ID`)}</div>
              </div>

              <div className="flex items-center justify-between w-1/4">
                <button
                  onClick={() => decrementCart(cartItem.id)}
                  className="flex-shrink-0 w-8 h-8 px-2 py-1 border bg-gray-700 border-gray-600 rounded text-white"
                >
                  -
                </button>
                <span className="flex-shrink-0 w-8 h-8 bg-white flex items-center justify-center font-semibold ml-0.5">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={() => incrementCart(cartItem.id)}
                  className="flex-shrink-0 w-8 h-8 px-2 py-1 border bg-gray-700 border-gray-600 rounded text-white ml-0.5"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}

        {isCartEmpty ? null : (
          <>
            <div className="flex items-center justify-center hover:bg-blue-500 bg-gray-300 rounded-xl mt-5 p-4 md:w-full h-10 cursor-pointer text-xl">
              Total : Rp {Number(total).toLocaleString(`id-ID`)}
            </div>
            <div
              className="flex items-center justify-center hover:bg-blue-500 bg-gray-300 rounded-xl mt-5 p-4 md:w-full h-10 cursor-pointer text-xl"
              onClick={() => {
                submit();
              }}
            >
              Submit
            </div>
            <div
              className="flex items-center justify-center hover:bg-blue-500 bg-gray-300 rounded-xl mt-3 p-4 md:w-full h-10 cursor-pointer text-xl"
              onClick={() => {
                clearCart();
                playClear();
              }}
            >
              Clear
            </div>
          </>
        )}
      </div>
    </>
  );
};
