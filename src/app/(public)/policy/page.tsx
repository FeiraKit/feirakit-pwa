"use client";
import { Header } from "@/app/components/header";
import { POLICY } from "@/app/data/policyAndTerms";

export default function Policy() {
  return (
    <div className="flex flex-col justify-between  items-center min-h-screen h-screen max-h-screen w-screen max-w-screen px-8 pt-2 pb-30 bg-fk-background/90">
      <Header showBackButton />
      <section className="flex flex-col max-w-screen min-h-screen overflow-scroll">
        <h2 className="text-fk-primary font-extrabold text-xl text-center">
          Política de Privacidade
        </h2>
        <p className="text-black mt-1 leading-relaxed whitespace-pre-line">
          {POLICY}
        </p>
      </section>
    </div>
  );
}
