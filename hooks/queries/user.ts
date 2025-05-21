// ---- 실제 API 호출 ----

import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { postUsersPasswordResetApi } from "@/services/user";
import type { ApiResponseData } from "@/services/types";

// 비밀번호 재설정 API - 링크 전달
export const useMutationPwdResetLink = (
  options?: UseMutationOptions<ApiResponseData<null>, Error, string>
) => {
  return useMutation({
    mutationFn: (email: string) => postUsersPasswordResetApi(email),
    ...options,
  });
};
