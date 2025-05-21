import { ApiError, post } from "@/lib/api";
import type { ApiResponseData } from "./types";

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
