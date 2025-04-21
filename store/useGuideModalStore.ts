import { create } from "zustand";

interface GuideModalState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useGuideModalStore = create<GuideModalState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
