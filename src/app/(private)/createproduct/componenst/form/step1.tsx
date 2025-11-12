"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useFormContext } from "react-hook-form";
import { addProductFormData } from "../../page";
import Input from "@/app/components/Input";

export function Step1() {
  const username = useAuthStore((state) => state.usuario?.nome);
  const {
    register,
    formState: { errors },
  } = useFormContext<addProductFormData>();

  return (
    <div className="flex flex-1 flex-col">
      <h1 className=" text-lg text-black/90">
        Olá {username}! Vamos começar o cadastro do seu produto...
      </h1>
      <div>
        <label className="mt-8 ml-4" htmlFor="nome">
          Nome do produto:
        </label>
        <Input id="name" placeholder="nome do produto" {...register("nome")} />
        {errors.nome && (
          <span className="text-xs text-fk-error-text">
            {errors.nome.message as string}
          </span>
        )}
      </div>
    </div>
  );
}
