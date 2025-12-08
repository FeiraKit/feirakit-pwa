"use client";

import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/sevices/userService";
import { toastWellcome, toastWrongCredentials } from "@/app/utils/toasthelper";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

export function useUpdateUser() {
  const setUsuario = useAuthStore((state) => state.setUsuario);
  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: async (data) => {
      const login = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: data.token }),
      });

      const loginData = await login.json();
      if (!loginData.result) {
        toastWrongCredentials(
          "Desculpe, tivemos um problema ao verificar seus dados, tente novamente."
        );
        return;
      }

      setUsuario(data.usuario);
      setToken(data.token);
      toastWellcome();
      router.push("/");
    },
    onError: () => {
      toastWrongCredentials("tivemos um problema ao criar o usuário");
    },
  });
}
