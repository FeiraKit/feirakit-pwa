"use client";

import BaseButton from "@/app/components/baseButton";
import Input from "@/app/components/Input";
import {
  toastEmptyField,
  toastWrongCredentials,
} from "@/app/utils/toasthelper";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export default function SignIn() {
  const setUsuario = useAuthStore((state) => state.setUsuario);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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

    try {
      const res = await fetch("api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.result && data.message == "Email não cadastrado") {
        emailRef.current?.focus();
        toastEmptyField("Não encontramos uma conta com esse e-mail.");
        return;
      }

      if (!data.result && data.message == "Senha inválida") {
        passwordRef.current?.focus();
        toastEmptyField("A senha informada está incorreta.");
        return;
      }
      //persistir usuario no store
      setUsuario(data.user);
      router.push("/");

      console.log(data);
    } catch (e) {
      toastWrongCredentials(
        "Não foi possivel conectar ao servidor, tente novamente mais tarde"
      );
    }
  };

  return (
    <div className="flex flex-col font-sans items-center justify-items-center min-h-screen max-h-screen p-8 pb-20 gap-16 sm:p-20 justify-around">
      <Image
        className="drop-shadow-md contrast-125"
        src="/logo.png"
        alt="Feira Kit"
        width={180}
        height={38}
        priority
      />
      <section className="flex flex-col w-full -mt-20">
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
        <span className="text-xs">Esqueci minha senha</span>

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

      <section className="w-full justify-center -mb-10 ">
        <Link
          href="/register"
          className="flex justify-center mt-2 text-fk-primary"
        >
          Política de Privacidade
        </Link>
        <p className="text-center text-gray-400">Feira-Kit &copy; 2025</p>
      </section>
    </div>
  );
}
