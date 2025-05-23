// src/api/axios.ts
import axios, { AxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";
import { postRefreshTokenApi, signOutApi } from "@/services/auth";
import type { ApiResponse } from "@/types/api";

// 커스텀 에러 클래스
export class ApiError extends Error {
  code: string;
  result: any;

  constructor(code: string, message: string, result?: any) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.result = result;
  }
}

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/core`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (예: 토큰 자동 추가)
apiClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (예: 에러 처리)
apiClient.interceptors.response.use(
  (response) => {
    // code 0이 아닐 경우 > 정상적인 API 호출이 아님
    if (response.data && response.data.code !== "0") {
      throw new ApiError(
        response.data.code,
        response.data.message,
        response.data.result
      );
    }

    return response.data; // 전체 response.data 반환 (code, message, result)
  },
  async (error) => {
    // 토큰 만료
    if (error.response?.data?.code === "70") {
      try {
        const res = await postRefreshTokenApi();
        alert("토큰 재발급");
        apiClient.defaults.headers.Authorization = `Bearer ${res.accessToken.token}`;
        error.config.headers.Authorization = `Bearer ${res.accessToken.token}`;
        return apiClient.request(error.config);
      } catch (refreshError) {
        // refreshToken도 만료 → 로그아웃 처리
        await signOut({ callbackUrl: "/sign-in" });
        alert("토큰 완전 끝");
        return Promise.reject(refreshError);
      }
    }

    // 서버에서 온 에러 응답이 있으면 ApiError로 throw
    if (error.response && error.response.data) {
      const { code, message, result } = error.response.data;
      throw new ApiError(code, message, result);
    }
    // 그 외 네트워크 에러 등
    return Promise.reject(error);
  }
);

export const get = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = (await apiClient.get(url, config)) as ApiResponse<T>;
    return res.result;
  } catch (error: any) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("UNKNOWN", error.message);
  }
};

export const post = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = (await apiClient.post(url, data, config)) as ApiResponse<T>;
    return res.result;
  } catch (error: any) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("UNKNOWN", error.message);
  }
};

export const patch = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = (await apiClient.patch(url, data, config)) as ApiResponse<T>;
    return res.result;
  } catch (error: any) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("UNKNOWN", error.message);
  }
};

export const put = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = (await apiClient.put(url, data, config)) as ApiResponse<T>;
    return res.result;
  } catch (error: any) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("UNKNOWN", error.message);
  }
};

export const del = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = (await apiClient.delete(url, config)) as ApiResponse<T>;
    return res.result;
  } catch (error: any) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("UNKNOWN", error.message);
  }
};

export default apiClient;
