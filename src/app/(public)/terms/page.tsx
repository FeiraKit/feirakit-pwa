"use client";
import { Header } from "@/app/components/header";
import { TERMS } from "@/app/data/policyAndTerms";

export default function Terms() {
  return (
    <div className="flex flex-col justify-between  items-center min-h-screen h-screen max-h-screen w-screen max-w-screen px-8 pt-2 pb-30 bg-fk-background/90">
      <Header showBackButton />
      <section className="flex flex-col w-full">
        <h2 className="text-fk-primary font-extrabold text-xl ">
          Termos de uso
        </h2>
        <p>{TERMS}</p>
      </section>
    </div>
  );
}
