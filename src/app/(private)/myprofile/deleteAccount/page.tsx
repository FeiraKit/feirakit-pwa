"use client";

import { Header } from "@/app/components/header";
import Input from "@/app/components/Input";
import { Spin } from "@/app/components/loadings/skeleton";
import { useDeleteUser } from "@/hooks/users/useDeleteUser";
import { useSignIn } from "@/hooks/users/useSignIn";

import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";
import { FaLock, FaTrash } from "react-icons/fa";

export default function DeleteAccount() {
  const user = useAuthStore.getState().usuario;

  const [step, setStep] = useState<1 | 2>(1);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>();

  const checkPassword = useSignIn();
  const deleteUser = useDeleteUser(); // Hook de exclusão

  const HandleVerifyPassword = (password: string) => {
    if (!user) return;

    const credentials = {
      email: user.email,
      senha: password,
    };

    checkPassword.mutate(credentials, {
      onSuccess: () => {
        setStep(2);
      },
      onError: () => {
        setPasswordError("A senha informada está incorreta");
      },
    });
  };

  const HandleDeleteAccount = () => {
    if (!user) return;
    const id = user.id;
    const confirmed = window.confirm(
      "⚠ ATENÇÃO\n\nEssa ação NÃO pode ser desfeita.\nDeseja realmente excluir sua conta?"
    );

    if (!confirmed) return;

    deleteUser.mutate(id);
  };

  return (
    <div className="flex flex-col items-center min-h-dvh max-h-dvh w-screen max-w-screen px-6 pt-2 bg-fk-background/90 text-black">
      {!user ? (
        <p>Carregando...</p>
      ) : (
        <>
          <Header showBackButton showMenuButton />

          <main className="flex flex-col flex-1 py-4 gap-3">
            {step === 1 && (
              <>
                <p className="text-sm text-gray-600">
                  Para continuar, confirme sua senha atual.
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
                  onClick={() => HandleVerifyPassword(currentPassword)}
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
                  Esta ação removerá permanentemente sua conta e todos os seus
                  dados. Tenha certeza antes de prosseguir.
                </p>

                <button
                  className="w-full h-12 rounded-md bg-red-600 text-white font-semibold mt-6 active:bg-red-700 flex justify-center items-center gap-2"
                  onClick={HandleDeleteAccount}
                  disabled={deleteUser.isPending}
                >
                  {deleteUser.isPending ? (
                    <Spin className="w-5 h-5" />
                  ) : (
                    <>
                      <FaTrash className="text-white" />
                      Excluir minha conta
                    </>
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
