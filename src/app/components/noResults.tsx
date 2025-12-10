"use client";

import Image from "next/image";

import { FaArrowRotateLeft } from "react-icons/fa6";

export function NoResults() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div
      className="w-full max-w-lg mx-auto flex flex-col items-center text-center p-4"
      onClick={handleRetry}
    >
      <button className="w-full">
        <div className="relative w-full h-72 opacity-90 hover:opacity-100 transition-opacity">
          <Image
            src="/noresults.webp"
            alt="Erro"
            fill
            unoptimized
            className="object-contain cursor-pointer"
          />
        </div>
      </button>

      <p className="mt-4 text-lg font-medium text-gray-700">
        Nenhum resultado encontrado
      </p>

      <p className="text-sm text-gray-500 mt-2">
        <FaArrowRotateLeft />
      </p>
    </div>
  );
}
