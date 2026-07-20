"use client";

import { useState } from "react";
import type { FoodItem } from "@/types/food";

interface FoodCardProps {
  item: FoodItem;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function FoodCard({
  item,
  quantity,
  onQuantityChange,
}: FoodCardProps) {
  const [selectedSpicy, setSelectedSpicy] = useState("Less Spicy");

  const spicyLevels = [
    "Less Spicy",
    "Medium Spicy",
    "More Spicy",
  ];

  return (
    <div className="flex flex-col items-stretch gap-4 border-b py-5 sm:flex-row sm:items-start sm:justify-between">
      {/* Left */}
      <div className="flex gap-4 flex-1 text-black">
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-20 rounded-xl object-cover"
        />

        <div className="flex-1">
          {item.offer && (
            <span className="rounded bg-orange-500 px-2 py-1 text-xs text-white">
              {item.offer}
            </span>
          )}

          <h2 className="mt-2 text-xl font-bold">{item.name}</h2>

          <p className="mt-1 text-gray-500">{item.description}</p>

          {/* Show spicy options only after item is added */}
          {quantity > 0 && (
            <div className="mt-4  flex flex-wrap gap-3">
              {spicyLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedSpicy(level)}
                  className={`rounded-full border px-4 py-1 text-xs transition
                  ${
                    selectedSpicy === level
                      ? level === "Less Spicy"
                        ? "border-green-500 bg-green-100 text-green-700"
                        : level === "Medium Spicy"
                        ? "border-yellow-500 bg-yellow-100 text-yellow-700"
                        : "border-red-500 bg-red-100 text-red-700"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-end">
        <div className="text-right">
          {item.oldPrice && (
            <span className="mr-2 text-gray-400 line-through">
              {item.oldPrice}
            </span>
          )}

          <span className="text-2xl text-black font-bold">
            {item.price}
          </span>
        </div>

        {/* Button Logic */}
        {quantity > 0 ? (
          <div className="flex items-center rounded-2xl bg-orange-500 text-white gap-2 sm:gap-3">
            <button
              onClick={() => onQuantityChange(quantity - 1)}
              className="h-9 w-9 rounded-lg bg-orange-500 text-xl"
            >
              -
            </button>

            <span className="whitespace-nowrap font-semibold text-sm sm:text-base">
              {quantity} Item{quantity > 1 && "s"} Added
            </span>

            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="h-9 w-9 rounded-lg bg-orange-500 text-white text-xl"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => onQuantityChange(1)}
            className="h-10 w-10 rounded-lg bg-gray-100 text-orange-500 text-xl hover:bg-orange-500 hover:text-white"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}
