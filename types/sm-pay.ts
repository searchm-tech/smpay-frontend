export interface SmPayData {
  id: number; // For table key
  no: number; // No
  manager: string; // 담당자
  customerId: string; // CUSTOMER ID
  loginId: string; // 로그인 ID
  advertiserName: string; // 광고주명
  businessName: string;
  businessNumber: string;
  businessOwnerName: string;
  businessOwnerPhone: string;
  businessOwnerEmail: string;
  status: SmPayStatus; // 상태
  createdAt: string;
  updatedAt: string;
  lastModifiedAt: string; // 최종 수정일시
  chargeAccount: string;
  chargeAccountNumber: string;
  chargeAccountHolderName: string;
  chargeAccountBank: string;
  chargeAccountBankCode: string;
  chargeAccountBankName: string;
  salesAccount: string;
  salesAccountNumber: string;
  salesAccountHolderName: string;
  salesAccountBank: string;
  salesAccountBankCode: string;
  salesAccountBankName: string;
}

export interface SmPayData2 {
  id: number;
  owner: string;
  accountId: string;
  accountName: string;
  businessName: string;
  bussiness_num: string;
  status: SmPayStatus;
  createdAt: string;
}

/**
 * SM Pay 상태별 가능한 액션 정의 (피그마 기준)
 *
 * 1. 심사 대기: 조회, 신청 취소
 * 2. 심사 반려: 조회, 재신청
 * 3. 운영 검토 대기: 조회, 신청 취소
 * 4. 운영 검토 거절: 조회, 재신청
 * 5. 운영 검토 완료: 조회, 광고주 등의 전송
 * 6. 광고주 등의 대기: 조회, 신청 취소
 * 7. 광고주 등의 기한 만료: 조회, 재발송
 * 8. 신청 취소: 조회, 재신청
 * 9. 출금계좌 등록 실패: 조회
 * 10. 운영 중: 조회, 일시중지, 해지 신청
 * 11. 일시중지: 조회, 해지 신청, 재개
 * 12. 해지 대기: 조회
 * 13. 해지: 조회
 *
 * 액션 색상 구분:
 * - 초록색(조회): 기본 조회 기능
 * - 빨간색(신청 취소, 해지 신청): 취소/해지 관련
 * - 파란색(재신청, 광고주 등의 전송, 재발송, 재개): 진행/재시작 관련
 */

export type SmPayStatus =
  | "REVIEW_PENDING" // 심사 대기
  | "REVIEW_REJECTED" // 심사 반려
  | "OPERATION_REVIEW_PENDING" // 운영 검토 대기
  | "OPERATION_REVIEW_REJECTED" // 운영 검토 거절
  | "OPERATION_REVIEW_COMPLETED" // 운영 검토 완료
  | "ADVERTISER_AGREEMENT_PENDING" // 광고주 동의 대기
  | "ADVERTISER_AGREEMENT_EXPIRED" // 광고주 동의 기한 만료
  | "REVIEW_CANCELLED" // 신청 취소
  | "WITHDRAWAL_ACCOUNT_REGISTRATION_FAILED" // 출금계좌 등록 실패
  | "OPERATING" // 운영 중
  | "SUSPENDED" // 일시중지
  | "TERMINATION_PENDING" // 해지 대기
  | "TERMINATED"; // 해지

export type SmPayJudgementStatus =
  | "REVIEW_REQUEST" // 심사 요청
  | "APPROVED" // 승인
  | "REJECTED" // 반려
  | "SUSPENDED" // 일시중지
  | "TERMINATED" // 해지
  | "TERMINATION_IN_PROGRESS"; // 해지 신청 진행

// sm-pay 관리 > 테이블 상태 버튼
export type ActionButton =
  | "view" // 조회
  | "cancel" // 신청 취소
  | "resend" // 재신청
  | "request" // 광고주 등의 전송
  | "stop" // 일시중지
  | "terminate" // 해지 신청
  | "resume" // 재개
  | "rerequset"; // 재발송

export type RuleInfo = {
  id: number;
  roas: number;
  increase: number;
  increaseType: string;
  decrease: number;
  decreaseType: string;
};

export type RuleHistory = {
  id: number;
  date: string;
  roas: number;
  increase: number;
  increaseType: string;
  decrease: number;
  decreaseType: string;
};

export type ScheduleInfo = {
  id: number;
  firstCharge: number;
  maxCharge: number;
};

export type BooleanResponse = {
  data: boolean;
  success: boolean;
};

export type SmPayJudgementData = {
  id: number;
  key: number;
  no: number;
  agencyName: string; // 대행사명
  departmentName: string; // 담당자명
  customerId: string; // CUSTOMER ID
  advertiserId: string; // 광고주 로그인 ID
  advertiserStatus: "new" | undefined; // 광고주 상태 (new 태그)
  userName: string; // 사업자명
  nickname: string; // 광고주 닉네임
  status:
    | "심사 요청"
    | "승인"
    | "반려"
    | "일시중지"
    | "해지"
    | "해지 신청 진행"; // 상태
  updatedAt: string; // 최종 수정 일시
};
