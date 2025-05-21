// ---- 실제 API 호출 ----

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import {
  getUsersMailVerifyApi,
  postUsersPasswordResetApi,
  TMailVerifyParams,
} from "@/services/user";
import type { ApiResponseData } from "@/services/types";
import type { TMailVerifyUser } from "@/types/user";

// 비밀번호 재설정 API - 링크 전달
export const useMutationPwdResetLink = (
  options?: UseMutationOptions<ApiResponseData<null>, Error, string>
) => {
  return useMutation({
    mutationFn: (email: string) => postUsersPasswordResetApi(email),
    ...options,
  });
};

// 대행사 회원 메일 인증 코드 확인 API
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
