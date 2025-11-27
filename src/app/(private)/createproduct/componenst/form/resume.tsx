"use client";

import Image from "next/image";

import { useFormContext } from "react-hook-form";
import { addProductFormData } from "../../page";

export function Resume() {
  const { getValues } = useFormContext<addProductFormData>();

  const product = getValues();

  return (
    <div className="flex flex-1 flex-col overflow-hidden ">
      <h1 className=" text-xl text-black/90">
        Confira se as informações estão corretas antes de finalizar.
      </h1>
      <section className="flex flex-1 flex-col overflow-y-scroll bg-gray-300">
        <div className="w-full border border-fk-primary/90  max-h-2/6 rounded-lg mb-2 flex gap-2 flex-col p-1 rounded-b-none border-b-0 ">
          <div className="flex justify-between items-center mb-2"></div>
          <div className="w-full flex gap-1 px-2">
            {product.imagem_url.map((imageSrc: string, index: number) => (
              <div
                className="w-16 aspect-square relative border 
           transition-opacity duration-20"
                key={index}
              >
                <Image
                  src={imageSrc}
                  alt={`Imagem do produto ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full border border-fk-primary/90   rounded-lg mb-2 flex gap-2 flex-col p-1 rounded-t-none border-t-0 ">
          {product.bestbefore && (
            <p className="text-fk-primary/90 text-center">
              {`${product.validade
                .split("-")
                .reverse()
                .join("/")} - Produto sob encomenda`}{" "}
            </p>
          )}
          <div className="flex w-full p-1">
            <div className="flex-1 ">
              <p className="text-fk-primary">Título:</p>
              <p className="font-bold text-md  line-2">{product.nome}</p>
              <p className="text-fk-primary">Categoria:</p>
              <p className="font-bold">{product.categoria}</p>
            </div>
            <div className="flex-1">
              <p className="text-fk-primary">Preço:</p>
              <p className="font-bold   line-2">
                {product.preco.toLocaleString("pt-BR", {
                  currency: "BRL",
                  style: "currency",
                })}
              </p>
              <p className="text-fk-primary">Unidade:</p>
              <p className="font-bold">{product.unidade}</p>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-fk-primary">Disponível para:</p>
            {product.cidades.join(", ")}
          </div>
          <div className="flex-1">
            <p className="text-fk-primary">Descrição:</p>
            <p className="font-bold  line-3 p-1  break-all">
              {product.descricao}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
