import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TAuthType } from "@/types/user";

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

// 관리자 확인
export function getIsAdmin(type?: TAuthType | null) {
  if (!type) return false;
  return ["SYSTEM_ADMINISTRATOR", "OPERATIONS_MANAGER"].includes(type || "");
}

// 최상위 그룹장 확인
export function getIsGroupMaster(type?: TAuthType | null) {
  if (!type) return false;
  return type === "AGENCY_GROUP_MASTER";
}

// 그룹장, 그룹원 확인
export function getIsAgency(type?: TAuthType | null) {
  if (!type) return false;
  return ["AGENCY_GROUP_MANAGER", "AGENCY_GROUP_MEMBER"].includes(type || "");
}

/**
 * 권한
 * - 시스템 관리자 : OPERATIONS_MANAGER(운영관리자), SYSTEM_ADMINISTRATOR(시스템 관리자)
 * - 최상위 그룹장 : AGENCY_GROUP_MASTER(대행사 최상위 그룹장)
 * - 대행사 그룹장, 그룹원 : AGENCY_GROUP_MANAGER(대행사 그룹장), AGENCY_GROUP_MEMBER(대행사 그룹원)
 * - 광고주 : ADVERTISER(광고주), ASSOCIATE_ADVERTISER(준광고주) [현재 아직 화면상 아직 ...]
 */

// 권한 가져오기
export function getAuthType(type?: TAuthType | null) {
  if (!type) return "agency";

  if (getIsAdmin(type)) {
    return "admin";
  }
  if (getIsGroupMaster(type)) {
    return "master";
  }
  if (getIsAgency(type)) {
    return "agency";
  }

  return "agency";
}
