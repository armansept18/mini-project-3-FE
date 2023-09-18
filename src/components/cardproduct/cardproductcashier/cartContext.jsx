import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});

  const addToCart = (item) => {
    setCart(item);
  };

  useEffect(() => {
    console.log("cart", cart);
  }, [cart]);

  const decrementCart = () => {};

  const incrementCart = (item) => {
    setCart((item.quantity += 1));
    alert("success increment");
  };

  function submit() {}

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decrementCart, incrementCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
