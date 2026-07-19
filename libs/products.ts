import axios from "axios";
import { ACCESS_KEY, ENDPOINT, MASTER_KEY, productBinId } from "@/libs/endpoint";
import type { FoodItem, IProduct } from "@/types/food";

export const toFoodItem = (product: IProduct): FoodItem => ({
  id: product.id,
  name: product.name,
  image: product.image,
  description: product.description,
  price: `${product.currency ?? ""}${product.price}`,
});

export const getProducts = async (): Promise<IProduct[]> => {
  const response = await axios.get(`${ENDPOINT}/b/${productBinId}`, {
    headers: {
      "X-Master-Key": MASTER_KEY,
      "X-Access-Key": ACCESS_KEY,
    },
  });

  return Array.isArray(response.data?.record) ? response.data.record : [];
};
