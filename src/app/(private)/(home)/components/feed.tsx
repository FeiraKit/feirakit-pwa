"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductType } from "./productItem";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Input from "@/app/components/Input";
import { FaSearch } from "react-icons/fa";
import { SelectCity } from "./selectCity";
import { FlatList } from "./flatlist";
import { useSearchParams } from "next/navigation";

type Filters = {
  pageParam?: number;
  searchTerm?: string;
  selectedCity?: string;
};

async function fetcher({ pageParam, searchTerm, selectedCity }: Filters) {
  console.log("fetcher called with:", { pageParam, searchTerm, selectedCity });
  let url = "";

  if (selectedCity) {
    searchTerm = "";
    url = `${process.env.NEXT_PUBLIC_API_URL}/products/filters?cidade=${selectedCity}`;
  }

  if (searchTerm && searchTerm?.length > 0) {
    url = `${process.env.NEXT_PUBLIC_API_URL}/products/filters?nome=${searchTerm}`;
  }

  if (!searchTerm && !selectedCity) {
    url = `${process.env.NEXT_PUBLIC_API_URL}/products?page=${pageParam}&limit=10`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Erro ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export function Feed() {
  const { ref, inView } = useInView();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const searchParams = useSearchParams();

  const { data, error, fetchNextPage, isFetchingNextPage, isPending } =
    useInfiniteQuery({
      queryKey: ["PRODUCTS", { searchTerm, selectedCity }],
      queryFn: ({ pageParam }) =>
        fetcher({ pageParam, searchTerm, selectedCity }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length > 0 ? allPages.length + 1 : undefined;
      },
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const handleSearchTerm = (term: string) => {
    setSearchTerm(term);
    setSelectedCity("");
  };

  useEffect(() => {
    if (data && data.pages.length > 0 && !isPending) {
      setProducts(data.pages.flat());
    }
  }, [data, isPending]);

  useEffect(() => {
    const city = searchParams.get("cidade");
    if (city) {
      setSelectedCity(city);
      setSearchTerm("");
    }
  }, [searchParams]);

  if (isPending)
    return (
      <>
        <div className="w-full flex items-center-safe justify-between max-w-lg gap-3">
          <Input
            LeftIcon={<FaSearch />}
            imputClass="bg-gray-400/60"
            placeholder="Pesquisar"
          />
        </div>
        <SelectCity
          currentCity={selectedCity}
          setCurrentCity={setSelectedCity}
        />

        <div className="text-black">carregando...</div>
      </>
    );

  if (error) return <div className="text-black">erro</div>;

  if (data?.pages.length === 0)
    return <div className="text-black">nenhum produto encontrado</div>;

  return (
    <>
      <div className="w-full flex items-center-safe justify-between max-w-lg gap-3">
        <Input
          LeftIcon={<FaSearch />}
          value={searchTerm}
          imputClass="bg-gray-400/60"
          onChange={(e) => handleSearchTerm(e.target.value)}
          placeholder="Pesquisar"
        />
      </div>
      <SelectCity currentCity={selectedCity} setCurrentCity={setSelectedCity} />

      <FlatList
        products={products}
        isInfiniteScroll={searchTerm === "" && selectedCity === ""}
        isFetchingNextPage={isFetchingNextPage}
        sentinelRef={ref}
      />
    </>
  );
}
