"use client";

import { Header } from "@/app/components/header";
import { EmptyList } from "./components/emptyList";

import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";

import { MyProductItem } from "./components/myProductItem";
import { AddNewProduct } from "./components/AddNewProduct";
import { Skeleton } from "@/app/components/loadings/skeleton";
import { getMyProducts } from "@/sevices/utils/myProductsFetcher";

const userId = useAuthStore.getState().usuario?.id;

export default function MyProducts() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["myProducts", userId],
    queryFn: () => getMyProducts(userId || ""),
    retry: 1,
  });

  return (
    <div className="flex flex-col  items-center min-h-dvh h-dvh max-h-dvh w-screen max-w-screen px-6 pt-2 pb-1 bg-fk-background/90">
      <Header showBackButton showMenuButton />
      <div className="w-full h-full pt-2 flex flex-col gap-2 items-start">
        <h2 className="text-xl text-gray-600/70 font-bold">Meus Produtos</h2>
        <AddNewProduct />
        {isLoading && (
          <>
            <Skeleton className="w-full h-22 rounded-md" duration="3.4s" />{" "}
            <Skeleton className="w-full h-22 rounded-md" duration="2.2s" />{" "}
            <Skeleton className="w-full h-22 rounded-md" duration="3.2s" />
          </>
        )}

        {error && (
          <EmptyList message="Houve um erro ao buscar por seus produtos" />
        )}

        {data?.length == 0 ? (
          <EmptyList />
        ) : (
          data?.map((product) => (
            <MyProductItem
              userId={product.produtor_id}
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
