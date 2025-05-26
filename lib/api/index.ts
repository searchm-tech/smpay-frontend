// src/api/axios.ts
import axios, { AxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";
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

// axios-retry 설정
axiosRetry(apiClient, {
  retries: 0, // 재시도 없음
  retryDelay: (retryCount) => {
    return retryCount * 1000; // 각 재시도마다 1초씩 증가
  },
  // retryCondition: (error) => {
  //   // 500번대 서버 에러나 네트워크 에러일 때만 재시도
  //   return (
  //     axiosRetry.isNetworkOrIdempotentRequestError(error) ||
  //     (error.response?.status ?? 0) >= 500
  //   );
  // },
  onRetry: (retryCount, error, requestConfig) => {
    console.log(`Retry attempt ${retryCount} for ${requestConfig.url}`);
  },
});

// API 요청 카운터
let requestCount = 0;
const MAX_REQUESTS = 3;

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    if (requestCount >= MAX_REQUESTS) {
      return Promise.reject(new Error("API 요청 횟수 초과"));
    }
    requestCount++;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    requestCount--; // 실패한 요청은 카운트에서 제외
    return Promise.reject(error);
  }
);

// 요청 인터셉터 (예: 토큰 자동 추가)
apiClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    console.log("session", session);
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
      console.log("config.headers.Authorization", config.headers.Authorization);
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
        await signOut({ callbackUrl: "/sign-out" });
        const session = await getSession();

        if (session?.refreshToken) {
          // const res = await postRefreshTokenApi({
          //   refreshToken: session?.refreshToken,
          // })
          //   .then((res) => {
          //     alert("토큰 재발급");
          //     apiClient.defaults.headers.Authorization = `Bearer ${res.accessToken.token}`;
          //     error.config.headers.Authorization = `Bearer ${res.accessToken.token}`;
          //     return apiClient.request(error.config);
          //   })
          //   .catch((err) => {
          //     signOut({ callbackUrl: "/sign-in" });
          //     alert("토큰 완전 끝");
          //   });
        }
      } catch (refreshError) {
        // refreshToken도 만료 → 로그아웃 처리
        // await signOut({ callbackUrl: "/sign-out" });
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
