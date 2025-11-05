"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useDrawer } from "@/stores/useDrawer";

import {
  FaHome,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { FaBoxesStacked, FaChartLine } from "react-icons/fa6";
import { DrawerItem } from "./drawerItem";
import { toastGoodBye } from "@/app/utils/toasthelper";

import { useRouter } from "next/navigation";

const DrawerLinks = [
  {
    key: 1,
    url: "/",
    icon: <FaHome className="h-6 w-6" />,
    Label: "Início",
  },
  {
    key: 2,
    url: "/myproducts",
    icon: <FaBoxesStacked className="h-6 w-6" />,
    Label: "Meus Produtos",
  },
  {
    key: 3,
    url: "/dashboard",
    icon: <FaChartLine className="h-6 w-6" />,
    Label: "Relatórios",
  },
  {
    key: 4,
    url: "/myaccount",
    icon: <FaUserCircle className="h-6 w-6" />,
    Label: "Meu perfil",
  },
  {
    key: 5,
    url: "/about",
    icon: <FaQuestionCircle className="h-6 w-6" />,
    Label: "Sobre o Feira Kit",
  },
];

const handleLogout = async () => {
  try {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include", // inclui cookies na requisição
    });
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    alert("Ocorreu um erro ao sair. Tente novamente.");
  }
};

export function DrawerMenu() {
  const { open, toggleDrawer } = useDrawer();
  const user = useAuthStore((state) => state.usuario);
  const router = useRouter();
  const logOut = useAuthStore((state) => state.logout);
  if (!open || !user) return null;

  const currentUserName =
    user.nome.split(" ")[0] + " " + user.nome.split(" ")[1];

  const handleOnClickLogOut = async () => {
    const confirmLogOut = window.confirm("Tem certeza que deseja sair? ");
    if (confirmLogOut) {
      await handleLogout();

      router.refresh();
      toastGoodBye();
      logOut();
    }
  };

  return (
    <>
      {/* Overlay (fundo escuro clicável) */}
      <div
        className="fixed inset-0 bg-black/40"
        onClick={toggleDrawer}
        aria-hidden="true"
      />
      <div
        className={`flex flex-col fixed top-0 right-0 h-screen max-h-screen bg-fk-background text-white w-2/3  transition-transform duration-300   ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-12 bg-fk-green/60 px-4 pb-4 flex flex-col  gap-2">
          <FaUserCircle className="h-16 w-16 text-fk-background" />
          <p className="font-bold text-xl">{currentUserName}</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {DrawerLinks.map((item) => (
            <DrawerItem
              key={item.key}
              Icon={item.icon}
              label={item.Label}
              url={item.url}
            />
          ))}
        </nav>

        <div className="border-t-2 border-gray-700 ">
          <button className="flex justify-center" onClick={handleOnClickLogOut}>
            <p className="p-4 text-gray-700 active:text-fk-primary/60">
              <FaSignOutAlt className="inline mr-2 h-6 w-6 text-red-900" />
              Sair
            </p>
          </button>
          <div className="flex flex-col justify-center items-center gap-1 pb-4 ">
            <p className="text-2xl text-gray-400/50 font-bold">FeiraKIt</p>
            <p className="text-lg text-gray-400/50 font-bold">1.0.0</p>
          </div>
        </div>
      </div>
    </>
  );
}
