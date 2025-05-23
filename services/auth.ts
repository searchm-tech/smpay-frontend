import apiClient, { ApiError, post } from "@/lib/api";

import type {
  SignInResponse,
  SignInRequest,
  RefreshTokenResponse,
} from "@/types/auth";

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
    apiClient.defaults.headers.Authorization = `Bearer ${params.refreshToken}`;
    const response = await post<RefreshTokenResponse>(
      "/api/v1/users/token/refresh"
    );
    return response;
  } catch (error) {
    throw error;
  }
};
