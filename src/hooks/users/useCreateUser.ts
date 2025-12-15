"use client";

import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/sevices/userService";
import { toastWrongCredentials } from "@/app/utils/toasthelper";
import { useAuthStore } from "@/stores/useAuthStore";

export function useCreateUser() {
  const setUsuario = useAuthStore((state) => state.setUsuario);
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: createUser,
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
      window.location.href = "/?login=success";
    },
    onError: () => {
      toastWrongCredentials("tivemos um problema ao criar o usuário");
    },
  });
}
