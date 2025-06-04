export interface AdvertiserData {
  id: number;
  name: string;
  customerId: string;
  loginId: string;
  advertiserName: string;
  status: AdvertiserStatus;
  updatedAt: string;
  businessName: string;
  businessNumber: string;
  businessOwnerName: string;
  businessOwnerPhone: string;
  businessOwnerEmail: string;
}

export type AdvertiserStatus =
  | "AVAILABLE" // 신청 가능 (신청 가능)
  | "AGREEMENT_REQUEST" // 광고주 동의 요청
  | "AGREEMENT_REJECTED" // 광고주 미동의 (신청 가능)
  | "AGREEMENT_EXPIRED" // 광고주 동의 기한 만료
  | "AGREEMENT_COMPLETED" // 광고주 동의 완료
  | "REVIEW_REQUEST" // 심사 요청
  | "REVIEW_PENDING" // 심사 대기
  | "REVIEW_APPROVED" // 심사 승인
  | "REVIEW_REJECTED"; // 심사 반려 (신청 가능)

export type TAdvertiser = {
  advertiserId: number;
  customerId: number;
  id: string;
  nickname: string;
  name: string;
  isAdvertiserRegister: boolean;
  syncType: TSyncType;
  description: string;
  registerOrUpdateDt: string;
};

export type AdvertiserOrderType =
  | "ADVERTISER_ID_ASC"
  | "ADVERTISER_ID_DESC"
  | "ADVERTISER_REGISTER_ASC"
  | "ADVERTISER_REGISTER_DESC"
  | "ADVERTISER_SYNC_ASC"
  | "ADVERTISER_SYNC_DESC"
  | "ADVERTISER_REGISTER_TIME_ASC"
  | "ADVERTISER_REGISTER_TIME_DESC";

export type TSyncType = "SYNC" | "UNSYNC" | "FAIL";

export type AdvertiserSyncStatus = "IN_PROGRESS" | "BEFORE_PROGRESS" | "DONE";
// BEFORE_PROGRESS: 작업 실행 전, IN_PROGRESS: 작업 중, DONE: 작업 완료
