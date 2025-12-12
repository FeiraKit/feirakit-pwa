"use client";

import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";

export default function BackButton({ backtoHome }: { backtoHome: boolean }) {
  const router = useRouter();

  const handleRedirect = () => {
    if (backtoHome) {
      router.push("/");
      return;
    }
    router.back();
  };

  return (
    <button
      className="flex w-10 h-10 rounded-full border-4 border-fk-primary items-center justify-center"
      onClick={handleRedirect}
    >
      <FaChevronLeft className="text-xl -ml-0.5 text-fk-primary" />
    </button>
  );
}
