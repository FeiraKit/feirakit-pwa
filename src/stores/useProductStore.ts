import { ProductType } from "@/app/(private)/(home)/components/productItem";
import { create } from "zustand";

export type Productdetails = ProductType & {
  seller: {
    name: string;
    email: string;
    telefone: string;
    endereco: {
      rua: string;
      numero: string;
      bairro: string;
      cep: string;
      complemento: string;
      cidade: string;
      estado: string;
    };
  };
};

type productState = {
  products: Productdetails[];
  setProducts: (products: Productdetails[]) => void;
  updateProduct: (id: string, updates: Partial<Productdetails>) => void;
  removeProduct: (id: string) => void;
  addProduct: (product: Productdetails) => void;
};

export const useProductStore = create<productState>((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
}));
