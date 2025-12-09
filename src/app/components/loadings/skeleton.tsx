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
    <div className="w-full max-w-lg grid grid-cols-2 mt-4 mb-2  gap-2  flex-wrap overflow-y-auto h-full  pb-30 ">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
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
