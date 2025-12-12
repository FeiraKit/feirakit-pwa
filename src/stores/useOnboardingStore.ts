import { create } from "zustand";

interface OnboardingState {
  hasSeenOnboarding: boolean;
  hydrate: () => void;
  setHasSeenOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  hasSeenOnboarding: false,

  hydrate: () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("feraKit_hasSeenOnboarding");
      set({ hasSeenOnboarding: saved === "true" });
    }
  },

  setHasSeenOnboarding: () => {
    localStorage.setItem("feraKit_hasSeenOnboarding", "true");
    set({ hasSeenOnboarding: true });
  },
}));
