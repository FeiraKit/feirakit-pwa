"use client";

import { StepIndicator } from "@/app/components/stepIndicator";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

export function OnBoarding() {
  const [step, setStep] = useState(0);
  const setHasseenOnboarding = useOnboardingStore(
    (state) => state.setHasSeenOnboarding
  );
  const mySteps = [
    {
      image: "/onBoarding1.webp",
      title: "Bem-Vindos ao Feira Kit",
      text: "Produtos frescos e feitos na sua região, reunidos em um só lugar.",
    },
    {
      image: "/onBoarding2.webp",
      title: "Apoie quem produz",
      text: "Compre direto de agricultores e artesãos locais.",
    },
    {
      image: "/onBoarding3.webp",
      title: "Praticidade pra você",
      text: "Faça pedidos com poucos toques, sem filas e sem complicação.",
    },
    {
      image: "/onBoarding4.webp",
      title: "Comece agora",
      text: "Crie sua conta e aproveite uma feira livre na palma da sua mão.",
    },
  ];
  const handleNext = () => {
    if (step == mySteps.length - 1) {
      setHasseenOnboarding();
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (step == 0) return;
    setStep((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-dvh h-dvh max-h-dvh w-screen max-w-screen px-8 pt-2  bg-fk-background/90 text-blue-950 ">
      <h1 className="text-2xl font-bold text-fk-primary text-center mt-6">
        {mySteps[step].title}
      </h1>
      <div className="relative w-64 h-64 mt-4">
        <Image
          src={mySteps[step].image}
          alt="Produtos da região"
          className="object-contain"
          fill
        />
      </div>
      <p className="text-base text-fk-text/80 text-center px-4 mt-4 mb-2">
        {mySteps[step].text}
      </p>

      <StepIndicator length={mySteps.length} step={step + 1} />
      <div className="flex w-full gap-2">
        {step >= 1 && (
          <button
            onClick={handlePrev}
            className="w-1/6 py-3 bg-fk-primary text-white font-semibold mt-6 flex justify-center items-center rounded-full"
          >
            <FaArrowLeft />
          </button>
        )}
        <button
          onClick={handleNext}
          className="w-full py-3 bg-fk-primary text-white font-semibold rounded-xl mt-6"
        >
          {step == mySteps.length - 1 ? "Vamos lá" : "Próximo"}
        </button>
      </div>
    </div>
  );
}
