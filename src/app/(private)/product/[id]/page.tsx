"use client";
import { Header } from "@/app/components/header";
import { ImageGalery } from "@/app/components/imageGalery";
import { useProductById } from "@/app/utils/useProductById";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { FaMedal } from "react-icons/fa6";

export default function ProductPage() {
  const { id } = useParams() as { id: string };

  const { product, loading, error } = useProductById(id);
  useEffect(() => {
    console.log("renderizzou");
  }, []);

  return (
    <div className="flex flex-col  items-center min-h-screen h-screen max-h-screen w-full max-w-screen px-6 pt-2 pb-30 bg-fk-background/90 bosrder ">
      <Header showBackButton />
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {product && (
        <section className="w-full flex flex-col mt-2">
          <div className="w-full flex justify-center">
            <ImageGalery product={product} />
          </div>
          <div className="flex justify-between items-center mb-4  max-w-full overflow-y-auto">
            <h2 className="text-fk-primary text-2xl font-bold text-ellipsis overflow-hidden whitespace-nowrap max-w-[80%] flex">
              {product.bestbefore && (
                <span className="text-green-700">
                  <FaMedal />
                </span>
              )}
              {product.nome}
            </h2>
            <h2 className="text-green-700 text-2xl font-bold">
              {product.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h2>
          </div>
          {!product.seller.name && (
            <h2 className="text-red-700 text-2xl font-bold text-center">
              Poduto Indisponível
            </h2>
          )}
        </section>
      )}
    </div>
  );
}
