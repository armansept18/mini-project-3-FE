import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // If the item is already in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If the item is not in the cart, add it
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart);
    }
  };

  const decrementCart = (itemId) => {
    // Find the item in the cart
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === itemId
    );

    if (existingItemIndex !== -1) {
      // If the item is in the cart, decrement its quantity
      const updatedCart = [...cart];
      if (updatedCart[existingItemIndex].quantity > 1) {
        updatedCart[existingItemIndex].quantity -= 1;
        setCart(updatedCart);
      } else {
        // If the quantity becomes 0, remove the item from the cart
        updatedCart.splice(existingItemIndex, 1);
        setCart(updatedCart);
      }
    }
  };

  const incrementCart = (itemId) => {
    // Find the item in the cart
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === itemId
    );

    if (existingItemIndex !== -1) {
      // If the item is in the cart, increment its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    }
  };

  function clearCart() {
    setCart([]);
  }

  useEffect(() => {
    console.log("cart", cart);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decrementCart, incrementCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
