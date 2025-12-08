"use client";

import { Header } from "@/app/components/header";

import { MultipleCitiesSelect } from "@/app/components/multipleCitiesSelect";
import { useProductById } from "@/hooks/useProductById";
import { useParams } from "next/navigation";
import { CurrencyInput } from "../../createproduct/componenst/CurrencyInput";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaPencil, FaX } from "react-icons/fa6";
import { toastAddToCart, toastImagesLimit } from "@/app/utils/toasthelper";
import { Controller, useForm } from "react-hook-form";
import {
  addProductFormData,
  addProductSchema,
} from "@/types/forms/addProductFormData";
import { FcAddImage } from "react-icons/fc";
import { useProductConfig } from "@/hooks/useProductConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteImage, uploadImages } from "@/app/utils/imageStorageService";
import { updateProduct } from "@/sevices/ProductServices";
import { useRouter } from "next/navigation";

export default function EditProductPage() {
  const methods = useForm<addProductFormData>({
    resolver: zodResolver(addProductSchema),
  });
  const {
    formState: { errors },
  } = methods;
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { loading, product } = useProductById(id);
  const { configs, loading: configLoading } = useProductConfig();
  const selectCityWrapper = useRef<HTMLDivElement | null>(null);
  const [showCitiesPicker, setShowcitiespicker] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const categories = configs?.categorias;
  const measures = configs?.medidas;
  const citiesOptions = configs?.cidades || [];

  function handleRemoveImage(imgUrl: string) {
    const newImages = currentImages.filter((url) => url !== imgUrl);
    setImagesToRemove((prev) => [...prev, imgUrl]);
    setCurrentImages(newImages);
    methods.setValue("imagem_url", newImages, { shouldValidate: true });
  }

  async function onSubmit(data: addProductFormData) {
    setIsSavingProduct(true);
    const slug = data.nome
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const uploadedImages: string[] = await uploadImages({
      blobsUrls: data.imagem_url,
      slugProduct: slug,
    });
    data.imagem_url = uploadedImages;
    methods.setValue("imagem_url", uploadedImages);

    await deleteImage(imagesToRemove);

    await updateProduct(data, id);
    setIsSavingProduct(false);
    toastAddToCart("Produto editado com sucesso!");
    router.push("/myproducts");
  }

  useEffect(() => {
    if (!product) return;

    methods.reset({
      nome: product.nome,
      preco: product.preco,
      categoria: product.categoria,
      unidade: product.unidade,
      cidades: product.cidades,
      descricao: product.descricao,
      bestbefore: product.bestbefore,
      estoque: product.estoque,
      imagem_url: product.imagem_url,
      produtor_id: product.produtor_id,
    });
    setCurrentImages(product.imagem_url);
    setSelectedCities(product.cidades);

    const today = new Date().toLocaleDateString("en-CA");
    methods.setValue("validade", today);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        selectCityWrapper.current &&
        !selectCityWrapper.current.contains(event.target as Node)
      ) {
        setShowcitiespicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);
  const keepImagesLimit = 6;

  const canAddMore = currentImages.length < keepImagesLimit;
  const handleAddImages = (imputImages: FileList) => {
    const imputImagesArray = Array.from(imputImages);
    const urlList = imputImagesArray.map((file: File) =>
      URL.createObjectURL(file)
    );

    const currentImages = methods.getValues("imagem_url")
      ? methods.getValues("imagem_url")
      : [];

    const combinedImages = [...currentImages, ...urlList];
    const newImages = combinedImages.slice(0, keepImagesLimit);

    if (combinedImages.length > keepImagesLimit) {
      toastImagesLimit(
        `Máximo de ${keepImagesLimit} imagens. Mantidas apenas as últimas.`
      );
    }
    setCurrentImages(newImages);

    methods.setValue("imagem_url", newImages, { shouldValidate: true });
  };
  return (
    <div className="flex flex-col  items-center min-h-dvh h-dvh max-h-dvh w-screen max-w-screen px-6  bg-fk-background/90 text-black pb-4 ">
      {isSavingProduct && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
          <p className="text-xl font-semibold">Salvando Produto...</p>
        </div>
      )}

      {loading || configLoading ? (
        <p>carregando</p>
      ) : (
        <>
          <Header showBackButton showMenuButton />
          <section className="w-full flex  flex-col flex-1 overflow-y-auto  pt-2  text-black ">
            <p className="self-center text-2xl">{`Atualizar “${product?.nome}”:`}</p>

            <input
              type="text"
              {...methods.register("nome")}
              className="text-2xl font-bold border-b outline-fk-primary/90"
              placeholder="nome do produto"
            />
            {errors.nome && (
              <span className="text-xs text-fk-error-text">
                {errors.nome.message as string}
              </span>
            )}
            <div className="flex w-full items-center my-2 justify-between">
              <div className="flex w-3/6 items-baseline gap-1">
                <label>Preço:</label>
                <Controller
                  name="preco"
                  control={methods.control}
                  render={({ field }) => (
                    <CurrencyInput
                      RHFvalue={field.value}
                      RHFonChange={field.onChange}
                      custonClasses="border-b flex text-xl font-bold text-black/60  focus-within:border-fk-primary/90 "
                    />
                  )}
                />
              </div>
              <div className="flex  w-2/6 items-baseline gap-1">
                <label>Estoque:</label>
                <input
                  type="number"
                  min={0}
                  {...methods.register("estoque", { valueAsNumber: true })}
                  className="w-full border-b focus:border-fk-primary/90 text-black/60 text-xl font-bold outline-none"
                />
              </div>
            </div>
            {errors.preco && (
              <span className="text-xs text-fk-error-text">
                {errors.preco.message as string}
              </span>
            )}
            {errors.estoque && (
              <span className="text-xs text-fk-error-text">
                {errors.estoque.message as string}
              </span>
            )}
            <div className="border border-fk-primary/30 rounded-md">
              <div className="w-full flex flex-wrap      justify-center items-center gap-4 py-4">
                {currentImages.map((imageSrc, index) => (
                  <div
                    className={`w-18 aspect-square relative border transition-opacity duration-200}`}
                    key={index}
                    onClick={() => handleRemoveImage(imageSrc)}
                  >
                    <Image
                      src={imageSrc}
                      alt={`Imagem do produto ${index + 1}`}
                      fill
                      className="object-cover transition-all duration-3000 hover:scale-105"
                    />
                    <span className="bg-red-500 font-bold text-white absolute  rounded-full w-6 h-6 flex justify-center items-center -bottom-2 -right-2 cursor-pointer leading-none">
                      <FaX className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>

              <label
                className={`flex justify-center font-bold gap-2 ${
                  canAddMore ? "text-fk-primary " : "text-gray-500"
                }`}
                htmlFor="image-upload"
              >
                <p className="text-xl">Adicionar Imagens</p>

                <FcAddImage
                  size={32}
                  className={` ${!canAddMore ? "filter grayscale" : ""}`}
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
            </div>
            {errors.imagem_url && (
              <span className="text-xs text-fk-error-text">
                {errors.imagem_url.message as string}
              </span>
            )}

            <div className="flex gap-2 w-full mt-2">
              <select
                id="category"
                className="border-2 border-fk-primary/30   text-fk-primary  h-10 rounded-md w-full  outline-fk-primary placeholder:text-fk-primary/80 px-2"
                {...methods.register("categoria")}
              >
                <option value="" className="text-gray-400">
                  categoria
                </option>
                {categories?.map((categorie) => (
                  <option value={categorie} key={categorie}>
                    {categorie}
                  </option>
                ))}
              </select>

              <select
                id="measure"
                className="border-2 border-fk-primary/30   text-fk-primary  h-10 rounded-md w-full  outline-fk-primary placeholder:text-fk-primary/80 px-2"
                {...methods.register("unidade")}
              >
                <option value="" className="text-gray-400">
                  medida
                </option>
                {measures?.map((measures) => (
                  <option value={measures} key={measures}>
                    {measures}
                  </option>
                ))}
              </select>
            </div>
            {errors.categoria && (
              <span className="text-xs text-fk-error-text">
                {errors.categoria.message as string}
              </span>
            )}
            {errors.unidade && (
              <span className="text-xs text-fk-error-text">
                {errors.unidade.message as string}
              </span>
            )}

            <div ref={selectCityWrapper} className="w-full my-2">
              <button
                onClick={() => setShowcitiespicker(!showCitiesPicker)}
                className="flex w-full gap-2 text-lg items-center-safe border-b"
              >
                <label>
                  {" "}
                  Disponível em
                  {` ${selectedCities.length}
                     ${selectedCities.length > 1 ? "cidades" : "cidade"} `}
                </label>

                <FaPencil />
              </button>
              {showCitiesPicker && (
                <Controller
                  control={methods.control}
                  name="cidades"
                  render={({ field }) => (
                    <MultipleCitiesSelect
                      selectedCities={selectedCities}
                      citiesOptions={citiesOptions}
                      setSelectedCities={setSelectedCities}
                      RHFonChange={field.onChange}
                    />
                  )}
                />
              )}
            </div>
            {errors.cidades && (
              <span className="text-xs text-fk-error-text">
                {errors.cidades.message as string}
              </span>
            )}

            <textarea
              {...methods.register("descricao")}
              placeholder="descrição do produto"
              className="font-bold  p-2 min-h-1/4 break-all leading-relaxed w-full border-b"
            />
            {errors.descricao && (
              <span className="text-xs text-fk-error-text">
                {errors.descricao.message as string}
              </span>
            )}
          </section>
          <button
            className="flex w-full h-8  items-center justify-center  rounded-md bg-fk-primary my-4"
            onClick={methods.handleSubmit(onSubmit)}
          >
            <p className="text-lg font-bold text-amber-50 ">Pronto</p>
          </button>
        </>
      )}
    </div>
  );
}
