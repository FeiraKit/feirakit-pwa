"use client";
import { useDrawer } from "@/stores/useDrawer";
import { FaBars } from "react-icons/fa6";

export function DrawerButton() {
  const { toggleDrawer } = useDrawer();
  return (
    <button
      className="text-fk-primary active:text-fk-primary/40 absolute right-0 "
      onClick={toggleDrawer}
    >
      <FaBars className="h-8 w-8" />
    </button>
  );
}
