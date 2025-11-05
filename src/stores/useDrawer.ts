"use client";

import { create } from "zustand";

interface DrawerState {
  open: boolean;
  toggleDrawer: () => void;
}

export const useDrawer = create<DrawerState>((set) => ({
  open: false,
  toggleDrawer: () => set((state) => ({ open: !state.open })),
}));
