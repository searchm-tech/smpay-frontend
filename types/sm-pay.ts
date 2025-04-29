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

export type SmPayStatus =
  | "ADVERTISER_AGREEMENT_REQUEST" // 광고주 동의 요청
  | "ADVERTISER_DISAGREED" // 광고주 미동의
  | "ADVERTISER_AGREEMENT_EXPIRED" // 광고주 동의기한 만료
  | "ADVERTISER_AGREEMENT_COMPLETED" // 광고주 동의 완료
  | "REVIEW_PENDING" // 심사 대기
  | "REVIEW_APPROVED" // 심사 승인
  | "REJECTED" // 반려
  | "SUSPENDED" // 일시중지
  | "TERMINATION_IN_PROGRESS" // 해지 신청 진행
  | "TERMINATED"; // 해지

// sm-pay 관리 > 테이블 상태 버튼
export type ActionButton =
  | "view"
  | "cancel"
  | "resend"
  | "request"
  | "stop"
  | "terminate"
  | "resume";
