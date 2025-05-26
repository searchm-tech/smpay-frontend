// /store/sessionStore.ts
import { create } from "zustand";

interface SessionState {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  clearSession: () => void;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  refreshToken:
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
  setAccessToken: (token) => {
    set({ accessToken: token });
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("accessToken", token);
      } else {
        localStorage.removeItem("accessToken");
      }
    }
  },
  setRefreshToken: (token) => {
    set({ refreshToken: token });
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("refreshToken", token);
      } else {
        localStorage.removeItem("refreshToken");
      }
    }
  },
  clearSession: () => {
    set({ accessToken: null, refreshToken: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },
  setTokens: (accessToken, refreshToken) => {
    set({ accessToken, refreshToken });
    if (typeof window !== "undefined") {
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      } else {
        localStorage.removeItem("accessToken");
      }
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      } else {
        localStorage.removeItem("refreshToken");
      }
    }
  },
}));
