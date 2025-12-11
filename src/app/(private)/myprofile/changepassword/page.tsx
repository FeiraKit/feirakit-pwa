"use client";

import { Header } from "@/app/components/header";
import Input from "@/app/components/Input";
import { Spin } from "@/app/components/loadings/skeleton";
import { useChangePassword } from "@/hooks/users/useChangePassword";
import { useSignIn } from "@/hooks/users/useSignIn";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  changePasswordFormData,
  changePasswordSchema,
} from "@/types/forms/userTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";

export default function MyProducts() {
  const user = useAuthStore.getState().usuario;
  const [step, setStep] = useState<1 | 2>(1);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>();
  const checkPassword = useSignIn();
  const changePassword = useChangePassword();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<changePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  const HandleVerifyPasswoard = (password: string) => {
    if (!user) return;
    const credentials = {
      email: user.email,
      senha: password,
    };
    checkPassword.mutate(credentials, {
      onSuccess: () => {
        setValue("senha_antiga", password);
        setStep(2);
      },
      onError: () => {
        setPasswordError("A senha informada está incorreta");
      },
    });
  };

  const HandleChangePassword = (data: changePasswordFormData) => {
    if (!user) return;
    const confirmed = window.confirm("Deseja realmente alterar estes dados?");
    if (!confirmed) return;
    const changePasswordData = {
      email: user.email,
      senha: data.senha_antiga,
      nova_senha: data.nova_senha,
    };
    changePassword.mutate(changePasswordData);
  };
  return (
    <div className="flex flex-col  items-center min-h-dvh max-h-dvh  w-screen max-w-screen px-6 pt-2  bg-fk-background/90 text-black  border-2 ">
      {!user ? (
        <p>carregando</p>
      ) : (
        <>
          <Header showBackButton showMenuButton />
          <main className="flex flex-col flex-1 py-4 gap-3">
            {step === 1 && (
              <>
                <p className="text-sm text-gray-600">
                  Para sua segurança, confirme sua senha atual antes de
                  continuar
                </p>

                <div className="flex items-center gap-3 p-2 border-b border-gray-300">
                  <Input
                    LeftIcon={<FaLock />}
                    placeholder="Digite sua senha atual"
                    type="password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                {passwordError && (
                  <p className="text-fk-error-dark -mt-2">{passwordError}</p>
                )}

                <button
                  className="w-full h-12 rounded-md bg-fk-primary text-white font-semibold mt-6 active:bg-fk-primary/80 flex justify-center items-center"
                  onClick={() => HandleVerifyPasswoard(currentPassword)}
                  disabled={checkPassword.isPending}
                >
                  {!checkPassword.isPending ? (
                    "Continuar"
                  ) : (
                    <Spin className="w-6 h-6" />
                  )}
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <p className="text-sm text-gray-600">
                  Crie uma nova senha forte para proteger sua conta.
                </p>

                {/* Nova senha */}
                <div className="flex flex-col items-center  p-2 border-b border-gray-300">
                  <label className="self-start text-sm text-fk-primary">
                    nova senha
                  </label>
                  <Input
                    LeftIcon={<FaLock />}
                    placeholder="Digite sua nova senha"
                    type="password"
                    {...register("nova_senha")}
                  />
                  {errors.nova_senha && (
                    <label className="self-start text-sm text-fk-error-dark">
                      {errors.nova_senha.message}
                    </label>
                  )}
                </div>

                {/* Confirmar nova senha */}
                <div className="flex flex-col items-center p-2 border-b border-gray-300 mt-3">
                  <label className="self-start text-sm text-fk-primary">
                    confirme a nova senha
                  </label>
                  <Input
                    LeftIcon={<FaLock />}
                    placeholder="confirme nova senha"
                    type="password"
                    {...register("confirmasenha")}
                  />
                  {errors.confirmasenha && (
                    <label className="self-start text-sm text-fk-error-dark">
                      {errors.confirmasenha.message}
                    </label>
                  )}
                </div>

                <button
                  className="w-full h-12 rounded-md bg-fk-primary text-white font-semibold mt-6 active:bg-fk-primary/80 flex justify-center items-center"
                  onClick={handleSubmit(HandleChangePassword)}
                >
                  {changePassword.isPending ? (
                    <Spin className="w-4 h-4" />
                  ) : (
                    "Salvar nova senha"
                  )}
                </button>
              </>
            )}
          </main>
        </>
      )}
    </div>
  );
}
