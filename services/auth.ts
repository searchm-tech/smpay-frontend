// import axios from "axios";
import { ApiError, post } from "@/lib/api";
// import type { ApiResponse } from "@/types/api";

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
    alert("토큰 만료");
    console.log("params", params);
    const response: RefreshTokenResponse = await post<RefreshTokenResponse>(
      "/api/v1/users/token/refresh",
      params
    );

    console.log("response", response);
    return response;
    // TODO : 위 내용이 안되면 기존거 그대로 사용할 것.
    // // 토큰 갱신 요청은 인터셉터를 우회하기 위해 axios 인스턴스를 직접 생성
    // const refreshClient = axios.create({
    //   baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/core`,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${params.refreshToken}`,
    //   },
    // });

    // const response = await refreshClient.post<
    //   ApiResponse<RefreshTokenResponse>
    // >("/api/v1/users/token/refresh");

    // if (response.data.code !== "0") {
    //   throw new ApiError(
    //     response.data.code,
    //     response.data.message,
    //     response.data.result
    //   );
    // }

    // return response.data.result;
  } catch (error) {
    throw error;
  }
};
