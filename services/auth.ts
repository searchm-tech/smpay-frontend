import { members, TRole } from "./mock/members";
import { post } from "@/lib/api";
import type { ApiResponse } from "@/types/api";

import type { TAuthUser, TUser } from "@/types/user";

// 실제 API 타입
import type {
  LoginRequest,
  TUser as TUserResult,
  LoginResponse as LoginResponseResult,
} from "@/types/auth";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
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
    accessToken: "mock-jwt-token-" + Math.random(),
    refreshToken: "mock-jwt-token-" + Math.random(),
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as TRole,
      token: "mock-jwt-token-" + Math.random(),
    },
  };

  // 로그인 성공 시 토큰과 사용자 정보 반환
  return result;
};

// 로그인 api
type LoginParams = {
  email: string;
  password: string;
};

export const getUser = async (params: LoginParams): Promise<TAuthUser> => {
  console.log("3. params", params);
  const response: ApiResponse<TAuthUser> = await post<TAuthUser>(
    "/users/login",
    params
  );

  return response.result;
};

export const testLogin = async (
  params: LoginRequest
): Promise<LoginResponseResult> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = TEST_USER;
  return response;
};

const TEST_USER: LoginResponseResult = {
  user: {
    userId: 1,
    agentId: 1,
    id: "아이디",
    email: "이메일",
    password: "비밀번호",
    status: "NORMAL",
    type: "ADVERTISER",
    name: "이름",
    phoneNumber: "전화번호",
  },
  accessToken: "토큰 값",
  refreshToken: "토큰 값",
};
