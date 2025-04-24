import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { members } from "@/services/mock/members";
import { Member } from "@/services/mock/members";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: Member["role"];
  };
}

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
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
