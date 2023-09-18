import photo from "../../assets/pictures/ngopi.jpeg";
import React from "react";
import {
  CartProvider,
  useCart,
} from "../cardproduct/cardproductcashier/cartContext";
import emptyCart from "../../assets/icons/cart.svg";
import api from "../../api/api";
import { useToast } from "@chakra-ui/react";

export const CardTransaction = () => {
  const { cart, incrementCart, decrementCart, clearCart } = useCart();
  const toast = useToast();

  async function submit() {
    try {
      // prepare data that are want to send to back end
      const products = cart.map((cartItem) => ({
        id: cartItem.id,
        quantity: cartItem.quantity,
      }));

      const requestData = {
        products: products,
      };

      const response = await api.post("/transactions/create", requestData);
      if (response.status === 200) {
        // Transaction created successfully
        const responseData = response.data;
        console.log("Transaction created:", responseData);
        toast({
          title: "Success",
          description: "Success Create Transaction",
          status: "success",
          duration: 2000,
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
      console.error("Error creating transaction:", error);
      toast({
        title: "Error creating transaction",
        description: `Cart Kosong!`,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  }

  const isCartEmpty = cart.length === 0;

  return (
    <>
      <div className="bg-gray-900 rounded-xl md:w-96 md:h-full p-2 flex flex-col">
        {/* transaction */}
        <div className="text-white flex justify-center border-b-4 p-4">
          <span className="font-semibold text-lg">TRANSACTION</span>
        </div>

        {isCartEmpty ? (
          <div className="flex flex-col items-center justify-center hover:bg-blue-300 bg-gray-300 rounded-xl mt-5 p-4 md:w-full h-24 cursor-pointer">
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

        <div
          className="flex items-center justify-center hover:bg-blue-300 bg-gray-300 rounded-xl mt-5 p-4 md:w-full h-24 cursor-pointer"
          onClick={submit}
        >
          Submit
        </div>
      </div>
    </>
  );
};
