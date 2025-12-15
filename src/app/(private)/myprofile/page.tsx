"use client";

import { Header } from "@/app/components/header";
import { MyProfileSkeleton, Spin } from "@/app/components/loadings/skeleton";
import { BRAZILIAN_STATES } from "@/app/data/states";
import { useUpdateUser } from "@/hooks/users/useUpdateUser";

import { useAuthStore } from "@/stores/useAuthStore";
import { updateUserFormData, updateUserSchema } from "@/types/forms/userTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaCity,
  FaEdit,
  FaKey,
  FaMap,
  FaMapPin,
  FaStreetView,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FaHouse,
  FaLocationDot,
  FaTreeCity,
  FaUser,
  FaUserXmark,
} from "react-icons/fa6";
import { PatternFormat } from "react-number-format";

export default function MyProducts() {
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const user = useAuthStore.getState().usuario;
  const updateUser = useUpdateUser();
  const methods = useForm<updateUserFormData>({
    resolver: zodResolver(updateUserSchema),
  });

  const handleCepBlur = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();
      console.log(data);
      if (data.erro) return; // CEP inválido

      // Preencher os campos automaticamente

      methods.setValue("endereco.rua", data.logradouro || "", {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      methods.setValue("endereco.bairro", data.bairro || "", {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      methods.setValue("endereco.cidade", data.localidade || "", {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      methods.setValue("endereco.estado", data.uf || "", {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  const handleUpdateUser = (data: updateUserFormData) => {
    if (!user?.id) return;
    const confirmed = window.confirm("Deseja realmente alterar estes dados?");

    if (!confirmed) return;
    const dataWithId = {
      ...data,
      id: user.id,
      complemeto: data.endereco.complemento || "",
    };
    updateUser.mutate(dataWithId);
  };

  useEffect(() => {
    if (!user) return;
    methods.reset(user);
  }, [user, methods]);

  return (
    <div className="flex flex-col  items-center min-h-dvh max-h-dvh  w-screen max-w-screen px-6 pt-2  bg-fk-background/90 text-black  border-2 ">
      <Header showBackButton showMenuButton />
      {!user ? (
        <MyProfileSkeleton />
      ) : (
        <>
          <div className="flex justify-between w-full border-b border-gray-400 py-2 items-end ">
            <div>
              <h2 className="text-2xl text-gray-700 font-bold">Minha conta</h2>
              <p className="text-xs">{user.email}</p>
            </div>
            <button
              className="flex h-12 gap-2 items-center-safe font-semibold border border-fk-primary px-2 rounded-md active:bg-gray-400"
              onClick={() => setIsUpdateMode(!isUpdateMode)}
            >
              Editar
              <span>
                <FaEdit />
              </span>
            </button>
          </div>

          <div className="w-full flex justify-between px-2 mt-1">
            <Link
              href="/myprofile/changepassword"
              className="text-sm flex items-center gap-1 text-fk-primary font-semibold hover:underline"
            >
              <FaKey className="h-4 w-4" />
              Alterar senha
            </Link>
            <Link
              href="/myprofile/deleteAccount"
              className="text-sm flex items-center gap-1 text-fk-error-text font-semibold hover:underline"
            >
              <FaUserXmark className="h-4 w-4" />
              Apagar minha conta
            </Link>
          </div>

          <section className="w-full flex  flex-col flex-1 overflow-y-auto  pt-2  px-1">
            <form className="w-full">
              <div className="flex w-full gap-2  p-2 items-center">
                <FaUser
                  className={isUpdateMode ? "text-fk-primary" : "text-gray-500"}
                />
                <input
                  {...methods.register("nome")}
                  type="text"
                  disabled={!isUpdateMode}
                  placeholder="Nome do produtor"
                  className={`   w-full outline-none ${
                    isUpdateMode && " border-b border-fk-primary"
                  }`}
                />
              </div>

              <div className="flex w-full gap-2  p-2  items-center">
                <FaWhatsapp
                  className={isUpdateMode ? "text-fk-primary" : "text-gray-500"}
                />
                <PatternFormat
                  {...methods.register("telefone")}
                  format="(##) #####-####"
                  placeholder="(99) 99999-9999"
                  value={methods.getValues("telefone")}
                  customInput={(props) => (
                    <input
                      {...props}
                      type="text"
                      disabled={!isUpdateMode}
                      className={`   w-full outline-none ${
                        isUpdateMode && " border-b border-fk-primary"
                      }`}
                    />
                  )}
                  onValueChange={(values) => {
                    // atualiza o RHF
                    methods.setValue("telefone", values.value, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>

              <label> Endereço:</label>

              <div className="flex w-full gap-2  p-2  items-center">
                <FaLocationDot
                  className={isUpdateMode ? "text-fk-primary" : "text-gray-500"}
                />
                <PatternFormat
                  {...methods.register("endereco.cep")}
                  type="tel"
                  onBlur={(e) => handleCepBlur(e.target.value)}
                  format="#####-###"
                  placeholder="digite seu cep"
                  customInput={(props) => (
                    <input
                      {...props}
                      type="text"
                      disabled={!isUpdateMode}
                      className={`   w-full outline-none ${
                        isUpdateMode && " border-b border-fk-primary"
                      }`}
                    />
                  )}
                  value={methods.getValues("endereco.cep")}
                  onValueChange={(values) => {
                    // atualiza o RHF
                    methods.setValue("endereco.cep", values.value, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>

              <div className="flex w-full gap-2  p-2  items-center">
                <FaStreetView
                  className={isUpdateMode ? "text-fk-primary" : "text-gray-500"}
                />

                <input
                  type="text"
                  {...methods.register("endereco.rua")}
                  disabled={!isUpdateMode}
                  className={`   w-full outline-none ${
                    isUpdateMode && " border-b border-fk-primary"
                  }`}
                />

                <div className="flex w-2/6">
                  <FaHouse
                    className={
                      isUpdateMode ? "text-fk-primary" : "text-gray-500"
                    }
                  />
                  <input
                    type="text"
                    {...methods.register("endereco.numero")}
                    disabled={!isUpdateMode}
                    className={` px-1 w-full outline-none ${
                      isUpdateMode && " border-b border-fk-primary"
                    }`}
                  />
                </div>
              </div>

              <div className="flex w-full gap-2  p-2 items-center">
                <FaMapPin
                  className={isUpdateMode ? "text-fk-primary" : "text-gray-500"}
                />
                <input
                  {...methods.register("endereco.complemento")}
                  type="text"
                  disabled={!isUpdateMode}
                  placeholder="complemento"
                  className={`   w-full outline-none ${
                    isUpdateMode && " border-b border-fk-primary"
                  }`}
                />
              </div>

              <div className="flex w-full gap-2  p-2 items-center">
                <FaTreeCity
                  className={isUpdateMode ? "text-fk-primary" : "text-gray-500"}
                />
                <input
                  {...methods.register("endereco.bairro")}
                  type="text"
                  disabled={!isUpdateMode}
                  placeholder="bairro / comunidade"
                  className={`   w-full outline-none ${
                    isUpdateMode && " border-b border-fk-primary"
                  }`}
                />
              </div>

              <div className="flex w-full gap-2  p-2 items-center">
                <FaCity
                  className={isUpdateMode ? "text-fk-primary" : "text-gray-500"}
                />
                <input
                  {...methods.register("endereco.cidade")}
                  type="text"
                  disabled={true}
                  placeholder="Informe o cep para preencher a cidade"
                  className={`   w-full outline-none ${
                    isUpdateMode && " border-b border-fk-primary"
                  }`}
                />
              </div>

              <div className="flex w-full gap-2  p-2 items-center">
                <FaMap
                  className={isUpdateMode ? "text-fk-primary" : "text-gray-500"}
                />
                <select
                  {...methods.register("endereco.estado")}
                  disabled={true}
                  className={`   w-full appearance-none ${
                    isUpdateMode && " border-b border-fk-primary"
                  }`}
                >
                  <option value="">Selecione um Estado</option>
                  {BRAZILIAN_STATES.map((state) => (
                    <option value={state.value} key={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </section>
          <button
            className={`mb-4 flex w-full h-12  items-center justify-center rounded-md bg-fk-primary my-4 transition-all duration-150 ${
              !isUpdateMode && "invisible"
            }`}
            disabled={updateUser.isPending}
            onClick={methods.handleSubmit(handleUpdateUser)}
          >
            {updateUser.isPending ? (
              <Spin className="w-6 h-6" />
            ) : (
              <p className="text-lg font-bold text-amber-50">
                Confirmar alterações
              </p>
            )}
          </button>
        </>
      )}
    </div>
  );
}
