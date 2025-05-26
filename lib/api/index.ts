// src/api/axios.ts
import axios, { AxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";
import { signOut } from "next-auth/react";
import { postRefreshTokenApi } from "@/services/auth";
import { useSessionStore } from "@/store/useSessionStore";
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

// 요청 인터셉터 (항상 최신 세션의 accessToken 사용)
apiClient.interceptors.request.use(
  (config) => {
    if (config.url?.includes("/token/refresh")) {
      return config;
    }

    const { accessToken } = useSessionStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (토큰 만료 시 재발급 및 세션 동기화)
apiClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.code !== "0") {
      throw new ApiError(
        response.data.code,
        response.data.message,
        response.data.result
      );
    }
    return response.data;
  },
  async (error) => {
    if (error.response?.data?.code === "70") {
      try {
        const { refreshToken, setTokens } = useSessionStore.getState();
        if (refreshToken) {
          try {
            const res = await postRefreshTokenApi({
              refreshToken,
            });

            setTokens(res.accessToken.token, res.refreshToken.token);
            // TODO : 안되면 아래 코드 사용
            // const newConfig = {
            //   ...error.config,
            //   headers: {
            //     ...error.config.headers,
            //     Authorization: `Bearer ${res.accessToken.token}`,
            //   },
            // };
            return apiClient.request(error.config);
          } catch (err) {
            const { clearSession } = useSessionStore.getState();
            await signOut({ callbackUrl: "/sign-in" });
            clearSession();
            return Promise.reject(err);
          }
        }
      } catch (refreshError) {
        const { clearSession } = useSessionStore.getState();
        await signOut({ callbackUrl: "/sign-in" });
        clearSession();
        return Promise.reject(refreshError);
      }
    }
    if (error.response && error.response.data) {
      const { code, message, result } = error.response.data;
      throw new ApiError(code, message, result);
    }
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
