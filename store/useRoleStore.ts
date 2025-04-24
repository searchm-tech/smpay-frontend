// store/useRoleStore.ts
import { create } from "zustand";

export type TRole = "admin" | "agency";

interface RoleState {
  role: TRole; // string;
  setRole: (role: TRole) => void;
}

// TODO : 불필요할 경우 제거
export const useRoleStore = create<RoleState>((set) => ({
  role: "admin",
  setRole: (role) => set({ role }),
}));
