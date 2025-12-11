"use client";
import { useDrawer } from "@/stores/useDrawer";
import Link from "next/link";
import { useRouter } from "next/navigation";

type DrawerItemProps = {
  label: string;
  Icon: React.ReactNode;
  url: string;
  active: boolean;
};

export function DrawerItem({ label, Icon, url, active }: DrawerItemProps) {
  const { toggleDrawer } = useDrawer();
  const router = useRouter();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    router.push(url);
    setTimeout(() => {
      toggleDrawer();
    }, 200);
  }
  return (
    <Link
      href={url}
      onClick={handleClick}
      className={`flex py-2 px-2  rounded text-xl transition-all duration-200${
        active
          ? "text-gray-50  hover:text-gray-700 bg-fk-green/60"
          : " text-gray-700   hover:bg-fk-green/60 hover:text-gray-50 "
      }`}
    >
      {Icon}
      <span className="ml-3">{label}</span>
    </Link>
  );
}
