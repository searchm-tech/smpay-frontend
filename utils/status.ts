import { SmPayStatus } from "@/types/sm-pay";
import { TAuthType, UserStatus } from "@/types/user";

export const smPayStatusMap: Record<SmPayStatus, string> = {
  REVIEW_PENDING: "심사 대기",
  REVIEW_REJECTED: "심사 반려",
  OPERATION_REVIEW_PENDING: "운영 검토 대기",
  OPERATION_REVIEW_REJECTED: "운영 검토 거절",
  OPERATION_REVIEW_COMPLETED: "운영 검토 완료",
  ADVERTISER_AGREEMENT_PENDING: "광고주 동의 대기",
  ADVERTISER_AGREEMENT_EXPIRED: "광고주 동의 기한 만료",
  REVIEW_CANCELLED: "신청 취소",
  WITHDRAWAL_ACCOUNT_REGISTRATION_FAILED: "출금계좌 등록 실패",
  OPERATING: "운영 중",
  SUSPENDED: "일시중지",
  TERMINATION_PENDING: "해지 대기",
  TERMINATED: "해지",
} as const;

export const smPayStatusColorMap: Record<SmPayStatus, string> = {
  REVIEW_PENDING: "text-yellow-500",
  REVIEW_REJECTED: "text-red-500",
  OPERATION_REVIEW_PENDING: "text-blue-500",
  OPERATION_REVIEW_REJECTED: "text-red-500",
  OPERATION_REVIEW_COMPLETED: "text-green-500",
  ADVERTISER_AGREEMENT_PENDING: "text-blue-500",
  ADVERTISER_AGREEMENT_EXPIRED: "text-gray-500",
  REVIEW_CANCELLED: "text-gray-400",
  WITHDRAWAL_ACCOUNT_REGISTRATION_FAILED: "text-red-400",
  OPERATING: "text-green-600",
  SUSPENDED: "text-orange-500",
  TERMINATION_PENDING: "text-red-400",
  TERMINATED: "text-red-600",
} as const;

export const getSmPayStatusLabel = (status: SmPayStatus): string => {
  return smPayStatusMap[status] || status;
};

export const getSmPayStatusColor = (status: SmPayStatus): string => {
  return smPayStatusColorMap[status] || "text-gray-500";
};

// ---- 실제 util 함수 ----

// 회원 권한 유형 레이블 맵핑
export const userAuthTypeMap: Record<TAuthType, string> = {
  ASSOCIATE_ADVERTISER: "준광고주",
  ADVERTISER: "광고주",
  AGENCY_GROUP_MEMBER: "대행사 그룹원",
  AGENCY_GROUP_MANAGER: "대행사 그룹장",
  AGENCY_GROUP_MASTER: "대행사 최상위 그룹장",
  OPERATIONS_MANAGER: "운영관리자",
  SYSTEM_ADMINISTRATOR: "시스템 관리자",
} as const;

export const getUserAuthTypeLabel = (status: TAuthType): string => {
  return userAuthTypeMap[status] || status;
};

export const userStatusMap: Record<UserStatus, string> = {
  NORMAL: "활성화",
  STOP: "비활성화",
  TEMP: "임시",
} as const;
