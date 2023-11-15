import { Products } from "@/types/product";
import { create } from "zustand";

interface ProductsStore {
  products: Products[];
  setProducts: (value: Products[]) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  setProducts: (value: Products[]) =>
    set((state) => ({
      ...state,
      products: value,
    })),
}));
