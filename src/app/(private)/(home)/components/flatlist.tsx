"use client";

import { Ref } from "react";
import { ProductItem, ProductType } from "./productItem";

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
    <div className="w-full max-w-lg grid grid-cols-2 mt-4 mb-2  gap-2  flex-wrap overflow-y-auto h-full  pb-30">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}

      {isInfiniteScroll && (
        <div ref={sentinelRef} className="w-full h-10">
          {isFetchingNextPage && <p>carregando mais</p>}
        </div>
      )}
    </div>
  );
}
