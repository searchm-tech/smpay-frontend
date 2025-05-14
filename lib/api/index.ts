// src/api/axios.ts
import axios, { AxiosRequestConfig } from "axios";
import type { ApiResponse, ApiResponseError } from "@/types/api";

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
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
    return response;
  },
  (error) => {
    // 예: 401 에러 처리
    if (error.response && error.response.status === 401) {
      // 로그아웃 처리 등
    }
    return Promise.reject(error);
  }
);

export const get = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const res = await apiClient.get<ApiResponse<T>>(url, config);
    return res.data;
  } catch (error: any) {
    const err: ApiResponseError = error.response?.data;
    throw err;
  }
};

export const post = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const res = await apiClient.post<ApiResponse<T>>(url, data, config);
    return res.data;
  } catch (error: any) {
    const err: ApiResponseError = error.response?.data;
    throw err;
  }
};

export const patch = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const res = await apiClient.patch<ApiResponse<T>>(url, data, config);
    return res.data;
  } catch (error: any) {
    const err: ApiResponseError = error.response?.data;
    throw err;
  }
};

export const del = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const res = await apiClient.delete<ApiResponse<T>>(url, config);
    return res.data;
  } catch (error: any) {
    const err: ApiResponseError = error.response?.data;
    throw err;
  }
};

export default apiClient;
