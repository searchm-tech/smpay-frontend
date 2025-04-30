import type { SmPayStatus } from "@/types/sm-pay";
import type { AdvertiserStatus } from "@/types/adveriser";

export const smPayStatusMap: Record<SmPayStatus, string> = {
  ADVERTISER_AGREEMENT_REQUEST: "광고주 동의 요청",
  ADVERTISER_DISAGREED: "광고주 미동의",
  ADVERTISER_AGREEMENT_EXPIRED: "광고주 동의기한 만료",
  ADVERTISER_AGREEMENT_COMPLETED: "광고주 동의 완료",
  REVIEW_PENDING: "심사 대기",
  REVIEW_APPROVED: "심사 승인",
  REJECTED: "반려",
  SUSPENDED: "일시중지",
  TERMINATION_IN_PROGRESS: "해지 신청 진행",
  TERMINATED: "해지",
} as const;

export const getSmPayStatusLabel = (status: SmPayStatus): string => {
  return smPayStatusMap[status] || status;
};

export const advertiserStatusMap: Record<AdvertiserStatus, string> = {
  AVAILABLE: "신청 가능",
  AGREEMENT_REQUEST: "광고주 동의 요청",
  AGREEMENT_REJECTED: "광고주 미동의",
  AGREEMENT_EXPIRED: "광고주 동의 기한 만료",
  AGREEMENT_COMPLETED: "광고주 동의 완료",
  REVIEW_REQUEST: "심사 요청",
  REVIEW_PENDING: "심사 대기",
  REVIEW_APPROVED: "심사 승인",
  REVIEW_REJECTED: "심사 반려",
};

export const getAdvertiserStatusLabel = (status: AdvertiserStatus): string => {
  return advertiserStatusMap[status] || status;
};
