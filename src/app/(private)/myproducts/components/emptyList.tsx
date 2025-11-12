"use client";

import { FaArrowRotateLeft, FaCartShopping } from "react-icons/fa6";

type emptyListProps = {
  message?: string;
};

export function EmptyList({ message }: emptyListProps) {
  return (
    <div className="text-gray-500 flex w-full justify-between items-center p-2 border rounded-lg bg-gray-300 ">
      <FaCartShopping className="w-9 h-9 mr-4" />
      <p className="text-xl">
        {message ? message : `Você não tem Produtos cadastrados`}
      </p>
      <button onClick={() => window.location.reload()}>
        <FaArrowRotateLeft className="w-9 h-9" />
      </button>
    </div>
  );
}
