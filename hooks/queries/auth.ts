import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { login } from "@/services/auth";
import { useUserStore } from "@/store/useUserStore";
import type { TUser } from "@/types/user";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: TUser;
}

export const userSignIn = () => {
  const router = useRouter();
  const { setUser, setToken } = useUserStore();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);

      router.push("/sm-pay/management");
    },
    onError: (error: Error) => {
      console.error("Login error:", error.message);
    },
  });
};
