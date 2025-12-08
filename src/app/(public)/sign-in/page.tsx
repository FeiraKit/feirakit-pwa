"use client";

import BaseButton from "@/app/components/baseButton";
import Input from "@/app/components/Input";
import {
  toastEmptyField,
  toastWellcome,
  toastWrongCredentials,
} from "@/app/utils/toasthelper";

import Link from "next/link";
import { useRef, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { Header } from "@/app/components/header";
import { useSignIn } from "@/hooks/users/useSignIn";

export default function SignIn() {
  const setUsuario = useAuthStore((state) => state.setUsuario);
  const setToken = useAuthStore((state) => state.setToken);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signIn = useSignIn();

  const HandleSignIn = async () => {
    if (!email) {
      emailRef.current?.focus();
      toastEmptyField("por favor, informe um email");
      return;
    }
    if (!password) {
      passwordRef.current?.focus();
      toastEmptyField("por favor, informe uma senha");
      return;
    }

    const credentials = { email, senha: password };

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
        toastWellcome();
        router.push("/");
      },
      onError: (e) => {
        console.log(e);

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

  return (
    <div className="flex flex-col justify-between  items-center min-h-dvh h-dvh max-h-dvh w-screen max-w-screen px-8 pt-2 pb-30 bg-fk-background/90">
      <Header showBackButton={false} />
      <section className="flex flex-col w-full">
        <h2 className="text-fk-primary font-extrabold text-xl ">Bem Vindo</h2>
        <Input
          LeftIcon={<FaUser />}
          ref={emailRef}
          placeholder="Digite seu email"
          divClass="mt-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          LeftIcon={<FaLock />}
          ref={passwordRef}
          placeholder="Digite sua senha"
          type="password"
          divClass="mb-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <span className="text-xs text-black">Esqueci minha senha</span> */}

        <BaseButton
          text="Entrar"
          className="mt-4"
          onClick={() => HandleSignIn()}
        />
        <Link
          href="/register"
          className="flex justify-center mt-2 text-fk-primary"
        >
          criar uma conta
        </Link>
      </section>

      <section className="w-full justify-center ">
        <Link
          href="/policy"
          className="flex justify-center mt-2 text-fk-primary"
        >
          Política de Privacidade
        </Link>
        <p className="text-center text-gray-400">Feira-Kit &copy; 2025</p>
      </section>
    </div>
  );
}
