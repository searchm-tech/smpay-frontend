import type {
  ActionButton,
  SmPayJudgementStatus,
  SmPayStatus,
} from "@/types/sm-pay";
import type { SmPayAdvertiserApplyStatus } from "@/types/smpay";

export const SM_PAY_STATUS_LIST: { label: string; value: string }[] = [
  { label: "전체", value: "ALL" },
  { label: "심사 대기", value: "REVIEW_PENDING" },
  { label: "심사 반려", value: "REVIEW_REJECTED" },
  { label: "운영 검토 대기", value: "OPERATION_REVIEW_PENDING" },
  { label: "운영 검토 거절", value: "OPERATION_REVIEW_REJECTED" },
  { label: "운영 검토 완료", value: "OPERATION_REVIEW_COMPLETED" },
  { label: "광고주 동의 대기", value: "ADVERTISER_AGREEMENT_PENDING" },
  { label: "광고주 동의 기한 만료", value: "ADVERTISER_AGREEMENT_EXPIRED" },
  { label: "심사 취소", value: "APPLICATION_CANCELLED" },
  {
    label: "출금계좌 등록 실패",
    value: "WITHDRAWAL_ACCOUNT_REGISTRATION_FAILED",
  },
  { label: "운영 중", value: "OPERATING" },
  { label: "일시중지", value: "SUSPENDED" },
  { label: "해지 대기", value: "TERMINATION_PENDING" },
  { label: "해지", value: "TERMINATED" },
  { label: "비활성", value: "STOP" },
];

/**
 * 테이블 상태에 따른 버튼 기능들
 * - admin : 광고주 운영 현황
 * - 대행새 : SM Pay 관리
 */
export const STATUS_ACTION_BUTTONS: Record<
  SmPayAdvertiserApplyStatus,
  ActionButton[]
> = {
  UNSYNC_ADVERTISER: ["view"], // 광고주 비동기화
  APPLICABLE: ["view"], // 신청 가능
  WAIT_REVIEW: ["view", "application_cancel"], // 심사 대기: 조회, 신청 취소
  REJECT: ["view", "reapply"], // 심사 반려: 조회, 재신청
  OPERATION_REVIEW: ["view", "application_cancel"], // 운영 검토 대기: 조회, 신청 취소
  OPERATION_REJECT: ["view", "reapply"], // 운영 검토 거절: 조회, 재신청
  OPERATION_REVIEW_SUCCESS: ["view", "advertiser_agreement_send"], // 운영 검토 완료: 조회, 광고주 동의 전송
  ADVERTISER_AGREE_WAIT: ["view", "application_cancel"], // 광고주 동의 대기: 조회, 신청 취소
  ADVERTISER_AGREE_TIME_EXPIRE: ["view", "application_cancel", "resend"], // 광고주 동의 기한 만료: 조회, 신청 취소, 재발송
  CANCEL: ["view", "reapply"], // 신청 취소: 조회, 재신청
  REGISTER_WITHDRAW_ACCOUNT_FAIL: ["view"], // 출금계좌 등록 실패: 조회
  OPERATION: ["view", "suspend", "termination_request"], // 운영 중: 조회, 일시중지, 해지 신청
  PAUSE: ["view", "termination_request", "resume"], // 일시중지: 조회, 해지 신청, 재개
  TERMINATE_WAIT: ["view"], // 해지 대기: 조회
  TERMINATE: ["view"], // 해지: 조회
} as const;

/**
 * 테이블 상태 라벨
 * - admin : 광고주 운영 현황
 * - 대행새 : SM Pay 관리
 * - TODO : 이전 버전이므로 삭제 필요
 */
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

export enum SmPayAdvertiserStatus {
  UNSYNC_ADVERTISER = "UNSYNC_ADVERTISER",
  APPLICABLE = "APPLICABLE",
  WAIT_REVIEW = "WAIT_REVIEW",
  REJECT = "REJECT",
  OPERATION_REVIEW = "OPERATION_REVIEW",
  OPERATION_REJECT = "OPERATION_REJECT",
  OPERATION_REVIEW_SUCCESS = "OPERATION_REVIEW_SUCCESS",
  ADVERTISER_AGREE_WAIT = "ADVERTISER_AGREE_WAIT",
  ADVERTISER_AGREE_TIME_EXPIRE = "ADVERTISER_AGREE_TIME_EXPIRE",
  CANCEL = "CANCEL",
  REGISTER_WITHDRAW_ACCOUNT_FAIL = "REGISTER_WITHDRAW_ACCOUNT_FAIL",
  OPERATION = "OPERATION",
  PAUSE = "PAUSE",
  TERMINATE_WAIT = "TERMINATE_WAIT",
  TERMINATE = "TERMINATE",
}

export const SmPayAdvertiserStatusLabel: {
  [key in SmPayAdvertiserStatus]: string;
} = {
  [SmPayAdvertiserStatus.UNSYNC_ADVERTISER]: "광고주 비동기화",
  [SmPayAdvertiserStatus.APPLICABLE]: "신청 가능",
  [SmPayAdvertiserStatus.WAIT_REVIEW]: "심사 대기",
  [SmPayAdvertiserStatus.REJECT]: "심사 반려",
  [SmPayAdvertiserStatus.OPERATION_REVIEW]: "운영 검토 대기",
  [SmPayAdvertiserStatus.OPERATION_REJECT]: "운영 검토 거절",
  [SmPayAdvertiserStatus.OPERATION_REVIEW_SUCCESS]: "운영 검토 완료",
  [SmPayAdvertiserStatus.ADVERTISER_AGREE_WAIT]: "광고주 동의 대기",
  [SmPayAdvertiserStatus.ADVERTISER_AGREE_TIME_EXPIRE]: "광고주 동의 기한 만료",
  [SmPayAdvertiserStatus.CANCEL]: "신청 취소",
  [SmPayAdvertiserStatus.REGISTER_WITHDRAW_ACCOUNT_FAIL]: "출금 계좌 등록 실패",
  [SmPayAdvertiserStatus.OPERATION]: "운영중",
  [SmPayAdvertiserStatus.PAUSE]: "일시중지",
  [SmPayAdvertiserStatus.TERMINATE_WAIT]: "해지 대기",
  [SmPayAdvertiserStatus.TERMINATE]: "해지",
};

/**
 * SmPay 광고주 신청 상태 라벨
 */
export const SmPayAdvertiserApplyStatusLabel = (
  status: SmPayAdvertiserApplyStatus
) => {
  return SM_PAY_ADVERTISER_APPLY_STATUS[status] || "알 수 없는 상태";
};

export const SM_PAY_ADVERTISER_APPLY_STATUS: Record<
  SmPayAdvertiserApplyStatus,
  string
> = {
  UNSYNC_ADVERTISER: "광고주 비동기화",
  APPLICABLE: "신청 가능",
  WAIT_REVIEW: "심사 대기",
  REJECT: "심사 반려",
  OPERATION_REVIEW: "운영 검토 대기",
  OPERATION_REJECT: "운영 검토 거절",
  OPERATION_REVIEW_SUCCESS: "운영 검토 완료",
  ADVERTISER_AGREE_WAIT: "광고주 동의 대기",
  ADVERTISER_AGREE_TIME_EXPIRE: "광고주 동의 기한 만료",
  CANCEL: "신청 취소",
  REGISTER_WITHDRAW_ACCOUNT_FAIL: "출금 계좌 등록 실패",
  OPERATION: "운영중",
  PAUSE: "일시중지",
  TERMINATE_WAIT: "해지 대기",
  TERMINATE: "해지",
};
