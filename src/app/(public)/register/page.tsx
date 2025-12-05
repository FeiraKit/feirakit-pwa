"use client";

import Modal from "@/app/components/form/registerForm/modal";

import { Header } from "@/app/components/header";
import { StepIndicator } from "@/app/components/stepIndicator";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { POLICY, TERMS } from "@/app/data/policyAndTerms";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Step1 from "@/app/components/form/registerForm/step1";
import Step2 from "@/app/components/form/registerForm/step2";
import Step3 from "@/app/components/form/registerForm/step3";
import { RegisterFormData, registerSchema } from "@/types/forms/userTypes";
import { useCreateUser } from "@/hooks/users/useCreateUser";

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

export default function Register() {
  const [step, setStep] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"terms" | "policy">("terms");

  const createUser = useCreateUser();
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

    createUser.mutate(user);
  };

  return (
    <div className="flex flex-col items-center h-screen max-h-screen w-screen max-w-screen bg-fk-background/90 text-black font-sans">
      {createUser.isPending && (
        <div className="w-full bg-fk-primary/70 text-amber-50">
          {" "}
          <p>Criando usuário</p>
        </div>
      )}
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
