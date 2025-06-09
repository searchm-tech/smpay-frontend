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
  RequestAgencyGroupMasterDirect,
  RequestAgencyUserDelete,
  RequestMemberDirect,
  RequestSignupEmail,
  RequestAgencyUsers,
  GroupUserDtoParams,
  ResponseAgencyUsersWithNo,
  RequestAgencyUserStatus,
  RequestUserPwd,
  RequestMailVerify,
  ResponseMailVerify,
  RequestUserInfo,
  RequestPatchUserInfo,
  ResponseGroupUser,
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
  params: RequestMailVerify,
  options?: Partial<UseQueryOptions<ResponseMailVerify, Error>>
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
  options?: UseMutationOptions<null, Error, RequestUserPwd>
) => {
  return useMutation({
    mutationFn: (params: RequestUserPwd) => postAgentsUsersPwApi(params),
    ...options,
  });
};

// 회원 정보 조회 (SAG001) query
export const useQueryUserInfo = (
  params: RequestUserInfo,
  options?: UseQueryOptions<TUserInfoResponse, Error>
) => {
  return useQuery({
    queryKey: ["userInfo", params],
    queryFn: () => getUserInfoApi(params),
    enabled: !!params.agentId && !!params.userId,
    ...options,
  });
};

// 관리자 회원 정보 조회 query
export const useQueryAdminUserInfo = (
  params: { userId: number },
  options?: UseQueryOptions<TSMPayUser, Error>
) => {
  return useQuery({
    queryKey: ["adminUserInfo", params],
    queryFn: () => getAdminUserInfoApi(params.userId),
    enabled: !!params.userId,
    ...options,
  });
};

// 기본 정보 변경 mutation
export const useMutationUserInfo = (
  options?: UseMutationOptions<null, Error, RequestPatchUserInfo>
) => {
  return useMutation({
    mutationFn: (params: RequestPatchUserInfo) => patchUserInfoApi(params),
    ...options,
  });
};

// 관리자 : 대행사 최상위 그룹장 회원 가입(직접 등록) mutation
export const useMutationAgencyGroupMaster = (
  options?: UseMutationOptions<
    TSMPayUser,
    Error,
    RequestAgencyGroupMasterDirect
  >
) => {
  return useMutation({
    mutationFn: (params: RequestAgencyGroupMasterDirect) =>
      postAgencyGroupMasterApi(params),
    ...options,
  });
};

// 회원 직접 등록 mutation
export const useMutationAgencyUserDirect = (
  options?: UseMutationOptions<TSMPayUser, Error, RequestMemberDirect>
) => {
  return useMutation({
    mutationFn: (params: RequestMemberDirect) =>
      postAgencyUserDirectApi(params),
    ...options,
  });
};

// 회원 가입 메일 발송 mutation
export const useMutationAgencyUserEmailSend = (
  options?: UseMutationOptions<null, Error, RequestSignupEmail>
) => {
  return useMutation({
    mutationFn: (params: RequestSignupEmail) =>
      postAgencyUserEmailSendApi(params),
    ...options,
  });
};

// 대행사 회원 상태 변경 mutation
export const useMutationAgencyUserStatus = (
  options?: UseMutationOptions<null, Error, RequestAgencyUserStatus>
) => {
  return useMutation({
    mutationFn: (params: RequestAgencyUserStatus) =>
      putAgencyUserStatusApi(params),
    ...options,
  });
};

// 대행사 회원 삭제 mutation
export const useMutationAgencyUserDelete = (
  options?: UseMutationOptions<null, Error, RequestAgencyUserDelete>
) => {
  return useMutation({
    mutationFn: (params: RequestAgencyUserDelete) => delAgencyUserApi(params),
    ...options,
  });
};

// [시스템 관리자] 대행사 회원 목록 조회 query
export const useQueryAdminAgencyUsersList = (
  params: RequestAgencyUsers,
  options?: UseQueryOptions<ResponseAgencyUsersWithNo, Error>
) => {
  return useQuery({
    queryKey: ["agencyUsersList", params],
    queryFn: () => getAdminAgencyUsersListApi(params),
    ...options,
  });
};

// 그룹장 회원 목록 조회 query
export const useQueryGroupUserList = (
  params: GroupUserDtoParams & { agentId: number; userId: number },
  options?: UseQueryOptions<ResponseGroupUser, Error>
) => {
  return useQuery({
    queryKey: ["groupUserList", params],
    queryFn: () => getGroupUserListApi(params),
    ...options,
  });
};
