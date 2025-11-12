"use client";

import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";

type myProductProps = {
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  productId: string;
};
export function MyProductItem({
  imageUrl,
  price,
  name,
  quantity,
  productId,
}: myProductProps) {
  return (
    <div className="text-gray-500 flex w-full justify-between items-center p-2 border rounded-lg bg-gray-300 border-fk-primary">
      <div className="w-[52px] h-[52px] relative mr-2 rounded-md">
        <Image
          alt="uma foto do produto"
          fill
          src={imageUrl}
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
      <button>
        <FaChevronRight className="w-9 h-9" />
      </button>
    </div>
  );
}
