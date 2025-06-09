// import axios from "axios";
import axios from "axios";
import { ApiError, post } from "@/lib/api";
// import type { ApiResponse } from "@/types/api";

import type {
  SignInResponse,
  SignInRequest,
  RefreshTokenResponse,
} from "@/types/auth";

// 토큰 갱신 전용 axios 인스턴스 (interceptor 무한 루프 방지)
const refreshTokenClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/core`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signInApi = async (
  params: SignInRequest
): Promise<SignInResponse> => {
  try {
    const response: SignInResponse = await post<SignInResponse>(
      "/api/v1/users/login",
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

export const signOutApi = async () => {
  try {
    const response = await post("/api/v1/users/logout");
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 토큰 재발급 API
type RefreshTokenRequest = {
  refreshToken: string;
};

export const postRefreshTokenApi = async (
  params: RefreshTokenRequest
): Promise<RefreshTokenResponse> => {
  try {
    alert("토큰 만료 테스트");

    // 별도의 axios 인스턴스 사용하여 interceptor 루프 방지
    const response = await refreshTokenClient.post<{
      code: string;
      message: string;
      result: RefreshTokenResponse;
    }>("/api/v1/users/token/refresh", null, {
      headers: {
        Authorization: `Bearer ${params.refreshToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.code !== "0") {
      throw new ApiError(
        response.data.code,
        response.data.message,
        response.data.result
      );
    }

    return response.data.result;
  } catch (error) {
    console.error("postRefreshTokenApi error:", error);
    throw error;
  }
};
