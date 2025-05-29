import { ApiError, del, get, patch, post, put } from "@/lib/api";
import type { ApiResponseData } from "./types";
import type {
  TAdminUserInfoResponse,
  TUserInfoResponse,
  UserStatus,
} from "@/types/user";
import type { AgencyData } from "./agency";
import type {
  TAgencyGroupMasterPostParams,
  TAgencyUserDirectPostParams,
  TAgencyUserEmailParams,
  TAgencyUserEmailSendParams,
  TAgencyUsersParams,
  TAgencyUsersResponse,
  TAgencyUsersResponseWithNo,
  TAgencyUserStatusParams,
  TAgentsUsersPwParams,
  TMailVerifyParams,
  TMailVerifyUser,
  TUserInfoParams,
  TUserInfoPatchParams,
} from "@/types/api/user";

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

// 회원 정보 조회
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

// 관리자 회원 정보 조회
export const getAdminUserInfoApi = async (
  userId: number
): Promise<TAdminUserInfoResponse> => {
  try {
    const response = await get<TAdminUserInfoResponse>(
      `/admin/api/v1/agents/users/${userId}/me`
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 회원 이름 중복 체크 [id 중복 체크]
export const getUsersNameCheckApi = async (
  loginId: string
): Promise<boolean> => {
  try {
    const response = await get<boolean>(
      `api/v1/users/name-duplicate?loginId=${loginId}`
    );

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 기본 정보 변경 API (U004)
export const patchUserInfoApi = async (
  params: TUserInfoPatchParams
): Promise<null> => {
  const { userId, name, emailAddress, phoneNumber } = params;
  try {
    const response = await patch<null>(`/api/v1/users/${userId}/profile`, {
      name,
      emailAddress,
      phoneNumber,
    });
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// [관리자] 대행사 최상위 그룹장 회원 초대 메일 발송 (AAG013) API

export async function postAgencyUserEmailApi(
  params: TAgencyUserEmailParams
): Promise<AgencyData | null> {
  try {
    const response: AgencyData = await post(
      "/admin/api/v1/agents/users/email",
      params
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
}

// [관리자] 대행사 최상위 그룹장 회원 가입 (직접 등록) (AAG005) API
export const postAgencyGroupMasterApi = async (
  params: TAgencyGroupMasterPostParams
): Promise<TAdminUserInfoResponse> => {
  try {
    const response = await post<TAdminUserInfoResponse>(
      `/admin/api/v1/agents/${params.agentId}/users`,
      params
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 회원 직접 등록 API (SAG007)

export const postAgencyUserDirectApi = async (
  params: TAgencyUserDirectPostParams
): Promise<TAdminUserInfoResponse> => {
  try {
    const response = await post<TAdminUserInfoResponse>(
      `/service/api/v1/agents/${params.agentId}/users`,
      params
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 회원 가입 메일 발송 API (SAG006)
export const postAgencyUserEmailSendApi = async (
  params: TAgencyUserEmailSendParams
): Promise<null> => {
  try {
    const response = await post<null>(
      `/service/api/v1/agents/${params.agentId}/users/email`,
      params
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 대행사 회원 목록 조회 API (AAG006)
export const getAgencyUsersListApi = async (
  params: TAgencyUsersParams
): Promise<TAgencyUsersResponseWithNo> => {
  try {
    // URL 파라미터 인코딩
    const encodedKeyword = encodeURIComponent(params.keyword);

    const response = await get<TAgencyUsersResponse>(
      `/admin/api/v1/agents/users?page=${params.page}&size=${params.size}&keyword=${encodedKeyword}&orderType=${params.orderType}`
    );

    const result: TAgencyUsersResponseWithNo = {
      ...response,
      content: response.content.map((user, index) => ({
        ...user,
        id: ((params.page - 1) * params.size + index + 1).toString(), // 페이지네이션을 고려한 번호
      })),
    };

    return result;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 대행사 회원 상태 변경 API (AAG007)
export const putAgencyUserStatusApi = async (
  params: TAgencyUserStatusParams
): Promise<null> => {
  try {
    const { userId, agentId, status } = params;
    const response = await put<null>(
      `/admin/api/v1/agents/${agentId}/users/${userId}/status?status=${status}`
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 대행사 회원 삭제 API (AAG008)
export const delAgencyUserApi = async (params: {
  userId: number;
  agentId: number;
}): Promise<null> => {
  try {
    const response = await del<null>(
      `/admin/api/v1/agents/${params.agentId}/users/${params.userId}`
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};
