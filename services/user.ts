import { ApiError, get, post } from "@/lib/api";
import type { ApiResponseData } from "./types";
import type {
  TMailVerifyUser,
  TResetPwdType,
  TSignUpMailVerifyResponse,
  TUserInfoResponse,
} from "@/types/user";

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

// 대행사 비밀번호 설정 또는 비밀번호 재설정 API
export type TAgentsUsersPwParams = {
  agentId: number;
  userId: number;
  password: string;
  phone: string;
  type: TResetPwdType;
};

export const postAgentsUsersPwApi = async (
  params: TAgentsUsersPwParams
): Promise<null> => {
  const { agentId, userId, password, phone, type } = params;
  try {
    const response = await post<null>(
      `/api/v1/agents/${agentId}/users/${userId}/password`,
      { password, phoneNumber: phone, type }
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 회원 정보 조회 API
export type TUserInfoParams = {
  agentId: number;
  userId: number;
};
export const getUserInfoApi = async (
  params: TUserInfoParams
): Promise<TUserInfoResponse> => {
  try {
    const { agentId, userId } = params;
    const response = await get<TUserInfoResponse>(
      `/service/api/v1/agents/${agentId}/users/${userId}/me`
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};
