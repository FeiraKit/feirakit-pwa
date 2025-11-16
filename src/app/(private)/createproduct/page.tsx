"use client";
import { Header } from "@/app/components/header";
import { StepIndicator } from "@/app/components/stepIndicator";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";
import * as z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { Step1 } from "./componenst/form/step1";
import { Step2 } from "./componenst/form/step2";
import { Step3 } from "./componenst/form/step3";
import { Step4 } from "./componenst/form/step4";
import { Resume } from "./componenst/form/resume";
import { FC } from "react";

export const addProductSchema = z.object({
  nome: z.string().min(4, { error: "Informe um título para o produto " }),
  preco: z.number().min(0.01, { error: "Informe o valor para o produto" }),
  estoque: z
    .number()
    .min(1, { error: "Quantos Produtos estarão disponíveis?" }),
  categoria: z.string().min(1, { error: "Informe a categoria deste produto " }),
  descricao: z.string().min(5, { error: "Fale sobre o produto" }),
  unidade: z.string().min(1, { error: "Como esseproduto é vendido?" }),
  cidades: z
    .array(z.string())
    .min(1, { error: "Em que cidade este Produto estará disponível?" }),
  bestbefore: z.boolean().optional(),
  validade: z.string(),
  imagem_url: z
    .array(z.string())
    .min(1, { error: "Adicione fotos do produto" }),
});

export type addProductFormData = z.infer<typeof addProductSchema>;

const stepFields = {
  1: ["nome", "preco", "categoria", "unidade"],
  2: ["descricao", "estoque", "bestbefore"],
  3: ["cidades"],
  4: ["imagem_url"],
  5: ["resumo"],
} as const;

type StepKeys = keyof typeof stepFields;

export default function CreateProduct() {
  const user = useAuthStore((state) => state.usuario);
  const router = useRouter();
  const [step, setStep] = useState(1);

  const steps: FC[] = [Step1, Step2, Step3, Step4, Resume];
  const StepComponent = steps[step - 1] ?? null;

  const methods = useForm<addProductFormData>({
    resolver: zodResolver(addProductSchema),
    mode: "onChange",
  });

  const handleNextStep = async () => {
    setStep(step + 1);
  };

  return (
    <div className="flex flex-col  items-center min-h-screen h-screen max-h-screen w-screen max-w-screen px-6 pt-2 pb-1 bg-fk-background/90">
      <Header showBackButton showMenuButton />
      <section className="w-full flex flex-col items-center py-2 h-[85vh] text-black">
        <StepIndicator fillDots step={step} length={steps.length} />
        <FormProvider {...methods}>
          <div className="flex flex-col w-full flex-1 overflow-y-auto py-2 m-2">
            {StepComponent && <StepComponent />}
          </div>
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

          <button
            onClick={
              step !== steps.length ? handleNextStep : () => console.log("buu")
            }
            className="w-full h-10 rounded-md bg-fk-primary text-fk-background font-bold"
          >
            {step !== steps.length ? "Continuar" : "finalizar"}
          </button>
        </div>
      </section>
    </div>
  );
}
