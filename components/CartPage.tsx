"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Navbar from "@/components/Navbar";
import { getProducts, toFoodItem } from "@/libs/products";
import type { FoodItem } from "@/types/food";
import {
  formatCurrency,
  getCartSummary,
  getServerCart,
  getPriceValue,
  readCart,
  saveCart,
  subscribeToCart,
} from "@/utils/cart";

const CartPage = () => {
  const cart = useSyncExternalStore(subscribeToCart, readCart, getServerCart);
  const [products, setProducts] = useState<FoodItem[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    getProducts()
      .then((menuItems) => setProducts(menuItems.map(toFoodItem)))
      .catch((error) => console.error("Unable to load cart products", error))
      .finally(() => setIsLoadingProducts(false));
  }, []);

  const cartSummary = useMemo(() => getCartSummary(cart, products), [cart, products]);

  const cartItems = useMemo(() => {
    return products
      .map((item) => ({
        ...item,
        quantity: cart[item.id] ?? item.quantity ?? 0,
      }))
      .filter((item) => item.quantity > 0);
  }, [cart, products]);

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
    <div className="min-h-screen bg-gray-200">
      <Navbar itemCount={cartSummary.itemCount} total={cartSummary.total} />

      <main className="container mx-auto py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-black">Your Cart</h1>
            <p className="mt-2 text-gray-600">
              {cartSummary.itemCount} item{cartSummary.itemCount !== 1 && "s"} selected
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl bg-[#F1941B] px-5 py-3 font-semibold text-white"
          >
            Add More
          </Link>
        </div>

        {isLoadingProducts ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-md text-gray-500">
            Loading your cart...
          </div>
        ) : cartItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              {cartItems.map((item) => {
                const lineTotal = getPriceValue(item.price) * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 border-b py-5 last:border-b-0"
                  >
                    <div className="flex flex-1 gap-4 text-black">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <h2 className="text-xl font-bold">{item.name}</h2>
                        <p className="mt-1 text-gray-500">{item.description}</p>
                        <button
                          onClick={() => handleQuantityChange(item.id, 0)}
                          className="mt-3 text-sm font-semibold text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{item.price} each</div>
                        <div className="text-2xl font-bold text-black">
                          {formatCurrency(lineTotal)}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 rounded-2xl bg-orange-500 text-white">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="h-9 w-9 rounded-lg bg-orange-500 text-xl"
                        >
                          -
                        </button>

                        <span className="min-w-20 text-center font-semibold">
                          {item.quantity} Item{item.quantity > 1 && "s"}
                        </span>

                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="h-9 w-9 rounded-lg bg-orange-500 text-xl"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <aside className="h-fit bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-black">Order Summary</h2>

              <div className="mt-6 space-y-4 text-gray-700">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{cartSummary.itemCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cartSummary.total)}</span>
                </div>
              </div>

              <hr className="my-5" />

              <div className="flex justify-between text-xl font-extrabold text-black">
                <span>Total</span>
                <span>{formatCurrency(cartSummary.total)}</span>
              </div>
            </aside>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center shadow-md">
            <h2 className="text-2xl font-bold text-black">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">
              Add your favorite biryani items from the menu.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-[#F1941B] px-5 py-3 font-semibold text-white"
            >
              Go To Menu
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
