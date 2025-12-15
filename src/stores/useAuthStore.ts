import { create } from "zustand";
import { persist } from "zustand/middleware";
type Endereco = {
  rua: string;
  numero: string;
  bairro: string;
  cep: string;
  complemento?: string;
  cidade: string;
  estado: string;
};

export type User = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: Endereco;
};

type AuthState = {
  usuario: User | null;
  token: string | null;
  setUsuario: (usuario: User | null) => void;
  setToken: (token: string | null) => void;
  isAuthenticated: () => boolean;
  validateSession: () => void;

  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      usuario: null,
      token: null,
      setUsuario: (usuario) => set({ usuario }),
      setToken: (token) => set({ token }),
      isAuthenticated: () => {
        const { token, usuario } = get();
        return !!token && !!usuario;
      },
      validateSession: () => {
        const { token, usuario, logout } = get();
        if (!token || !usuario) {
          logout();
        }
      },

      logout: async () => {
        await fetch("/api/logout", {
          method: "POST",
          credentials: "include",
        });
        set({ usuario: null, token: null });
      },
    }),
    {
      name: "auth-storage", // chave no localStorage
    }
  )
);
