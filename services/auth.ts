import { mockUserList } from "./mock/members";
import { post } from "@/lib/api";
import type { ApiResponse } from "@/types/api";

import type { TAuthUser, TUser } from "@/types/user";

// 실제 API 타입
import type {
  LoginRequest,
  LoginResponse as LoginResponseResult,
} from "@/types/auth";

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

// -------------- 실제 api -------------

// TODO : axios 변경할 예정
export const testLogin = async (
  params: LoginRequest
): Promise<LoginResponseResult> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log("testLogin", params);

  const data = mockUserList.find(
    (user) => user.loginId === params.email && user.password === params.password
  );

  if (!data) {
    console.log("존재하지 않는 이메일입니다.");
    throw new Error("존재하지 않는 이메일입니다.");
  }

  const response: LoginResponseResult = {
    user: {
      userId: data.userId,
      agentId: data.agentId,
      loginId: data.loginId,
      password: data.password,
      status: data.status,
      isDeleted: data.isDeleted,
      type: data.type,
      name: data.name,
      phoneNumber: data.phoneNumber,
      regDate: data.regDate,
      updateDate: data.updateDate,
    },
    accessToken: "mock-jwt-token-" + Math.random(),
    refreshToken: "mock-jwt-token-" + Math.random(),
  };
  return response;
};
