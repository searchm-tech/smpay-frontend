import { ApiError, del, get, patch, post, put } from "@/lib/api";
import { buildQueryParams } from "@/lib/utils";
import type { ApiResponseData } from "./types";
import type { TSMPayUser, TUserInfoResponse } from "@/types/user";

import type {
  RequestAgencyGroupMasterDirect,
  RequestMemberDirect,
  RequestGroupMasterInvite,
  RequestSignupEmail,
  RequestAgencyUsers,
  GroupUserDtoParams,
  ResponseAgencyUsers,
  ResponseAgencyUsersWithNo,
  RequestAgencyUserStatus,
  RequestUserPwd,
  RequestMailVerify,
  ResponseMailVerify,
  RequestUserInfo,
  RequestPatchUserInfo,
  ResponseGroupUser,
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
  params: RequestMailVerify
): Promise<ResponseMailVerify> => {
  const queryParams = buildQueryParams({
    agentCode: params.agentCode,
    userCode: params.userCode,
  });
  try {
    const response = await get<ResponseMailVerify>(
      `/api/v1/agents/users/mail-verifications?${queryParams}`
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
  params: RequestUserPwd
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

// 회원 정보 조회 (SAG001)
export const getUserInfoApi = async (
  params: RequestUserInfo
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

// 관리자 본인 회원 정보 조회 (AAG016)
export const getAdminUserInfoApi = async (
  userId: number
): Promise<TSMPayUser> => {
  try {
    const response = await get<TSMPayUser>(
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
  params: RequestPatchUserInfo
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
  params: RequestGroupMasterInvite
): Promise<null> {
  try {
    const response: null = await post(
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
  params: RequestAgencyGroupMasterDirect
): Promise<TSMPayUser> => {
  try {
    const response = await post<TSMPayUser>(
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
  params: RequestMemberDirect
): Promise<TSMPayUser> => {
  try {
    const response = await post<TSMPayUser>(
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
  params: RequestSignupEmail
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

// [시스템 관리자] 대행사 회원 목록 조회 API (AAG006)
export const getAdminAgencyUsersListApi = async (
  params: RequestAgencyUsers
): Promise<ResponseAgencyUsersWithNo> => {
  try {
    // NO_DESC나 NO_ASC인 경우 실제 API 정렬은 REGISTER_DT_DESC로 고정
    const isNoSort =
      params.orderType === "NO_DESC" || params.orderType === "NO_ASC";
    const apiOrderType = isNoSort ? "REGISTER_DT_DESC" : params.orderType;

    const queryParams = buildQueryParams({
      page: params.page,
      size: params.size,
      keyword: params.keyword,
      orderType: apiOrderType,
    });

    const response = await get<ResponseAgencyUsers>(
      `/admin/api/v1/agents/users?${queryParams}`
    );

    let content = response.content.map((user, index) => ({
      ...user,
      id: ((params.page - 1) * params.size + index + 1).toString(), // 페이지네이션을 고려한 번호
    }));

    // NO_ASC인 경우 배열을 reverse하여 번호 순서 변경
    if (params.orderType === "NO_ASC") {
      content = content.reverse();
    }

    const result: ResponseAgencyUsersWithNo = {
      ...response,
      content,
    };

    return result;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 그룹장 회원 목록 조회 API (AAG007)
export const getGroupUserListApi = async (
  params: GroupUserDtoParams & { agentId: number; userId: number }
): Promise<ResponseGroupUser> => {
  try {
    const { agentId, userId } = params;

    const queryParams = buildQueryParams({
      page: params.page,
      size: params.size,
      keyword: params.keyword,
      orderType: params.orderType,
    });

    const response = await get<ResponseGroupUser>(
      `/service/api/v1/agents/${agentId}/users/${userId}/subordinate-departments-users?${queryParams}`
    );

    const result: ResponseGroupUser = {
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
  params: RequestAgencyUserStatus
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
