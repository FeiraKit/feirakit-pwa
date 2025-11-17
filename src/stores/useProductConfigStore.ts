import { create } from "zustand";

export type ProductUnites = {
  medidas: string[];
  categorias: string[];
};

type productState = {
  measures: string[] | [];
  categories: string[] | [];
  loaded: boolean;
  setConfigs: (unities: ProductUnites) => void;
};

export const useProductConfigStore = create<productState>((set) => ({
  measures: [],
  categories: [],
  loaded: false,
  setConfigs: (unities) =>
    set({
      measures: unities.medidas,
      categories: unities.categorias,
      loaded: true,
    }),
}));
