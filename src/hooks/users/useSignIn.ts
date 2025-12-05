"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/sevices/userService";

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
  });
}
