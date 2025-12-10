"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { ProductType } from "./productItem";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SelectCity } from "../../../components/selectCity";
import { FlatList } from "./flatlist";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchProductInput } from "./searchProductInput";
import { ErrorMessage } from "@/app/components/errorMessage";
import { fetcher } from "@/sevices/utils/feedFetcher";
import { FeedSkeleton } from "@/app/components/loadings/skeleton";
import { NoResults } from "@/app/components/noResults";

export function Feed() {
  const { ref, inView } = useInView();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { data, error, fetchNextPage, isFetchingNextPage, isPending } =
    useInfiniteQuery({
      queryKey: ["PRODUCTS", { searchTerm, selectedCity }],
      queryFn: ({ pageParam }) =>
        fetcher({ pageParam, searchTerm, selectedCity }),
      initialPageParam: 1,
      retry: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length > 0 ? allPages.length + 1 : undefined;
      },
      enabled: isOnline,
    });

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

  useEffect(() => {
    if (!isOnline) return;
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetchingNextPage, isOnline]);

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

  const getUrlSearchCity = (city: string) => {
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
        setCurrentCity={getUrlSearchCity}
      />
      {!isOnline && <ErrorMessage message={"sem conexão com a internet"} />}
      {error && isOnline && <ErrorMessage message={error.message} />}

      {isPending && isOnline && <FeedSkeleton />}

      {data?.pages[0].length === 0 && !isPending && <NoResults />}

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
