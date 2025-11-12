"use client";

import { useEffect, useState } from "react";
import { Productdetails, useProductStore } from "@/stores/useProductStore";

export function useProductById(id: string) {
  const addProduct = useProductStore((state) => state.setProducts);

  const zustandProducts = useProductStore((state) => state.products);

  const [product, setProduct] = useState<Productdetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const existingProduct = zustandProducts.find((prod) => prod.id === id);
    const fetchProduct = async () => {
      if (existingProduct) {
        setProduct(existingProduct);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );

        if (!res.ok) {
          throw new Error(`Erro ao buscar produto: ${res.status}`);
        }

        const data: Productdetails = await res.json();
        setProduct(data);
        addProduct([...zustandProducts, data]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        setError("Erro ao carregar produto");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, addProduct, zustandProducts]);

  return { product, loading, error };
}
