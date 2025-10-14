"use client";

import Modal from "@/app/components/form/registerForm/modal";
import Step1 from "@/app/components/form/registerForm/step1";
import * as z from "zod";

import { Header } from "@/app/components/header";
import { StepIndicator } from "@/app/components/stepIndicator";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { POLICY, TERMS } from "@/app/data/policyAndTerms";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Step2 from "@/app/components/form/registerForm/step2";
import Step3 from "@/app/components/form/registerForm/step3";
import { toastWellcome, toastWrongCredentials } from "@/app/utils/toasthelper";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

export const registerSchema = z
  .object({
    nome: z
      .string()
      .min(2, { message: "Nome deve ter no mínimo 3 caracteres" }),
    email: z.email({ message: "E-mail inválido" }),
    senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmasenha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    telefone: z.string().min(10, "Telefone inválido"),
    endereco: z.object({
      rua: z.string().min(1, "informe o nome da rua"),
      numero: z.string().min(1, "informe o numero"),
      bairro: z.string().min(1, "informe o nome do bairro"),
      cep: z.string().min(8, "informe um CEP válido"),
      complemento: z.string().optional(),
      cidade: z.string().min(1, "informe o nome da cidade"),
      estado: z.string().min(2, "informe o nome do estado"),
    }),
    acceptTerm: z.boolean().refine((val) => val, "Você deve aceitar os termos"),
    acceptPolicy: z
      .boolean()
      .refine((val) => val, "Você deve aceitar a política"),
  })
  .refine((data) => data.senha === data.confirmasenha, {
    message: "As senhas não coincidem",
    path: ["confirmasenha"],
  });

const stepFields = {
  1: ["nome", "email", "senha", "confirmasenha"],
  2: [
    "endereco.rua",
    "endereco.numero",
    "endereco.bairro",
    "endereco.cep",
    "endereco.complemento",
    "endereco.cidade",
    "endereco.estado",
  ],
  3: ["telefone", "acceptTerm", "acceptPolicy"],
} as const;
type StepKeys = keyof typeof stepFields;

export type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [step, setStep] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"terms" | "policy">("terms");
  const setUsuario = useAuthStore((state) => state.setUsuario);
  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter();

  const closeModal = () => {
    setOpenModal(!openModal);
  };

  const openPolicyModal = () => {
    setModalType("policy");
    setOpenModal(!openModal);
  };

  const openTermsModal = () => {
    setModalType("terms");
    setOpenModal(!openModal);
  };

  const handleNextStep = async () => {
    const stepKey = step as StepKeys;
    const fieldsOfStep = stepFields[stepKey];
    const valid = await methods.trigger(fieldsOfStep);
    if (!valid) return;
    if (valid && step === 1) {
      if (methods.getValues("senha") !== methods.getValues("confirmasenha")) {
        methods.setError("confirmasenha", {
          message: "As senhas não coincidem",
        });
        return;
      }
    }

    setStep(step + 1);
  };

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange", // ou "onChange", dependendo da sua preferência
  });
  const canSubmit =
    methods.watch("acceptTerm") && methods.watch("acceptPolicy");

  const handleCreateUser = async (data: RegisterFormData) => {
    const user = {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      senha: data.senha,
      endereco: {
        rua: data.endereco.rua,
        numero: data.endereco.numero,
        bairro: data.endereco.bairro,
        cep: data.endereco.cep,
        complemento: data.endereco.complemento || "",
        cidade: data.endereco.cidade,
        estado: data.endereco.estado,
      },
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      const login = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: data.token }),
      });

      const loginData = await login.json();
      if (!loginData.result) {
        toastWrongCredentials(
          "Desculpe, tivemos um problema ao verificar seus dados, tente novamente."
        );
        return;
      }
      //persistir usuario no store
      setUsuario(data.usuario);
      setToken(data.token);
      toastWellcome();
      router.push("/");

      console.log(data);
    } catch (e) {
      console.log(e);
      toastWrongCredentials(
        "Não foi possivel conectar ao servidor, tente novamente mais tarde"
      );
    }
  };

  return (
    <div className="flex flex-col items-center h-screen max-h-screen w-screen max-w-screen bg-fk-background/90 text-black font-sans">
      <Header showBackButton />
      <StepIndicator step={step} length={3} />
      <h2 className="mt-3 font-semibold text-xl text-center">
        Cadastre-se no FeiraKit
      </h2>

      <FormProvider {...methods}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && (
          <Step3
            openPolicyModal={openPolicyModal}
            openTermsModal={openTermsModal}
          />
        )}
      </FormProvider>

      <div className="flex gap-2 w-full p-6 justify-center">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex w-4/12 h-10 items-center gap-1 text-fk-primary"
          >
            <FaArrowLeft /> Voltar
          </button>
        )}
        {step < 3 && (
          <button
            onClick={() => handleNextStep()}
            className="w-full h-10 rounded-md bg-fk-primary text-fk-background font-bold"
          >
            Continuar
          </button>
        )}
      </div>
      {step == 3 && (
        <div className="flex gap-2 w-full px-6">
          <button
            onClick={methods.handleSubmit(handleCreateUser)}
            className="w-full h-10 rounded-md bg-fk-primary text-fk-background font-bold disabled:bg-gray-400"
            disabled={!canSubmit}
          >
            Finalizar inscrição
          </button>
        </div>
      )}
      {openModal && (
        <Modal
          onClose={closeModal}
          text={modalType === "terms" ? TERMS : POLICY}
          title={
            modalType === "terms" ? "Termos de uso" : "Política de Privacidade"
          }
        />
      )}
    </div>
  );
}
