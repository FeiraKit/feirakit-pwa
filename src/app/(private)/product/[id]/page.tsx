"use client";
import { Header } from "@/app/components/header";
import { ImageGalery } from "@/app/components/imageGalery";
import { useProductById } from "@/app/utils/useProductById";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLocationDot, FaMedal } from "react-icons/fa6";

export default function ProductPage() {
  const { id } = useParams() as { id: string };

  const { product, loading, error } = useProductById(id);

  const [showHeader, setShowHeader] = useState(true);
  const [bgHeader, setBgHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setBgHeader(true);
      }
      if (currentScrollY < 150) {
        setBgHeader(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (!product || !product.seller.name) {
    return (
      <h2 className="text-red-700 text-2xl font-bold text-center">
        Produto Indisponível
      </h2>
    );
  }

  return (
    <div className="flex flex-col relative items-center min-h-screen  w-full max-w-screen px-6 pt-2 pb-30 bg-fk-background/90 ">
      <div
        className={`w-full fixed top-0 z-10 transition-all duration-300 px-6 ${
          showHeader ? "translate-y-0 " : "-translate-y-full"
        }
        ${
          bgHeader
            ? "bg-fk-background/90 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }
        `}
      >
        <Header showBackButton />
      </div>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {product && (
        <>
          <section className="w-full flex flex-col mt-16 ">
            <div className="w-full flex justify-center">
              <ImageGalery product={product} />
            </div>
            <div className="flex justify-between items-center mb-2  max-w-full overflow-y-auto">
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

            <div className="flex items-center gap-2">
              <FaLocationDot className="inline text-fk-primary mb-1 text-2xl" />
              <div className="flex flex-col text-sm">
                <span className="text-fk-primary">
                  {product.seller.endereco.cidade} -{" "}
                  {product.seller.endereco.estado}
                </span>
                <span className="text-gray-700">
                  {product.seller.endereco.bairro} -{" "}
                  {product.seller.endereco.rua}
                </span>
              </div>
            </div>
          </section>
          <section className="w-full flex flex-col mt-4 mb-10 text-black font-normal">
            <div className="flex text-md justify-between">
              <p className="text-md">
                categoria:{" "}
                <span className="text-green-700">{product.categoria}</span>
              </p>
              <p>{product.validade}</p>
            </div>
            {product.bestbefore && (
              <p className="text-green-600">Colhido após a compra</p>
            )}
            <p>{product.descricao}</p>
          </section>
        </>
      )}
    </div>
  );
}
