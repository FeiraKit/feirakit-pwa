"use client";

import BaseButton from "@/app/components/baseButton";
import Input from "@/app/components/Input";
import {
  toastEmptyField,
  toastInfo,
  toastWellcome,
  toastWrongCredentials,
} from "@/app/utils/toasthelper";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { Header } from "@/app/components/header";
import { useSignIn } from "@/hooks/users/useSignIn";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { OnBoarding } from "../onBoarding/OnBoarding";

export default function SignIn() {
  const { hasSeenOnboarding, hydrate } = useOnboardingStore();
  const [hydrated, setHydrated] = useState(false);
  const setUsuario = useAuthStore((state) => state.setUsuario);
  const setToken = useAuthStore((state) => state.setToken);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signIn = useSignIn();

  const HandleSignIn = async () => {
    setIsLoading(true);
    if (!email) {
      emailRef.current?.focus();
      toastEmptyField("por favor, informe um email");
      setIsLoading(false);
      return;
    }
    if (!password) {
      passwordRef.current?.focus();
      toastEmptyField("por favor, informe uma senha");
      setIsLoading(false);
      return;
    }

    const credentials = { email, senha: password };
    if (!navigator.onLine) {
      toastInfo("verifique sua conexão com a internet e tente novamente");
      setIsLoading(false);
      return;
    }

    signIn.mutate(credentials, {
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
        //persistir usuario no store
        setUsuario(data.usuario);
        setToken(data.token);
        setIsLoading(false);
        toastWellcome();
        window.location.href = "/";
      },
      onError: (e) => {
        console.log(e);
        setIsLoading(false);
        if (e.message === "Email não cadastrado") {
          emailRef.current?.focus();
          toastEmptyField("Não encontramos uma conta com esse e-mail.");
          return;
        }

        if (e.message === "Senha inválida") {
          passwordRef.current?.focus();
          toastEmptyField("A senha informada está incorreta.");
          return;
        }

        if (
          e.message ===
          "Não foi possível conectar ao servidor. Verifique sua internet."
        ) {
          emailRef.current?.focus();
          toastEmptyField(e.message);
          return;
        }

        toastWrongCredentials(
          "Não foi possivel conectar ao servidor, tente novamente mais tarde"
        );
      },
    });
  };

  useEffect(() => {
    hydrate();
    setHydrated(true);
  }, [hydrate]);

  if (!hydrated) return null;

  if (!hasSeenOnboarding) {
    return <OnBoarding />;
  }

  return (
    <div className="flex flex-col min-h-dvh h-dvh bg-fk-background/90 w-screen px-6">
      <section className="flex flex-col flex-1 items-center justify-center w-full ">
        <Header showBackButton={false} />

        <h2 className="text-fk-primary font-extrabold text-xl ">Bem Vindo</h2>
        <Input
          LeftIcon={<FaUser />}
          ref={emailRef}
          placeholder="Digite seu email"
          divClass="mt-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              passwordRef.current?.focus();
            }
          }}
        />
        <Input
          LeftIcon={<FaLock />}
          ref={passwordRef}
          placeholder="Digite sua senha"
          type="password"
          divClass="mb-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              HandleSignIn();
            }
          }}
        />
        {/* <span className="text-xs text-black">Esqueci minha senha</span> */}

        <BaseButton
          text="Entrar"
          isLoading={isLoading}
          className="mt-4"
          onClick={() => HandleSignIn()}
          disabled={isLoading}
        />

        <Link
          href="/register"
          className="flex justify-center mt-2 text-fk-primary"
        >
          criar uma conta
        </Link>
      </section>

      <footer className="w-full justify-center self-end-safe px-6 pb-4">
        <Link
          href="/policy"
          className="flex justify-center mt-2 text-fk-primary"
        >
          Política de Privacidade
        </Link>
        <p className="text-center text-gray-400">Feira-Kit &copy; 2025</p>
      </footer>
    </div>
  );
}
