"use client";

import { useFormContext } from "react-hook-form";
import { addProductFormData } from "../../page";
import Input from "@/app/components/Input";

import { Label } from "@/app/components/Label";

export function Step2() {
  const {
    register,
    formState: { errors },
  } = useFormContext<addProductFormData>();

  return (
    <div className="flex flex-1 flex-col ">
      <h1 className=" text-xl text-black/90">Fale Mais sobre o Produto</h1>
      <section className="flex flex-1 flex-col justify-evenly">
        <div className="flex flex-col">
          <Label htmlFor="description" text="Descrição:" />
          <textarea
            id="description"
            placeholder="Descreva o produto"
            className="border-2 p-2   border-fk-primary/30 text-fk-primary outline-fk-primary h-40 rounded-md w-full   placeholder:text-gray-400"
            {...register("descricao")}
          />
          {errors.descricao && (
            <span className="text-xs text-fk-error-text">
              {errors.descricao.message as string}
            </span>
          )}
        </div>

        <div className="flex flex-col ">
          <Label htmlFor="stock" text="Quantidade em estoque:" />
          <Input
            id="stock"
            placeholder="0"
            min="0"
            type="number"
            {...register("estoque", { valueAsNumber: true })}
          />
          {errors.estoque && (
            <span className="text-xs text-fk-error-text">
              {errors.estoque.message as string}
            </span>
          )}
        </div>

        <div className="flex flex-col  h-10 ">
          <div className="flex items-center h-10">
            <input
              id="bestbefore"
              placeholder="0"
              type="checkbox"
              className="border-2 border-fk-primary/30 text-fk-primary outline-fk-primary  rounded-md placeholder:text-gray-400 w-10 h-10"
              {...register("bestbefore")}
            />
            <label htmlFor="bestbefore" className="ml-2 text-xl text-gray-800">
              O produto será Colhido/fabricado por encomenda
            </label>
          </div>

          {errors.bestbefore && (
            <span className="text-xs text-fk-error-text">
              {errors.bestbefore.message as string}
            </span>
          )}
        </div>
      </section>
    </div>
  );
}
