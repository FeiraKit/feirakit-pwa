"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { toastWellcome } from "@/app/utils/toasthelper";

export function UseLoginToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const toastShownRef = useRef(false);
  useEffect(() => {
    const loginToast = searchParams.get("login");

    if (loginToast === "success" && !toastShownRef.current) {
      toastShownRef.current = true;
      toastWellcome();
      const params = new URLSearchParams(searchParams.toString());
      params.delete("login");
      router.replace(
        params.toString() ? `${pathname}?${params.toString()}` : pathname,
        { scroll: false }
      );
    }
  }, [searchParams, router, pathname]);

  return null;
}
