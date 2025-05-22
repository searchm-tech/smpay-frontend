import { ApiError, get, post } from "@/lib/api";
import type { ApiResponseData } from "./types";
import type { TMailVerifyUser, TSignUpMailVerifyResponse } from "@/types/user";

// ----------------- 실제 API 호출 -----------------

// 비밀번호 재설정 API
export const postUsersPasswordResetApi = async (
  email: string
): Promise<ApiResponseData<null>> => {
  try {
    const response = await post<ApiResponseData<null>>(
      "/api/v1/users/password-reset",
      { loginId: email }
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 대행사 회원 메일 인증 코드 확인 API
export type TMailVerifyParams = {
  agentCode: string;
  userCode: string;
};
export const getUsersMailVerifyApi = async (
  params: TMailVerifyParams
): Promise<TMailVerifyUser> => {
  try {
    const response = await get<TMailVerifyUser>(
      `/api/v1/agents/users/mail-verifications?agentCode=${params.agentCode}&userCode=${params.userCode}`
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 대행사 최상위 그룹장 회원 가입(메일 통한) API
export type TSignUpMailVerifyParams = {
  agentId: number;
  userId: number;
  password: string;
  phone: string;
};

export const postAgentsUsersSignUpApi = async (
  params: TSignUpMailVerifyParams
): Promise<TSignUpMailVerifyResponse> => {
  const { agentId, userId, password, phone } = params;
  try {
    const response = await post<TSignUpMailVerifyResponse>(
      `/admin/api/v1/agents/${agentId}/users/${userId}`,
      { password, phoneNumber: phone }
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};
