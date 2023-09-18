import photo from "../../assets/pictures/ngopi.jpeg";
import React from "react";
import {
  CartProvider,
  useCart,
} from "../cardproduct/cardproductcashier/cartContext";
import emptyCart from "../../assets/icons/cart.svg";

export const CardTransaction = () => {
  const { cart, incrementCart } = useCart();
  console.log(cart);

  return (
    <>
      <div className="bg-gray-900 rounded-xl md:w-96 md:h-full p-2 flex flex-col">
        {/* transaction */}
        <div className="text-white flex justify-center border-b-4 p-4">
          <span className="font-semibold text-lg">TRANSACTION</span>
        </div>

        {/* cart */}
        <div className=" flex justify-between items-center bg-gray-300 rounded-xl mt-2 p-4 md:w-full h-24">
          {/* item 1 (photo) */}
          {/* ternary here */}
          <div className="flex-shrink-0">
            <img src={cart.image} alt="pho" class="w-16 h-16 rounded-full" />
          </div>

          {/* item 2 (description) */}
          <div className="flex-shrink-0 ">
            <div>{cart.product_name}</div>
            <div>Rp {Number(cart.price).toLocaleString(`id-ID`)}</div>
          </div>

          {/* item 3 (increment) */}
          <div class="flex items-center justify-between w-1/4">
            <button
              class="flex-shrink-0 w-8 h-8 px-2 py-1 border bg-gray-700 border-gray-600 rounded text-white"
              onclick="decrement()"
            >
              -
            </button>
            <span class="flex-shrink-0 w-8 h-8 bg-white flex items-center justify-center font-semibold ml-0.5">
              1
            </span>
            <button
              class="flex-shrink-0 w-8 h-8 px-2 py-1 border bg-gray-700 border-gray-600 rounded text-white ml-0.5"
              onclick="increment()"
            >
              +
            </button>
          </div>
        </div>

        {/* submit button */}
        <div className=" bg-gray-300 rounded-xl mt-2 p-4 md:w-full h-24">
          Submit
        </div>
      </div>
    </>
  );
};
