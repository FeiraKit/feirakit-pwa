"use client";

import { Header } from "@/app/components/header";
import { EmptyList } from "./components/emptyList";

import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { ProductType } from "../(home)/components/productItem";

import { MyProductItem } from "./components/myProductItem";
import { AddNewProduct } from "./components/AddNewProduct";

const userId = useAuthStore.getState().usuario?.id;

async function getMyProducts(): Promise<ProductType[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/filters?id=${userId}`
    );

    if (!res.ok) {
      throw new Error(`Erro HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error; // React Query vai capturar isso e colocar em `error`
  }
}

export default function MyProducts() {
  const { data, error, isFetching } = useQuery({
    queryKey: ["myProducts"],
    queryFn: getMyProducts,
    retry: 1,
  });

  return (
    <div className="flex flex-col  items-center min-h-dvh h-dvh max-h-dvh w-screen max-w-screen px-6 pt-2 pb-1 bg-fk-background/90">
      <Header showBackButton showMenuButton />
      <div className="w-full h-full pt-2 flex flex-col gap-2 items-start">
        <h2 className="text-xl text-gray-600/70 font-bold">Meus Produtos</h2>
        <AddNewProduct />

        {error && (
          <EmptyList message="Houve um erro ao buscar por seus produtos" />
        )}

        {data?.length == 0 ? (
          <EmptyList />
        ) : (
          data?.map((product) => (
            <MyProductItem
              imageUrl={product.imagem_url}
              name={product.nome}
              price={product.preco}
              quantity={product.estoque}
              key={product.id}
              productId={product.id}
            />
          ))
        )}
      </div>
    </div>
  );
}
