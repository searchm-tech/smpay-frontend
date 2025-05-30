import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 객체를 URL 쿼리 파라미터 문자열로 변환
 * @param params - 쿼리 파라미터 객체
 * @returns 쿼리 파라미터 문자열 (예: "page=1&size=10")
 */
export function buildQueryParams(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        // 배열인 경우 첫 번째 값만 사용 (또는 join 사용 가능)
        if (value.length > 0) {
          searchParams.append(key, value[0].toString());
        }
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });

  return searchParams.toString();
}
