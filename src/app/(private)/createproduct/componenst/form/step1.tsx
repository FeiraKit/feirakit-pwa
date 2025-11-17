"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useFormContext } from "react-hook-form";
import { addProductFormData } from "../../page";
import Input from "@/app/components/Input";

import { Controller } from "react-hook-form";
import { CurrencyInput } from "../CurrencyInput";
import { useProductConfigStore } from "@/stores/useProductConfigStore";
import { Label } from "@/app/components/Label";

export function Step1() {
  const username = useAuthStore((state) => state.usuario?.nome);
  const measures = useProductConfigStore((state) => state.measures);
  const categories = useProductConfigStore((state) => state.categories);
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<addProductFormData>();

  return (
    <div className="flex flex-1 flex-col">
      <h1 className=" text-xl text-black/90">
        Olá {username}! Vamos começar o cadastro do seu produto...
      </h1>
      <section className="flex flex-1 flex-col justify-evenly">
        <div>
          <Label htmlFor="name" text="Nome do produto:" />
          <Input
            id="name"
            placeholder="nome do produto"
            {...register("nome")}
          />
          {errors.nome && (
            <span className="text-xs text-fk-error-text">
              {errors.nome.message as string}
            </span>
          )}
        </div>

        <div>
          <Label text="Preço:" htmlFor="price" />

          <Controller
            name="preco"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                id="price"
                RHFvalue={field.value}
                RHFonChange={field.onChange}
              />
            )}
          />
          {errors.preco && (
            <span className="text-xs text-fk-error-text">
              {errors.preco.message as string}
            </span>
          )}
        </div>

        <div>
          <Label text="Categoria do produto:" htmlFor="category" />

          <select
            id="category"
            {...register("categoria")}
            className="border-2 border-fk-primary/30   text-fk-primary  h-10 rounded-md w-full  outline-fk-primary placeholder:text-fk-primary/80 px-2"
          >
            <option value="" className="text-gray-400">
              selecione uma Categoria
            </option>
            {categories.map((categorie) => (
              <option value={categorie} key={categorie}>
                {categorie}
              </option>
            ))}
          </select>

          {errors.categoria && (
            <span className="text-xs text-fk-error-text">
              {errors.categoria.message as string}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="measure" text="Como esse produto é vendido:" />

          <select
            id="measure"
            {...register("unidade")}
            className="border-2 border-fk-primary/30   text-fk-primary  h-10 rounded-md w-full  outline-fk-primary placeholder:text-fk-primary/80 px-2"
          >
            <option value="" className="text-gray-400">
              selecione um tipo de medida
            </option>
            {measures.map((measures) => (
              <option value={measures} key={measures}>
                {measures}
              </option>
            ))}
          </select>

          {errors.unidade && (
            <span className="text-xs text-fk-error-text">
              {errors.unidade.message as string}
            </span>
          )}
        </div>
      </section>
    </div>
  );
}
