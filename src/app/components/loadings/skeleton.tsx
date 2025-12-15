export function Skeleton({
  className = "",
  duration = "2.2s",
}: {
  className?: string;
  duration?: string;
}) {
  return (
    <div
      className={`skeleton-blue rounded-md ${className}`}
      style={{ ["--duration" as string]: duration }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg shadow-md overflow-hidden mb-4 p-2 pb-4 border-fk-primary/60 gap-2  flex flex-col w-full h-60 justify-between border">
      <Skeleton className="w-full h-3/6" duration="3.0s" />

      <div className="flex flex-col gap-1">
        <Skeleton
          className="object-cover w-2/3 h-6 rounded-sm "
          duration="3.0s"
        />

        <Skeleton
          className="object-cover w-full h-8 rounded-sm "
          duration="2.6s"
        />
      </div>
      <div>
        <Skeleton
          className="object-cover w-1/3 h-12 rounded-sm "
          duration="2.6s"
        />
      </div>
    </div>
  );
}

export function FeedSkeleton() {
  return (
    <div className="w-full max-w-lg grid grid-cols-2 mt-4 mb-2  gap-2  flex-wrap overflow-y-auto h-full  pb-30 scrollbar-none  lg:grid-cols-3 lg:max-w-full lg:gap-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

export function CreateProductSkeleton() {
  return (
    <div className="w-full max-w-lg flex flex-col mt-4 mb-2  gap-3  flex-wrap overflow-y-hidem h-dvh">
      <Skeleton className="w-2/3 h-8 self-center" />
      <Skeleton className="w-full h-12 self-center" duration="3.2s" />
      <Skeleton className="w-full h-12 self-center" duration="3.1s" />
      <Skeleton className="w-full h-12 self-center" duration="3.0s" />
      <Skeleton className="w-full h-12 self-center" duration="2.8s" />
      <Skeleton className="w-full h-12 self-center" duration="3.0s" />
      <Skeleton className="w-full h-12 self-center" duration="3.2s" />
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="w-full max-w-lg flex flex-col mt-12 mb-2  gap-3  flex-wrap overflow-y-hidem h-dvh">
      <Skeleton className="w-2/3 h-72 self-center" />
      <div className="flex w-full itens-center justify-center gap-2">
        <Skeleton className="w-12 h-12 self-center" duration="3.2s" />
        <Skeleton className="w-12 h-12 self-center" duration="3.0s" />
        <Skeleton className="w-12 h-12 self-center" duration="3.2s" />
        <Skeleton className="w-12 h-12 self-center" duration="3.4s" />
      </div>
      <div className="flex w-full itens-center justify-between gap-2">
        <Skeleton className="w-4/6 h-12 self-center" duration="3.2s" />
        <Skeleton className="w-2/6 h-12 self-center" duration="3.2s" />
      </div>
      <Skeleton className="w-full h-12 self-center" duration="3.2s" />
      <Skeleton
        className="flex w-full flex-1 self-center mt-1"
        duration="3.2s"
      />
    </div>
  );
}

export function MyProfileSkeleton() {
  return (
    <div className="w-full max-w-lg flex flex-col mt-4 mb-2  gap-3  flex-wrap overflow-y-hidem h-dvh">
      <div className="flex justify-between w-full">
        <Skeleton className="w-2/4 h-8" /> <Skeleton className="w-1/4 h-8" />
      </div>
      <Skeleton className="w-full h-12 self-center" duration="3.2s" />
      <Skeleton className="w-full h-12 self-center" duration="3.1s" />
      <Skeleton className="w-full h-12 self-center" duration="3.0s" />
      <Skeleton className="w-full h-12 self-center" duration="2.8s" />
      <Skeleton className="w-full h-12 self-center" duration="3.0s" />
      <Skeleton className="w-full h-12 self-center" duration="3.2s" />
    </div>
  );
}

export function Spin({
  className = "",
  custonBorder,
}: {
  className?: string;
  custonBorder?: string;
}) {
  const border = custonBorder
    ? custonBorder
    : "border-white   dark:border-white";
  return (
    <div
      className={`animate-spin rounded-full bg-transparent border-2 border-r-0 border-b-0   ${className} ${border}`}
    />
  );
}

export function SpinProgress({
  className = "",
}: {
  className?: string;
  complete?: boolean;
}) {
  return (
    <div
      className={`animate-spin rounded-full bg-transparent border-white border-4 border-dashed  dark:border-gray-700/50 ${className} transition-all duration-500`}
    />
  );
}
