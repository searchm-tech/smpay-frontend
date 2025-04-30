import { SmPayStatus } from "@/types/sm-pay";

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

export const smPayStatusColorMap: Record<SmPayStatus, string> = {
  ADVERTISER_AGREEMENT_REQUEST: "text-blue-500",
  ADVERTISER_DISAGREED: "text-red-500",
  ADVERTISER_AGREEMENT_EXPIRED: "text-gray-500",
  ADVERTISER_AGREEMENT_COMPLETED: "text-green-500",
  REVIEW_PENDING: "text-yellow-500",
  REVIEW_APPROVED: "text-green-500",
  REJECTED: "text-red-500",
  SUSPENDED: "text-orange-500",
  TERMINATION_IN_PROGRESS: "text-red-400",
  TERMINATED: "text-red-600",
} as const;

export const getSmPayStatusLabel = (status: SmPayStatus): string => {
  return smPayStatusMap[status] || status;
};

export const getSmPayStatusColor = (status: SmPayStatus): string => {
  return smPayStatusColorMap[status] || "text-gray-500";
};
