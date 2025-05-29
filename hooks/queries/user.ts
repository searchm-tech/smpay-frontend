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
  postAgencyGroupMasterApi,
  postAgencyUserDirectApi,
  postAgencyUserEmailSendApi,
  getAdminAgencyUsersListApi,
  getGroupUserListApi,
  putAgencyUserStatusApi,
  delAgencyUserApi,
} from "@/services/user";
import type { ApiResponseData } from "@/services/types";
import type { TSMPayUser, TUserInfoResponse } from "@/types/user";

import type {
  TAgencyGroupMasterPostParams,
  TAgencyUserDeleteParams,
  TAgencyUserDirectPostParams,
  TAgencyUserEmailSendParams,
  TAdminAgencyUsersParams,
  TGroupUserParams,
  TAgencyUsersResponseWithNo,
  TAgencyUserStatusParams,
  TAgentsUsersPwParams,
  TMailVerifyParams,
  TMailVerifyUser,
  TUserInfoParams,
  TUserInfoPatchParams,
  TGroupUserResponse,
} from "@/types/api/user";

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
  options?: Partial<UseQueryOptions<TMailVerifyUser, Error>>
) => {
  return useQuery({
    queryKey: ["mailVerify", params],
    queryFn: () => getUsersMailVerifyApi(params),
    enabled: !!params.agentCode && !!params.userCode,
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
  options?: UseQueryOptions<TSMPayUser, Error>
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

// 관리자 : 대행사 최상위 그룹장 회원 가입(직접 등록) mutation
export const useMutationAgencyGroupMaster = (
  options?: UseMutationOptions<TSMPayUser, Error, TAgencyGroupMasterPostParams>
) => {
  return useMutation({
    mutationFn: (params: TAgencyGroupMasterPostParams) =>
      postAgencyGroupMasterApi(params),
    ...options,
  });
};

// 회원 직접 등록 mutation
export const useMutationAgencyUserDirect = (
  options?: UseMutationOptions<TSMPayUser, Error, TAgencyUserDirectPostParams>
) => {
  return useMutation({
    mutationFn: (params: TAgencyUserDirectPostParams) =>
      postAgencyUserDirectApi(params),
    ...options,
  });
};

// 회원 가입 메일 발송 mutation
export const useMutationAgencyUserEmailSend = (
  options?: UseMutationOptions<null, Error, TAgencyUserEmailSendParams>
) => {
  return useMutation({
    mutationFn: (params: TAgencyUserEmailSendParams) =>
      postAgencyUserEmailSendApi(params),
    ...options,
  });
};

// 대행사 회원 상태 변경 mutation
export const useMutationAgencyUserStatus = (
  options?: UseMutationOptions<null, Error, TAgencyUserStatusParams>
) => {
  return useMutation({
    mutationFn: (params: TAgencyUserStatusParams) =>
      putAgencyUserStatusApi(params),
    ...options,
  });
};

// 대행사 회원 삭제 mutation
export const useMutationAgencyUserDelete = (
  options?: UseMutationOptions<null, Error, TAgencyUserDeleteParams>
) => {
  return useMutation({
    mutationFn: (params: TAgencyUserDeleteParams) => delAgencyUserApi(params),
    ...options,
  });
};

// [시스템 관리자] 대행사 회원 목록 조회 query
export const useQueryAdminAgencyUsersList = (
  params: TAdminAgencyUsersParams,
  options?: UseQueryOptions<TAgencyUsersResponseWithNo, Error>
) => {
  return useQuery({
    queryKey: ["agencyUsersList", params],
    queryFn: () => getAdminAgencyUsersListApi(params),
    ...options,
  });
};

// 그룹장 회원 목록 조회 query
export const useQueryGroupUserList = (
  params: TGroupUserParams & { agentId: number; userId: number },
  options?: UseQueryOptions<TGroupUserResponse, Error>
) => {
  return useQuery({
    queryKey: ["groupUserList", params],
    queryFn: () => getGroupUserListApi(params),
    ...options,
  });
};
