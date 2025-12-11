"use client";

import { deleteImage } from "@/app/utils/imageStorageService";
import { removeProduct } from "@/sevices/ProductServices";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";

import { toastMissing } from "@/app/utils/toasthelper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type myProductProps = {
  name: string;
  imageUrl: string[];
  price: number;
  quantity: number;
  productId: string;
  userId: string;
};
export function MyProductItem({
  imageUrl,
  price,
  name,
  quantity,
  productId,
  userId,
}: myProductProps) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (id: string) => removeProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProducts", userId] });
    },
  });

  function deleteProduct(id: string) {
    const confirmed = window.confirm("Deseja realmente excluir este produto?");

    if (!confirmed) return;
    deleteImage(imageUrl);
    mutation.mutate(id);
    toastMissing("Produto excluído com sucesso!");
  }

  function handleEditProduct(id: string) {
    router.push(`/editProduct/${id}`);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    }

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);
  return (
    <div
      className={`text-gray-500 flex w-full justify-between items-center p-2 border rounded-lg bg-gray-300 border-fk-primary relative overflow-hidden ${
        mutation.isPending ? "filter grayscale" : ""
      }`}
    >
      <div className="flex w-5/6">
        <div className="w-[52px] h-[52px] relative mr-2 rounded-md">
          <Image
            alt="uma foto do produto"
            fill
            src={imageUrl[0]}
            className="rounded-md"
          />
        </div>
        <div className="w-full">
          <p className="text-xl font-bold">{name}</p>
          <p className="text-xl">
            <span className="text-fk-green-hover font-bold">{`R$ ${price.toFixed(
              2
            )} `}</span>
            <span className="text-sm">{`estoque: ${quantity} `} </span>
          </p>
        </div>
      </div>

      <div
        ref={optionsRef}
        className={`absolute right-12 bg-gray-400 rounded-l-md shadow-lg z-10 w-3/6  flex  transition-all duration-300 origin-top-right border-l-2 border-l-fk-green h-full ${
          showOptions
            ? "blockopacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-40 pointer-events-none"
        }`}
      >
        <button
          className="flex flex-col w-full h-full justify-center items-center gap-2 text-fk-primary font-bold"
          onClick={() => handleEditProduct(productId)}
        >
          <FaEdit />
          Editar
        </button>
        <button
          className="flex flex-col w-full h-full justify-center items-center gap-2
         text-fk-error-text font-bold"
          onClick={() => deleteProduct(productId)}
        >
          <FaTrash />
          Excluir
        </button>
      </div>

      <button onClick={() => setShowOptions(!showOptions)}>
        <PiDotsThreeOutlineVerticalLight className="w-9 h-9 text-fk-primary" />
      </button>
    </div>
  );
}
