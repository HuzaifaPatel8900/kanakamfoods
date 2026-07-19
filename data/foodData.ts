import type { FoodItem } from "@/types/food";

export const foodData: FoodItem[] = [
  {
    id: "1",
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
    id: "2",
    name: "Mutton Biryani",
    image: "/img/mutton.svg",
    description: "Juicy mutton pieces, long-grain basmati rice, rich spices.",
    price: "\u00A312.99",
  },
  {
    id: "3",
    name: "Veg Biryani",
    image: "/img/food.svg",
    description: "Fresh vegetables, fragrant basmati rice, balanced spices.",
    price: "\u00A38.49",
  },
  {
    id: "4",
    name: "Hyderabadi Mutton Biryani",
    image: "/img/mutton.svg",
    description: "Traditional Hyderabadi recipe, tender mutton, rich masala.",
    price: "\u00A313.99",
  },
  {
    id: "5",
    name: "Fish Biryani",
    image: "/img/mutton.svg",
    description:
      "Fresh fish pieces, light spices, aromatic rice, delicately cooked.",
    price: "\u00A311.99",
  },
];
