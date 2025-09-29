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

type User = {
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
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      usuario: null,
      token: null,
      setUsuario: (usuario) => set({ usuario }),
      setToken: (token) => set({ token }),
      logout: () => set({ usuario: null, token: null }),
    }),
    {
      name: "auth-storage", // chave no localStorage
    }
  )
);
