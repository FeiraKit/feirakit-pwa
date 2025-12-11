"use client";
import { Header } from "@/app/components/header";
import { StepIndicator } from "@/app/components/stepIndicator";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";

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
import { useProductConfig } from "@/hooks/useProductConfig";
import { uploadImages } from "@/app/utils/imageStorageService";
import {
  addProductFormData,
  addProductSchema,
} from "@/types/forms/addProductFormData";
import { createProduct } from "@/sevices/ProductServices";
import { toastAddToCart } from "@/app/utils/toasthelper";
import { CreateProductSkeleton } from "@/app/components/loadings/skeleton";
import { ErrorMessage } from "@/app/components/errorMessage";
import { SavingProduct } from "@/app/components/loadings/uploadingProduct";

const stepFields = {
  1: ["nome", "preco", "categoria", "unidade"],
  2: ["descricao", "estoque", "bestbefore"],
  3: ["cidades"],
  4: ["imagem_url"],
} as const;

type StepKeys = keyof typeof stepFields;

export default function CreateProduct() {
  const { configs, loading, error } = useProductConfig();
  const user = useAuthStore((state) => state.usuario);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  const steps: FC[] = [Step1, Step2, Step3, Step4, Resume];
  const StepComponent = steps[step - 1] ?? null;

  const methods = useForm<addProductFormData>({
    resolver: zodResolver(addProductSchema),
    mode: "onChange",
    defaultValues: {
      cidades: [],
    },
  });

  const handleNextStep = async () => {
    const stepKey = step as StepKeys;
    const fieldsOfStep = stepFields[stepKey];
    const valid = await methods.trigger(fieldsOfStep);
    if (!valid) return;
    setStep(step + 1);
  };

  const handleSubmitForm = async (data: addProductFormData) => {
    setIsSavingProduct(true);
    const slug = data.nome
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const uploadedImages: string[] = await uploadImages({
      blobsUrls: data.imagem_url,
      slugProduct: slug,
    });
    data.imagem_url = uploadedImages;
    methods.setValue("imagem_url", uploadedImages);

    await createProduct(data);
    setIsSavingProduct(false);
    toastAddToCart("Produto criado com sucesso!");
    router.push("/myproducts");
  };

  useEffect(() => {
    if (user?.endereco.cidade) {
      methods.setValue("cidades", [user.endereco.cidade], {
        shouldValidate: true,
      });
    }

    if (user?.id) {
      methods.setValue("produtor_id", user.id);
    }

    const today = new Date().toLocaleDateString("en-CA");
    methods.setValue("validade", today);
  }, [methods, user]);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return (
    <div className="flex flex-col  items-center min-h-dvh h-dvh max-h-dvh w-screen max-w-screen px-6 pt-2 pb-1 bg-fk-background/90">
      <Header showBackButton showMenuButton />
      {!isOnline && <ErrorMessage message={"sem conexão com a internet"} />}
      {error && isOnline && (
        <ErrorMessage message="Ouver um erro ao carregar as configurações" />
      )}
      {loading && <CreateProductSkeleton />}
      {isSavingProduct && <SavingProduct />}
      {!loading && !error && !isSavingProduct && (
        <section className="w-full flex flex-col items-center py-2 h-[85vh] text-black">
          <StepIndicator fillDots step={step} length={steps.length} />

          {configs && (
            <FormProvider {...methods}>
              <div className="flex flex-col w-full flex-1 overflow-y-auto py-2 m-2">
                {StepComponent && <StepComponent />}
              </div>
            </FormProvider>
          )}

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
                step !== steps.length
                  ? handleNextStep
                  : methods.handleSubmit(handleSubmitForm)
              }
              className="w-full h-10 rounded-md bg-fk-primary text-fk-background font-bold"
            >
              {step !== steps.length ? "Continuar" : "finalizar"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
