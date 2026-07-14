"use client";

import React, { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import type { FoodItem } from "@/types/food";

const foodData: FoodItem[] = [
  {
    id: 1,
    name: "Chicken Dum Biryani",
    image: "/img/food.svg",
    description:
      "Slow-cooked basmati rice, tender chicken, aromatic spices, traditional dum style.",
    price: "\u00A39.99",
    oldPrice: "\u00A310.98",
    offer: "50% OFF",
    quantity: 0,
  },
  {
    id: 2,
    name: "Mutton Biryani",
    image: "/img/mutton.svg",
    description: "Juicy mutton pieces, long-grain basmati rice, rich spices.",
    price: "\u00A312.99",
  },
  {
    id: 3,
    name: "Veg Biryani",
    image: "/img/food.svg",
    description: "Fresh vegetables, fragrant basmati rice, balanced spices.",
    price: "\u00A38.49",
  },
  {
    id: 4,
    name: "Hyderabadi Mutton Biryani",
    image: "/img/mutton.svg",
    description: "Traditional Hyderabadi recipe, tender mutton, rich masala.",
    price: "\u00A313.99",
  },
  {
    id: 5,
    name: "Fish Biryani",
    image: "/img/mutton.svg",
    description:
      "Fresh fish pieces, light spices, aromatic rice, delicately cooked.",
    price: "\u00A311.99",
  },
];

const getPriceValue = (price: string) => Number(price.replace(/[^\d.]/g, ""));

const MainContainer = () => {
  const [cart, setCart] = useState<Record<number, number>>({});

  const cartSummary = useMemo(() => {
    return foodData.reduce(
      (summary, item) => {
        const quantity = cart[item.id] ?? item.quantity ?? 0;

        return {
          itemCount: summary.itemCount + quantity,
          total: summary.total + getPriceValue(item.price) * quantity,
        };
      },
      { itemCount: 0, total: 0 }
    );
  }, [cart]);

  const handleQuantityChange = (itemId: number, quantity: number) => {
    setCart((currentCart) => {
      const nextCart = { ...currentCart };

      if (quantity <= 0) {
        delete nextCart[itemId];
      } else {
        nextCart[itemId] = quantity;
      }

      return nextCart;
    });
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
