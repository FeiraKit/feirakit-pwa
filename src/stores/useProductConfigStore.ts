import { create } from "zustand";

export type ProductUnites = {
  medidas: string[];
  categorias: string[];
  cidades: string[];
};

type productState = {
  measures: string[] | [];
  categories: string[] | [];
  availableCities: string[] | [];
  loaded: boolean;
  setConfigs: (unities: ProductUnites) => void;
};

export const useProductConfigStore = create<productState>((set) => ({
  measures: [],
  categories: [],
  availableCities: [],
  loaded: false,
  setConfigs: (unities) =>
    set({
      measures: unities.medidas,
      categories: unities.categorias,
      availableCities: unities.cidades || [],
      loaded: true,
    }),
}));
