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

  const isConfigsLoaded = useProductConfigStore((state) => state.loaded);

  const [configs, setConfigs] = useState<ProductUnites | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isConfigsLoaded) {
      const zustandConfigs = {
        medidas: zustandMeasures,
        categorias: zustandCategories,
      };

      setConfigs(zustandConfigs);
      return;
    }

    const fetchConfigs = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/units`
        );

        if (!res.ok) {
          throw new Error(`Houve um erro ao carregar o formulário`);
        }

        const data = await res.json();

        setConfigs(data[0]);

        const configObject: ProductUnites = {
          medidas: data[0].unidades,
          categorias: data[0].categorias,
        };
        setZustandConfigs(configObject);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        setError("Erro ao carregar produto");
      } finally {
        setLoading(false);
      }
    };
    fetchConfigs();
  }, [isConfigsLoaded, setZustandConfigs, zustandCategories, zustandMeasures]);

  return { configs, loading, error };
}
