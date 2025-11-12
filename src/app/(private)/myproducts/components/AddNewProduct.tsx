"use client";

import Link from "next/link";

import { FaPlus } from "react-icons/fa";

export function AddNewProduct() {
  return (
    <Link
      href="/createproduct"
      className="text-fk-primary flex w-full justify-center gap-4 items-center p-2 border-2 rounded-lg bg-gray-200 border-fk-primary h-10 hover:bg-fk-green/10 active:bg-fk-green/10 mb-2"
    >
      <FaPlus />
      <p className="text-lg">Adicionar Novo Produto</p>
    </Link>
  );
}
