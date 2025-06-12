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
  APPLICATION_CANCELLED: "심사 취소",
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

// SmPayStatus 상태별 사용 가능한 ActionButton 매핑
export const STATUS_ACTION_BUTTONS: Record<SmPayStatus, ActionButton[]> = {
  REVIEW_PENDING: ["view", "application_cancel"], // 심사 대기: 조회, 신청 취소
  REVIEW_REJECTED: ["view", "reapply"], // 심사 반려: 조회, 재신청
  OPERATION_REVIEW_PENDING: ["view", "application_cancel"], // 운영 검토 대기: 조회, 신청 취소
  OPERATION_REVIEW_REJECTED: ["view", "reapply"], // 운영 검토 거절: 조회, 재신청
  OPERATION_REVIEW_COMPLETED: ["view", "advertiser_agreement_send"], // 운영 검토 완료: 조회, 광고주 동의 전송
  ADVERTISER_AGREEMENT_PENDING: ["view", "application_cancel"], // 광고주 동의 대기: 조회, 신청 취소
  ADVERTISER_AGREEMENT_EXPIRED: ["view", "application_cancel", "resend"], // 광고주 동의 기한 만료: 조회, 신청 취소, 재발송
  APPLICATION_CANCELLED: ["view", "reapply"], // 신청 취소: 조회, 재신청
  WITHDRAWAL_ACCOUNT_REGISTRATION_FAILED: ["view"], // 출금계좌 등록 실패: 조회
  OPERATING: ["view", "suspend", "termination_request"], // 운영 중: 조회, 일시중지, 해지 신청
  SUSPENDED: ["view", "termination_request", "resume"], // 일시중지: 조회, 해지 신청, 재개
  TERMINATION_PENDING: ["view"], // 해지 대기: 조회
  TERMINATED: ["view"], // 해지: 조회
} as const;

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
  APPLICATION_CANCELLED: "신청 취소",
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
