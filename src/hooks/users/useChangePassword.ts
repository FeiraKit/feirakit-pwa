"use client";

import { useMutation } from "@tanstack/react-query";

import {
  toastGenericSucces,
  toastWrongCredentials,
} from "@/app/utils/toasthelper";

import { useRouter } from "next/navigation";
import { changePassword } from "@/sevices/userService";

export function useChangePassword() {
  const router = useRouter();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: async (data) => {
      toastGenericSucces(data.mensagem);
      router.push("/myprofile");
    },
    onError: (e) => {
      toastWrongCredentials(e.message);
    },
  });
}
