"use client";

import React, { useCallback, useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "./Footer";
import type { ICategory, IProduct } from "@/types/food";
import axios from "axios";
import {
  ACCESS_KEY,
  categoryBinId,
  ENDPOINT,
  MASTER_KEY,
} from "@/libs/endpoint";
import { getProducts, toFoodItem } from "@/libs/products";

interface HomeProps {
  cart: Record<string, number>;
  onQuantityChange: (itemId: string, quantity: number) => void;
}

const Home = ({ cart, onQuantityChange }: HomeProps) => {
  const [categories, setCategories] = useState<ICategory[]>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState<string>();

  const getMenuItems = useCallback(async (categoryId: string) => {
    try {
      setIsLoadingProducts(true);
      setProductsError(undefined);

      const menuItems = await getProducts();
      console.log("Menu ITEMS",menuItems);
      
      setProducts(menuItems.filter((product: IProduct) => product.category_id === categoryId));
    } catch (error) {
      console.error(error);
      setProductsError("Unable to load menu items. Please try again.");
      setProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  const onCategoryClick = useCallback(async (categoryId: string) => {
    await getMenuItems(categoryId);
    setSelectedCategoryId(categoryId);
  }, [getMenuItems]);

  useEffect(() => {
    axios
      .get(`${ENDPOINT}/b/${categoryBinId}`, {
        headers: {
          "X-Master-Key": MASTER_KEY,
          "X-Access-Key": ACCESS_KEY,
        },
      })
      .then((response) => {
        const loadedCategories: ICategory[] = response.data?.record ?? [];
        const startersCategory = loadedCategories.find(
          (category) => category.name.trim().toLowerCase() === "starters"
        );

        setCategories(loadedCategories);

        if (startersCategory) {
          void onCategoryClick(startersCategory.id);
        }
      })
      .catch((error) => console.error(error));
  }, [onCategoryClick]);

  const displayedFoodItems = products.map(toFoodItem);

  const testimonials = [
    {
      id: 1,
      name: "Reema Sharma",
      image: "/img/Image.svg",
      review:
        "Tastes exactly like homemade food. The biryani was flavorful and not oily at all. You can really feel the homemade touch in every bite.",
      rating: 5,
    },
    {
      id: 2,
      name: "Reema Sharma",
      image: "/img/Image.svg",
      review:
        "Tastes exactly like homemade food. The biryani was flavorful and not oily at all. You can really feel the homemade touch in every bite.",
      rating: 5,
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="container mx-auto text-white mt-8 mb-10 bg-[#F1941B] p-14 rounded-3xl flex justify-between ">
        <div className="">
          <div className="flex">
            <div className=" font-semibold text-[18px] bg-[#55240A] mt-5 p-3 px-6 rounded-4xl">
              50% OFF TODAY
            </div>
          </div>
          <div className="text-[40px] font-bold mt-5 font-barlow">
            BIRYANI FEAST OFFER
          </div>
          <div className="text-[18px] font-inter">
            Authentic homemade biryani, slow-cooked with rich spices.
          </div>
          <hr className="text-[#BC6A00] border-3 mt-5" />
          <div className="flex gap-3 mt-6 font-barlow font-semibold">
            <img src="/img/order.svg" alt="" />
            ORDER NOW
          </div>
        </div>
        <div className="flex">
          <img className="max-h-25" src="/img/dis.svg" alt="" />
          <img className="pt-10" src="/img/biryani.svg" alt="" />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex text-[#89919A] bg-white gap-5  justify-center px-4 p-3 rounded-2xl">
          {categories?.map((c) => (
            <div
              key={c.id}
              className={`hover:bg-[#F1941B] cursor-pointer hover:p-3 hover:rounded-xl hover:text-white p-3 ${selectedCategoryId === c.id && "bg-[#F1941B] rounded-xl text-white"}`}
              onClick={() => onCategoryClick(c.id)}
            >
              {c.name}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto mt-10 bg-white rounded-2xl shadow-md p-6">
        {isLoadingProducts && (
          <p className="py-5 text-gray-500">Loading menu items...</p>
        )}

        {productsError && <p className="py-5 text-red-600">{productsError}</p>}

        {!isLoadingProducts && !productsError && selectedCategoryId && displayedFoodItems.length === 0 && (
          <p className="py-5 text-gray-500">No menu items are available in this category.</p>
        )}

        {!isLoadingProducts && !productsError && displayedFoodItems.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            quantity={cart[item.id] ?? item.quantity ?? 0}
            onQuantityChange={(quantity) => onQuantityChange(item.id, quantity)}
          />
        ))}
      </div>

      <section className="container mx-auto mt-20 mb-20">
        <h2 className="text-4xl font-extrabold text-black uppercase mb-10">
          Just Like Home, They Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>

        <hr className="mt-20 border-gray-300" />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
