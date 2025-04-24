import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { TUser } from "@/types/user";
import { useUserStore } from "@/store/useUserStore";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: TUser;
}

export const useLogin = () => {
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

export const userSignIn = () => {
  return useMutation({
    mutationFn: login,
  });
};
