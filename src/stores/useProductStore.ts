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
  products: Productdetails[] | [];
  setProducts: (products: Productdetails[] | []) => void;
};

export const useProductStore = create<productState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
