export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-300/50 dark:bg-gray-700/50 ${className}`}
    />
  );
}

export function Spin({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-spin rounded-full bg-transparent border-white border-2 border-r-0 border-b-0  dark:border-white ${className}`}
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
