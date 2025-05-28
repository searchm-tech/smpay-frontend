import type {
  ActionButton,
  SmPayJudgementStatus,
  SmPayStatus,
} from "@/types/sm-pay";
import type { AdvertiserStatus } from "@/types/adveriser";

export const SM_PAY_STATUS_MAP: Record<SmPayStatus, string> = {
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
  return SM_PAY_STATUS_MAP[status] || status;
};

export const ADVERTISER_STATUS_MAP: Record<AdvertiserStatus, string> = {
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
  return ADVERTISER_STATUS_MAP[status] || status;
};

export const STATUS_ACTIONS: Record<SmPayStatus, ActionButton[]> = {
  ADVERTISER_AGREEMENT_REQUEST: ["view"],
  ADVERTISER_DISAGREED: ["view", "cancel"],
  ADVERTISER_AGREEMENT_EXPIRED: ["view", "cancel", "resend"],
  ADVERTISER_AGREEMENT_COMPLETED: ["view", "cancel", "request"],
  REVIEW_PENDING: ["view"],
  REVIEW_APPROVED: ["view", "stop", "terminate"],
  REJECTED: ["view"],
  SUSPENDED: ["view", "terminate", "resume"],
  TERMINATION_IN_PROGRESS: [],
  TERMINATED: [],
};

export const STATUS_LABELS: Record<SmPayStatus, string> = {
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
};

export const JUDGEMENT_STATUS_MAP: Record<SmPayJudgementStatus, string> = {
  REVIEW_REQUEST: "심사 요청",
  APPROVED: "승인",
  REJECTED: "반려",
  SUSPENDED: "일시중지",
  TERMINATED: "해지",
  TERMINATION_IN_PROGRESS: "해지 신청 진행",
};

export const MEMBER_TYPE_OPTS = [
  { label: "그룹장", value: "AGENCY_GROUP_MANAGER" },
  { label: "그룹원", value: "AGENCY_GROUP_MEMBER" },
];
