"use client";

import { FaLock, FaUser } from "react-icons/fa6";
import Input from "../../Input";
import { MdEmail } from "react-icons/md";
import { useFormContext } from "react-hook-form";
import { RegisterFormData } from "@/types/forms/userTypes";

export default function Step1({}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterFormData>();
  return (
    <div className="flex flex-col  w-full px-6">
      <label className="mt-8" htmlFor="nome">
        Nome:
      </label>
      <Input
        id="name"
        placeholder="Nome"
        LeftIcon={<FaUser />}
        {...register("nome")}
      />
      {errors.nome && (
        <span className="text-xs text-fk-error-text">
          {errors.nome.message as string}
        </span>
      )}

      <label className="mt-2" htmlFor="email">
        E-mail:
      </label>
      <Input
        id="email"
        placeholder="Email"
        type="email"
        LeftIcon={<MdEmail />}
        {...register("email")}
      />
      {errors.email && (
        <span className="text-xs text-fk-error-text">
          {errors.email.message as string}
        </span>
      )}

      <label className="mt-2" htmlFor="password">
        Senha:
      </label>
      <Input
        id="password"
        placeholder="senha"
        type="password"
        LeftIcon={<FaLock />}
        {...register("senha")}
      />
      {errors.senha && (
        <span className="text-xs text-fk-error-text">
          {errors.senha.message as string}
        </span>
      )}

      <label className="mt-2">Confirme a sua Senha:</label>
      <Input
        placeholder="Confime a sua senha"
        type="password"
        LeftIcon={<FaLock />}
        {...register("confirmasenha")}
      />
      {errors.confirmasenha && (
        <span className="text-xs text-fk-error-text">
          {errors.confirmasenha.message as string}
        </span>
      )}
    </div>
  );
}
