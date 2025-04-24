import { TUser } from "@/types/user";
import { members } from "./mock/members";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: TUser;
}

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  // 3초 지연
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // members에서 이메일로 사용자 찾기
  const user = members.find((member) => member.email === credentials.email);

  if (!user) {
    throw new Error("존재하지 않는 이메일입니다.");
  }

  // 비밀번호 확인
  if (user.password !== credentials.password) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  const result: LoginResponse = {
    token: "mock-jwt-token-" + Math.random(),
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      token: "mock-jwt-token-" + Math.random(),
    },
  };

  // 로그인 성공 시 토큰과 사용자 정보 반환
  return result;
};
