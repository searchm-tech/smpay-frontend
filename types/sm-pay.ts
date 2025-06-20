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
  nickname: string;
}

// SMPay 관리 상태
export type SmPayStatus =
  | "REVIEW_PENDING" // 심사 대기
  | "REVIEW_REJECTED" // 심사 반려
  | "OPERATION_REVIEW_PENDING" // 운영 검토 대기
  | "OPERATION_REVIEW_REJECTED" // 운영 검토 거절
  | "OPERATION_REVIEW_COMPLETED" // 운영 검토 완료
  | "ADVERTISER_AGREEMENT_PENDING" // 광고주 동의 대기
  | "ADVERTISER_AGREEMENT_EXPIRED" // 광고주 동의 기한 만료
  | "APPLICATION_CANCELLED" // 신청 취소
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

// 이미지 기준으로 올바르게 매칭된 액션 버튼 타입
export type ActionButton =
  | "view" // 조회
  | "application_cancel" // 신청 취소
  | "reapply" // 재신청
  | "advertiser_agreement_send" // 광고주 동의 전송
  | "suspend" // 일시중지
  | "termination_request" // 해지 신청
  | "resume" // 재개
  | "resend"; // 재발송

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
  advertiserName: string; // 광고주명
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

//
export type SmPayAdvertiserStautsOrderType =
  | "ADVERTISER_REGISTER_DESC"
  | "ADVERTISER_REGISTER_ASC"
  | "ADVERTISER_STATUS_DESC"
  | "ADVERTISER_STATUS_ASC"
  | "ADVERTISER_NAME_DESC"
  | "ADVERTISER_NAME_ASC"
  | "ADVERTISER_ID_DESC"
  | "ADVERTISER_ID_ASC"
  | "ADVERTISER_CUSTOMER_ID_DESC"
  | "ADVERTISER_CUSTOMER_ID_ASC";

// SMPay 관리 > 광고주 상태 데이터 DTO
export type SmPayAdvertiserStatusDto = {
  userId: number;
  userName: "회원 이름";
  advertiserCustomerId: number;
  advertiserLoginId: string;
  advertiserName: string;
  advertiserType: SmPayAdvertiserStautsOrderType;
  description: string;
  descriptionRegisterDt: string;
  registerOrUpdateDt: string;
  isMyAdvertiser: true;
};

// SMPay 신청 > 광고주 목록 광고주 데이터 DTO
export type SmPayAdvertiserApplyDto = {
  advertiserCustomerId: number;
  advertiserLoginId: string;
  advertiserNickName: number;
  advertiserName: string;
  advertiserType: SmPayAdvertiserStautsOrderType;
  registerOrUpdateDt: string;
};
