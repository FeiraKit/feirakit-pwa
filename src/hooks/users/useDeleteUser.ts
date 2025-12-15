"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "@/sevices/userService";
import { toastInfo, toastWrongCredentials } from "@/app/utils/toasthelper";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

export function useDeleteUser() {
  const router = useRouter();
  const logOut = useAuthStore((state) => state.logout);
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      logOut();
      toastInfo("Sentiremos sua falta, até breve");
      router.push("/");
    },
    onError: () => {
      toastWrongCredentials("tivemos um problema ao excluir o usuário");
    },
  });
}
