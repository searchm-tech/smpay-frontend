import { ApiError, post } from "@/lib/api";

// 실제 API 타입
import type { SignInResponse, SignInRequest } from "@/types/auth";

// -------------- 실제 api -------------

export const signInApi = async (
  params: SignInRequest
): Promise<SignInResponse> => {
  try {
    const response: SignInResponse = await post<SignInResponse>(
      "/users/login",
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
