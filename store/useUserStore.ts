import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TUser } from "@/types/user";

interface UserState {
  user: TUser | null;
  token: string | null;
  setUser: (user: TUser | null) => void;
  setToken: (token: string | null) => void;
  clearStore: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      clearStore: () => set({ user: null, token: null }),
    }),
    {
      name: "user-storage", // 로컬스토리지에 저장될 키 이름
    }
  )
);
