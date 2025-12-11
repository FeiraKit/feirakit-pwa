"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Spin } from "./skeleton";

export function SavingProduct() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center p-4 self-center">
      <button className="w-full">
        <div className="relative w-full h-72 opacity-90 hover:opacity-100 transition-opacity">
          {isOnline ? (
            <Image
              src="/saving.webp"
              alt="Erro"
              fill
              unoptimized
              className="object-contain cursor-pointer"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/saving.webp"
              alt="Erro offline"
              className="w-full h-full object-contain cursor-pointer"
            />
          )}
        </div>
      </button>

      <p className="mt-4 text-lg font-medium text-gray-700">Salvando Produto</p>

      <p className="text-sm text-gray-500 mt-2">
        <Spin className="w-6 h-6" custonBorder="border-fk-primary" />
      </p>
    </div>
  );
}
