"use client";

import { useFormContext } from "react-hook-form";
import { addProductFormData } from "@/types/forms/addProductFormData";
import { useState } from "react";
import { FcAddImage } from "react-icons/fc";
import Image from "next/image";
import { toastImagesLimit } from "@/app/utils/toasthelper";
import { FaX } from "react-icons/fa6";

export function Step4() {
  const keepImagesLimit = 6;
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<addProductFormData>();

  const [images, setImages] = useState<string[]>(
    getValues("imagem_url") ? getValues("imagem_url") : []
  );
  const [removing, setRemoving] = useState<string | null>(null);

  const handleAddImages = (imputImages: FileList) => {
    const imputImagesArray = Array.from(imputImages);
    const urlList = imputImagesArray.map((file: File) =>
      URL.createObjectURL(file)
    );

    const currentImages = getValues("imagem_url")
      ? getValues("imagem_url")
      : [];

    const combinedImages = [...currentImages, ...urlList];
    const newImages = combinedImages.slice(0, keepImagesLimit);

    if (combinedImages.length > keepImagesLimit) {
      toastImagesLimit(
        `Máximo de ${keepImagesLimit} imagens. Mantidas apenas as últimas.`
      );
    }
    setImages(newImages);

    setValue("imagem_url", newImages, { shouldValidate: true });
  };

  const handleRemoveImage = (imageUrl: string) => {
    setRemoving(imageUrl);

    setTimeout(() => {
      const filteredImages = images.filter((img) => img !== imageUrl);
      setImages(filteredImages);
      setValue("imagem_url", filteredImages, { shouldValidate: true });
      URL.revokeObjectURL(imageUrl);
      setRemoving(null);
    }, 200);
  };
  const canAddMore = images.length < keepImagesLimit;

  return (
    <div className="flex flex-1 flex-col ">
      <h1 className=" text-xl text-black/90">Adicione fotos do seu produto:</h1>
      <section className="flex flex-1 flex-col ">
        <label
          className="text-gray-600 self-center flex justify-items-center items-center   border-2 border-dashed border-fk-primary h-20 w-20 rounded-md cursor-pointer  p-2 m-2"
          htmlFor="image-upload"
        >
          <FcAddImage
            className={`w-16 h-16 ${
              images.length >= keepImagesLimit ? "filter grayscale" : ""
            }`}
          />
        </label>

        <input
          type="file"
          id="image-upload"
          accept="image/*"
          multiple
          disabled={!canAddMore}
          onChange={(e) => handleAddImages(e.target.files!)}
          className="sr-only"
        />
        {errors.imagem_url && (
          <span className="text-xs text-fk-error-text">
            {errors.imagem_url.message as string}
          </span>
        )}
        <div className="w-full flex flex-wrap  overflow-y-auto  border border-fk-primary/30 rounded-md  justify-center items-center gap-4 py-4">
          {images.map((imageSrc, index) => (
            <div
              className={`
    w-24 aspect-square relative border 
    transition-opacity duration-200
    ${removing === imageSrc ? "opacity-0" : "opacity-100"}
  `}
              key={index}
            >
              <Image
                src={imageSrc}
                alt={`Imagem do produto ${index + 1}`}
                fill
                className="object-cover transition-all duration-3000 hover:scale-105"
                onClick={() => handleRemoveImage(imageSrc)}
              />
              <span className="bg-red-500 font-bold text-white absolute  rounded-full w-6 h-6 flex justify-center items-center -bottom-2 -right-2 cursor-pointer leading-none">
                <FaX className="w-3 h-3" />
              </span>
            </div>
          ))}
        </div>
        <p className="text-sm text-fk-primary text-center mb-2">
          Você pode escolher até {keepImagesLimit} imagens por produto{" "}
        </p>
      </section>
    </div>
  );
}
