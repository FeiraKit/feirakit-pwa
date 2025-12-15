"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductType } from "../(private)/(home)/components/productItem";
type ImageGaleryProps = {
  product: ProductType | null;
};

export function ImageGalery({ product }: ImageGaleryProps) {
  const productImages = product?.imagem_url || [];
  const [thumb, setThumb] = useState<string>(productImages[0]);

  return (
    <div className="w-full max-w-full mb-4">
      <div className="w-full flex justify-center mb-2 h-44 max-h-44 lg:h-72 lg:max-h-72">
        <Image
          alt="imagem do produto"
          src={thumb}
          width={700}
          height={400}
          className="object-contain rounded-md "
        />
      </div>
      <div className="flex rounded-lg overflow-x-auto space-x-4 p-2 justify-center">
        {productImages.map((imageUrl: string, index: number) => (
          <div
            key={index}
            onClick={() => setThumb(imageUrl)}
            className={`cursor-pointer h-10 w-10 rounded-md ${
              thumb === imageUrl ? "ring-4 ring-fk-primary " : ""
            }`}
          >
            <Image
              alt="imagem do produto"
              src={imageUrl}
              width={40}
              height={40}
              className="h-10 w-10 object-cover rounded-md mr-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
