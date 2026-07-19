export type FoodItem = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  oldPrice?: string;
  offer?: string;
  quantity?: number;
};




export interface ICategory {
  id: string;
  name: string;
  image: string;
}

export interface IProduct {
  id: string;
  category_id: string;
  currency: string
  description: string;
  image: string;
  isVeg: boolean;
  name: string;
  preparationTime: string;
  price: number;
  rating: string;
}

