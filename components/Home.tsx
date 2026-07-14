import React from "react";
import FoodCard from "./FoodCard";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "./Footer";
import type { FoodItem } from "@/types/food";

interface HomeProps {
  foodData: FoodItem[];
  cart: Record<number, number>;
  onQuantityChange: (itemId: number, quantity: number) => void;
}

const Home = ({ foodData, cart, onQuantityChange }: HomeProps) => {
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
          <div className="hover:bg-[#F1941B] cursor-pointer hover:p-3 hover:rounded-xl hover:text-white p-3">
            Biryani
          </div>
          <div className="hover:bg-[#F1941B] cursor-pointer hover:p-3 hover:rounded-xl hover:text-white p-3">
            Rice Varieties
          </div>
          <div className="hover:bg-[#F1941B] cursor-pointer hover:p-3 hover:rounded-xl hover:text-white p-3">
            Curries
          </div>
          <div className="hover:bg-[#F1941B] cursor-pointer hover:p-3 hover:rounded-xl hover:text-white p-3">
            Veg Specials
          </div>
          <div className="hover:bg-[#F1941B] cursor-pointer hover:p-3 hover:rounded-xl hover:text-white p-3">
            Non-Veg Specials
          </div>
          <div className="hover:bg-[#F1941B] cursor-pointer hover:p-3 hover:rounded-xl hover:text-white p-3">
            Sweets & Desserts
          </div>
          <div className="hover:bg-[#F1941B] cursor-pointer hover:p-3 hover:rounded-xl hover:text-white p-3">
            Chutneys
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-10 bg-white rounded-2xl shadow-md p-6">
        {foodData.map((item) => (
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
