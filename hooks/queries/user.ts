import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import {
  getUsersMailVerifyApi,
  postAgentsUsersPwApi,
  postUsersPasswordResetApi,
  getUserInfoApi,
  getAdminUserInfoApi,
  patchUserInfoApi,
  postAgencyUserApi,
  type TMailVerifyParams,
  type TAgentsUsersPwParams,
  type TUserInfoParams,
  type TUserInfoPatchParams,
  type TAgencyUserPostParams,
} from "@/services/user";
import type { ApiResponseData } from "@/services/types";
import type {
  TAdminUserInfoResponse,
  TMailVerifyUser,
  TUserInfoResponse,
} from "@/types/user";

// 비밀번호 재설정 API - 링크 전달 mutation
export const useMutationPwdResetLink = (
  options?: UseMutationOptions<ApiResponseData<null>, Error, string>
) => {
  return useMutation({
    mutationFn: (email: string) => postUsersPasswordResetApi(email),
    ...options,
  });
};

// 대행사 회원 메일 인증 코드 확인 query
export const useQueryMailVerify = (
  params: TMailVerifyParams,
  options?: UseQueryOptions<TMailVerifyUser, Error>
) => {
  return useQuery({
    queryKey: ["mailVerify", params],
    queryFn: () => getUsersMailVerifyApi(params),
    ...options,
  });
};

// 대행사 비밀번호 설정 또는 비밀번호 재설정 mutation
export const useMutationAgentsUsersPw = (
  options?: UseMutationOptions<null, Error, TAgentsUsersPwParams>
) => {
  return useMutation({
    mutationFn: (params: TAgentsUsersPwParams) => postAgentsUsersPwApi(params),
    ...options,
  });
};

// 회원 정보 조회 query
export const useQueryUserInfo = (
  params: TUserInfoParams & { isAdmin: boolean },
  options?: UseQueryOptions<TUserInfoResponse, Error>
) => {
  return useQuery({
    queryKey: ["userInfo", params],
    queryFn: () => getUserInfoApi(params),
    enabled: !!params.agentId && !!params.userId && !params.isAdmin,
    ...options,
  });
};

// 관리자 회원 정보 조회 query
export const useQueryAdminUserInfo = (
  params: { userId: number; isAdmin: boolean },
  options?: UseQueryOptions<TAdminUserInfoResponse, Error>
) => {
  return useQuery({
    queryKey: ["adminUserInfo", params],
    queryFn: () => getAdminUserInfoApi(params.userId),
    enabled: !!params.userId && params.isAdmin,
    ...options,
  });
};

// 기본 정보 변경 mutation
export const useMutationUserInfo = (
  options?: UseMutationOptions<null, Error, TUserInfoPatchParams>
) => {
  return useMutation({
    mutationFn: (params: TUserInfoPatchParams) => patchUserInfoApi(params),
    ...options,
  });
};

// 관리자 : 대행사 최상위 그룹장 회원 가입(직접 등록)
export const useMutationAgencyUser = (
  options?: UseMutationOptions<
    TAdminUserInfoResponse,
    Error,
    TAgencyUserPostParams
  >
) => {
  return useMutation({
    mutationFn: (params: TAgencyUserPostParams) => postAgencyUserApi(params),
    ...options,
  });
};
