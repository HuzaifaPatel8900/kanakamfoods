"use client";

import React, { useMemo, useSyncExternalStore } from "react";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import { foodData } from "@/data/foodData";
import {
  getCartSummary,
  getServerCart,
  readCart,
  saveCart,
  subscribeToCart,
} from "@/utils/cart";

const MainContainer = () => {
  const cart = useSyncExternalStore(subscribeToCart, readCart, getServerCart);

  const cartSummary = useMemo(() => getCartSummary(cart), [cart]);

  const handleQuantityChange = (itemId: number, quantity: number) => {
    const nextCart = { ...cart };

    if (quantity <= 0) {
      delete nextCart[itemId];
    } else {
      nextCart[itemId] = quantity;
    }

    saveCart(nextCart);
  };

  return (
    <div className="bg-gray-200">
      <Navbar itemCount={cartSummary.itemCount} total={cartSummary.total} />
      <Home
        foodData={foodData}
        cart={cart}
        onQuantityChange={handleQuantityChange}
      />
    </div>
  );
};

export default MainContainer;
