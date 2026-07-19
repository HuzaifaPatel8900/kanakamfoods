"use client";

import React, { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import { getProducts, toFoodItem } from "@/libs/products";
import type { FoodItem } from "@/types/food";
import {
  getCartSummary,
  getServerCart,
  readCart,
  saveCart,
  subscribeToCart,
} from "@/utils/cart";

const MainContainer = () => {
  const cart = useSyncExternalStore(subscribeToCart, readCart, getServerCart);
  const [products, setProducts] = useState<FoodItem[]>([]);

  useEffect(() => {
    getProducts()
      .then((menuItems) => setProducts(menuItems.map(toFoodItem)))
      .catch((error) => console.error("Unable to load navbar cart total", error));
  }, []);

  const cartSummary = useMemo(
    () => getCartSummary(cart, products),
    [cart, products]
  );

  const handleQuantityChange = (itemId: string, quantity: number) => {
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
        cart={cart}
        onQuantityChange={handleQuantityChange}
      />
    </div>
  );
};

export default MainContainer;
