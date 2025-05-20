// src/api/axios.ts
import axios, { AxiosRequestConfig } from "axios";
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
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/core/api/v1`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (예: 토큰 자동 추가)
apiClient.interceptors.request.use(
  (config) => {
    // 예시: localStorage에서 토큰 가져와서 헤더에 추가
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (예: 에러 처리)
apiClient.interceptors.response.use(
  (response) => {
    console.log("response", response);

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
  (error) => {
    // 예: 401 에러 처리
    if (error.response && error.response.status === 401) {
      // 로그아웃 처리 등
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
