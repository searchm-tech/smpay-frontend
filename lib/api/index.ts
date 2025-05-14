// src/api/axios.ts
import axios, { AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com",
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
  (response) => response,
  (error) => {
    // 예: 401 에러 처리
    if (error.response && error.response.status === 401) {
      // 로그아웃 처리 등
    }
    return Promise.reject(error);
  }
);

export const get = <T = any>(url: string, config?: AxiosRequestConfig) =>
  apiClient.get<T>(url, config).then((res) => res.data);

export const post = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => apiClient.post<T>(url, data, config).then((res) => res.data);

export const patch = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => apiClient.patch<T>(url, data, config).then((res) => res.data);

export const del = <T = any>(url: string, config?: AxiosRequestConfig) =>
  apiClient.delete<T>(url, config).then((res) => res.data);

export default apiClient;
