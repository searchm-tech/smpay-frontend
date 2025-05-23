// ---- 실제 API 호출 ----

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import {
  getUsersMailVerifyApi,
  postAgentsUsersSignUpApi,
  postAgentsUsersPwApi,
  postUsersPasswordResetApi,
  TMailVerifyParams,
  TSignUpMailVerifyParams,
  TAgentsUsersPwParams,
  getUserInfoApi,
  TUserInfoParams,
} from "@/services/user";
import type { ApiResponseData } from "@/services/types";
import type {
  TMailVerifyUser,
  TSignUpMailVerifyResponse,
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

// 대행사 최상위 그룹장 회원 가입(메일 통한) mutation
export const useMutationSignUpMailVerify = (
  options?: UseMutationOptions<
    TSignUpMailVerifyResponse,
    Error,
    TSignUpMailVerifyParams
  >
) => {
  return useMutation({
    mutationFn: (params: TSignUpMailVerifyParams) =>
      postAgentsUsersSignUpApi(params),
    ...options,
  });
};

// 대행사 비밀번호 설정 또는 비밀번호 재설정 mutation
export const useMutationAgentsUsersPw = (
  options?: UseMutationOptions<
    TSignUpMailVerifyResponse,
    Error,
    TAgentsUsersPwParams
  >
) => {
  return useMutation({
    mutationFn: (params: TAgentsUsersPwParams) => postAgentsUsersPwApi(params),
  });
};

//

export const useQueryUserInfo = (
  params: TUserInfoParams,
  options?: UseQueryOptions<TUserInfoResponse, Error>
) => {
  return useQuery({
    queryKey: ["userInfo", params],
    queryFn: () => getUserInfoApi(params),
    enabled: !!params.agentId && !!params.userId,
    ...options,
  });
};
