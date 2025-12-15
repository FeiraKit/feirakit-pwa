"use client";

import { Ref } from "react";
import { ProductItem, ProductType } from "./productItem";
import { Spin } from "@/app/components/loadings/skeleton";

type FlatListProps = {
  products: ProductType[];
  isInfiniteScroll: boolean;
  isFetchingNextPage?: boolean;
  sentinelRef?: Ref<HTMLDivElement> | null;
};
export function FlatList({
  products,
  isInfiniteScroll,
  sentinelRef,
  isFetchingNextPage,
}: FlatListProps) {
  return (
    <div className="w-full max-w-lg grid grid-cols-2 mt-4 mb-2  gap-2  flex-wrap overflow-y-auto h-full  pb-30 scrollbar-none  lg:grid-cols-3 lg:max-w-full lg:gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}

      {isInfiniteScroll && (
        <div
          ref={sentinelRef}
          className="w-full flex items-center justify-center h-10 -mt-2 col-span-2"
        >
          {isFetchingNextPage && (
            <Spin className="w-6 h-6 " custonBorder="border-fk-primary" />
          )}
        </div>
      )}
    </div>
  );
}
