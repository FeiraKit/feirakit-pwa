"use client";

import {
  ProductUnites,
  useProductConfigStore,
} from "@/stores/useProductConfigStore";
import { useEffect, useState } from "react";

export function useProductConfig() {
  const setZustandConfigs = useProductConfigStore((state) => state.setConfigs);
  const zustandMeasures = useProductConfigStore((state) => state.measures);
  const zustandCategories = useProductConfigStore((state) => state.categories);
  const zustandCities = useProductConfigStore((state) => state.availableCities);
  const isConfigsLoaded = useProductConfigStore((state) => state.loaded);

  const [configs, setConfigs] = useState<ProductUnites | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isConfigsLoaded) {
      const zustandConfigs = {
        medidas: zustandMeasures,
        categorias: zustandCategories,
        cidades: zustandCities,
      };
      setLoading(false);
      setConfigs(zustandConfigs);
      return;
    }

    const fetchConfigs = async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort("timeout"), 30000);
      try {
        setLoading(true);
        setError(null);

        const [unitsRes, citiesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/units`, {
            signal: controller.signal,
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/get_cities`, {
            signal: controller.signal,
          }),
        ]);

        if (!unitsRes.ok || !citiesRes.ok) {
          throw new Error(`Erro ao carregar configurações`);
        }

        const unitsData = await unitsRes.json();
        const citiesData = await citiesRes.json();
        const availableCities = citiesData.resultado.map(
          (item: { nome: string }) => item.nome
        );

        const configObject: ProductUnites = {
          medidas: unitsData[0].unidades,
          categorias: unitsData[0].categorias,
          cidades: availableCities,
        };

        setConfigs(configObject);
        setZustandConfigs(configObject);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError("Erro ao carregar configurações");
      } finally {
        clearTimeout(timeout);
        setLoading(false);
      }
    };
    fetchConfigs();
  }, [
    isConfigsLoaded,
    setZustandConfigs,
    zustandCategories,
    zustandCities,
    zustandMeasures,
  ]);

  return { configs, loading, error };
}
