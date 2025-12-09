"use client";

import { FaLock, FaUser } from "react-icons/fa6";
import Input from "../../Input";
import { MdEmail } from "react-icons/md";
import { useFormContext } from "react-hook-form";
import { RegisterFormData } from "@/types/forms/userTypes";
import { useVerifyEmail } from "@/hooks/users/useCheckEmailAlreadyUsed";
import { SpinProgress } from "../../loadings/skeleton";

import { toastInfo } from "@/app/utils/toasthelper";

export default function Step1({}) {
  const {
    register,
    setFocus,
    setError,
    formState: { errors },
  } = useFormContext<RegisterFormData>();
  const verifyEmail = useVerifyEmail();

  const verifyEmailAlreadyUsed = async (email: string) => {
    if (!navigator.onLine) {
      setFocus("email");
      setError("email", {
        message: "não foi possível verificar este email",
      });
      toastInfo("verifique sua conexão com a internet e tente novamente");
      return;
    }
    verifyEmail.mutate(email, {
      onSuccess: (data) => {
        if (!data.userExist) return;
        setFocus("email");
        setError("email", { message: "Este email já está em uso" });
      },
      onError: () => {},
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full ">
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
        rigthIcon={
          verifyEmail.isPending ? <SpinProgress className="w-6 h-6" /> : <></>
        }
        {...register("email")}
        onBlur={(e) => {
          verifyEmailAlreadyUsed(e.target.value);
        }}
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
