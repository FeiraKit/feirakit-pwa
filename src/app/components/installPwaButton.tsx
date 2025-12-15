"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallPWAButton() {
  const pathname = usePathname();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;

    const seen = localStorage.getItem("feraKit_pwa_prompt");
    if (seen === "true") return;

    const handleBeforeInstallPrompt = (event: Event) => {
      const e = event as BeforeInstallPromptEvent;
      e.preventDefault();
      setDeferredPrompt(e);

      if (!window.matchMedia("(display-mode: standalone)").matches) {
        setMounted(true);
        requestAnimationFrame(() => setVisible(true));
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [pathname]);

  // Instalação do PWA
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    console.log(
      choiceResult.outcome === "accepted"
        ? "Usuário aceitou instalar"
        : "Usuário recusou instalar"
    );

    setDeferredPrompt(null);
    setVisible(false);
    localStorage.setItem("feraKit_pwa_prompt", "true");
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleReject = () => {
    setVisible(false);
    localStorage.setItem("feraKit_pwa_prompt", "true");
  };

  if (!mounted) return null;

  return (
    <div
      className={`bg-app-shadow text-fk-primary px-4 py-3 rounded-xl flex flex-col items-center gap-2 shadow-lg 
        fixed bottom-8 right-5 z-50 bg-fk-background
        transition-all duration-300 ease-out
        ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
      `}
    >
      <p className="text-md text-center font-bold">
        Quer ter acesso rápido ao Feira Kit?
      </p>

      <button
        onClick={handleClose}
        className="absolute -top-3 -right-3 w-6 h-6 border-2 rounded-full text-sm bg-fk-background"
      >
        ×
      </button>

      <button
        onClick={handleInstallClick}
        className="bg-fk-primary text-white font-bold px-4 py-2 rounded-lg shadow-md active:bg-app-yellow/60 transition w-full"
      >
        Instalar App
      </button>
      <button
        onClick={handleReject}
        className=" text-black font-bold px-2 py-1 pb-0 rounded-lg active:bg-app-yellow/60 transition w-full text-xs"
      >
        não mostrar novamente
      </button>
    </div>
  );
}
