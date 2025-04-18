// store/useRoleStore.ts
import { create } from "zustand";

type TRole = "admin" | "agency";
interface RoleState {
  role: TRole; // string;
  setRole: (role: TRole) => void;
}

export const useRoleStore = create<RoleState>((set) => ({
  role: "admin",
  setRole: (role) => set({ role }),
}));
