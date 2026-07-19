import { foodData } from "@/data/foodData";

export const cartStorageKey = "kanakam-cart";

export type Cart = Record<string, number>;

const cartChangeEvent = "kanakam-cart-change";
const emptyCart: Cart = {};
let lastSerializedCart: string | null = null;
let lastCartSnapshot: Cart = emptyCart;

export const getPriceValue = (price: string) => Number(price.replace(/[^\d.]/g, ""));

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(amount);

export const getCartSummary = (cart: Cart, items = foodData) => {
  const total = items.reduce(
    (summary, item) => {
      const quantity = cart[item.id] ?? item.quantity ?? 0;

      return summary + getPriceValue(item.price) * quantity;
    },
    0
  );

  return {
    itemCount: Object.values(cart).reduce((count, quantity) => count + quantity, 0),
    total,
  };
};

export const readCart = (): Cart => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const storedCart = window.localStorage.getItem(cartStorageKey);

    if (!storedCart) {
      lastSerializedCart = null;
      lastCartSnapshot = emptyCart;
      return emptyCart;
    }

    if (storedCart === lastSerializedCart) {
      return lastCartSnapshot;
    }

    lastSerializedCart = storedCart;
    lastCartSnapshot = JSON.parse(storedCart);
    return lastCartSnapshot;
  } catch {
    return emptyCart;
  }
};

export const saveCart = (cart: Cart) => {
  const serializedCart = JSON.stringify(cart);
  lastSerializedCart = serializedCart;
  lastCartSnapshot = cart;
  window.localStorage.setItem(cartStorageKey, serializedCart);
  window.dispatchEvent(new Event(cartChangeEvent));
};

export const subscribeToCart = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(cartChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(cartChangeEvent, onStoreChange);
  };
};

export const getServerCart = () => {
  return emptyCart;
};
