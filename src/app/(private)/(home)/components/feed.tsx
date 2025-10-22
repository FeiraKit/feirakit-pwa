"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { ProductType } from "./productItem";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SelectCity } from "./selectCity";
import { FlatList } from "./flatlist";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchProductInput } from "./searchProductInput";

type Filters = {
  pageParam?: number;
  searchTerm?: string;
  selectedCity?: string;
};

async function fetcher({ pageParam, searchTerm, selectedCity }: Filters) {
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

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
    const cleanTerm = term.replace(/[{}[\]*()&#@%<>\\/|"'$^]/g, "");
    setSearchTerm(decodeURI(cleanTerm));
    params.delete("cidade");
    setSelectedCity("");
    if (term === "" || cleanTerm === "") {
      params.delete("nome");
      router.push(`?${params.toString()}`);
      return;
    }
    params.set("nome", encodeURIComponent(cleanTerm));

    router.push(`?${params.toString()}`);
  };

  const handleSearchCity = (city: string) => {
    setSelectedCity(city);
    params.delete("nome");
    if (city === "") {
      params.delete("cidade");
      router.push(`?${params.toString()}`);
      return;
    }
    params.set("cidade", city);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    if (data && data.pages.length > 0 && !isPending) {
      setProducts(data.pages.flat());
    }
  }, [data, isPending]);

  useEffect(() => {
    const city = searchParams.get("cidade");
    const searchTerm = searchParams.get("nome");

    if (city) {
      setSelectedCity(decodeURI(city));
      setSearchTerm("");
    }

    if (searchTerm) {
      setSearchTerm(decodeURI(searchTerm));
      setSelectedCity("");
    }
  }, [searchParams]);

  return (
    <>
      <div className="w-full flex items-center-safe justify-between max-w-lg gap-3">
        <SearchProductInput
          LeftIcon={<FaSearch />}
          value={searchTerm}
          onChange={handleSearchTerm}
          placeholder="Pesquisar"
        />
      </div>
      <SelectCity
        currentCity={selectedCity}
        setCurrentCity={handleSearchCity}
      />
      {error && (
        <div className="text-red-500">Ocorreu um erro: {error.message}</div>
      )}

      {isPending && <div className="text-black">Carregando...</div>}

      {data?.pages[0].length === 0 && !isPending && (
        <div className="mb-4 text-gray-700">
          {products.length} produto encontrado
        </div>
      )}

      {!isPending && !error && data?.pages[0].length !== 0 && (
        <FlatList
          products={products}
          isInfiniteScroll={searchTerm === "" && selectedCity === ""}
          isFetchingNextPage={isFetchingNextPage}
          sentinelRef={ref}
        />
      )}
    </>
  );
}
