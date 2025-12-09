"use client";

import { useMutation } from "@tanstack/react-query";
import { checkEmailAlreadyUsed } from "@/sevices/userService";

export function useVerifyEmail() {
  return useMutation({
    mutationFn: checkEmailAlreadyUsed,
  });
}
