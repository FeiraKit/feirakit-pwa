"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

export function AuthGuard() {
  const validateSession = useAuthStore((s) => s.validateSession);

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  return null;
}
