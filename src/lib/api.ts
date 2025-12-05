import { useAuthStore } from "@/stores/useAuthStore";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function api<T = unknown>(
  path: string,
  options: RequestInit = {}
) {
  const token = useAuthStore.getState().token;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(body.mensagem || "Erro desconhecido na API");
  }

  return body as T;
}
