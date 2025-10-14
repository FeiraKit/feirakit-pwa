import { Header } from "@/app/components/header";
import React from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return (
    <div className="container mx-auto px-4 py-8">
      <Header showBackButton />
      <p>Página legal do {id}</p>
    </div>
  );
}
