import type {
  ActionButton,
  SmPayJudgementStatus,
  SmPayStatus,
} from "@/types/sm-pay";
import type { AdvertiserStatus } from "@/types/adveriser";

export const SM_PAY_STATUS_MAP: Record<SmPayStatus, string> = {
  REVIEW_PENDING: "심사 대기",
  REVIEW_REJECTED: "심사 반려",
  OPERATION_REVIEW_PENDING: "운영 검토 대기",
  OPERATION_REVIEW_REJECTED: "운영 검토 거절",
  OPERATION_REVIEW_COMPLETED: "운영 검토 완료",
  ADVERTISER_AGREEMENT_PENDING: "광고주 동의 대기",
  ADVERTISER_AGREEMENT_EXPIRED: "광고주 동의 기한 만료",
  REVIEW_CANCELLED: "심사 취소",
  WITHDRAWAL_ACCOUNT_REGISTRATION_FAILED: "출금계좌 등록 실패",
  OPERATING: "운영 중",
  SUSPENDED: "일시중지",
  TERMINATION_PENDING: "해지 대기",
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
  REVIEW_PENDING: ["view", "cancel"],
  REVIEW_REJECTED: ["view", "resend"],
  OPERATION_REVIEW_PENDING: ["view", "cancel"],
  OPERATION_REVIEW_REJECTED: ["view", "resend"],
  OPERATION_REVIEW_COMPLETED: ["view", "request"],
  ADVERTISER_AGREEMENT_PENDING: ["view", "cancel"],
  ADVERTISER_AGREEMENT_EXPIRED: ["view", "cancel", "rerequset"],
  REVIEW_CANCELLED: ["view", "resend"],
  WITHDRAWAL_ACCOUNT_REGISTRATION_FAILED: ["view", "resend"],
  OPERATING: ["view", "stop", "terminate"],
  SUSPENDED: ["view", "terminate", "resume"],
  TERMINATION_PENDING: ["view"],
  TERMINATED: ["view"],
};

export const STATUS_LABELS: Record<SmPayStatus, string> = {
  ADVERTISER_AGREEMENT_PENDING: "광고주 동의 대기",
  ADVERTISER_AGREEMENT_EXPIRED: "광고주 동의 기한 만료",
  REVIEW_PENDING: "심사 대기",
  REVIEW_REJECTED: "심사 반려",
  OPERATION_REVIEW_PENDING: "운영 검토 대기",
  OPERATION_REVIEW_REJECTED: "운영 검토 거절",
  OPERATION_REVIEW_COMPLETED: "운영 검토 완료",
  SUSPENDED: "일시중지",
  TERMINATION_PENDING: "해지 대기",
  TERMINATED: "해지",
  REVIEW_CANCELLED: "심사 취소",
  WITHDRAWAL_ACCOUNT_REGISTRATION_FAILED: "출금계좌 등록 실패",
  OPERATING: "운영 중",
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

export const USER_STATUS_OPTS = [
  { label: "활성", value: "NORMAL" },
  { label: "비활성", value: "STOP" },
];
