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
  jobStatus: AdvertiserSyncStatus;
  isBizMoneySync: boolean;
  description: string;
  isLossPrivilege: boolean;
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

// NOT_AGREE : 광고주 미동의 AGREE_REQUEST : 광고주 동의 요청 AGREE_PERIOD_EXPIRE : 광고주 동의 기한 만료 AGREE_COMPLETE : 광고주 동의 완료 WAIT_REVIEW : 심사 대기 REVIEW_SUCCESS : 심사 승인 REJECT : 반려 PAUSE : 일시중지 TERMINATE : 해지 TERMINATE_REQUEST : 해지 신청
export type TAdvertiserStatus =
  | "NOT_AGREE"
  | "AGREE_REQUEST"
  | "AGREE_PERIOD_EXPIRE"
  | "AGREE_COMPLETE"
  | "WAIT_REVIEW"
  | "REVIEW_SUCCESS"
  | "REJECT"
  | "PAUSE"
  | "TERMINATE"
  | "TERMINATE_REQUEST";

export type TAdvertiserSyncCompleteSync = {
  advertiserSyncId: number;
  advertiserId: number;
  syncStatus: TSyncType;
  jobStatus: AdvertiserSyncStatus;
  description: string;
};

export type TAdvertiserBizMoneyOrderType =
  | "NO_ASC"
  | "NO_DESC"
  | "CUSTOMER_ASC"
  | "CUSTOMER_DESC"
  | "ADVERTISER_ID_ASC"
  | "ADVERTISER_ID_DESC"
  | "ADVERTISER_NICKNAME_ASC"
  | "ADVERTISER_NICKNAME_DESC"
  | "ADVERTISER_NAME_ASC"
  | "ADVERTISER_NAME_DESC"
  | "BIZ_MONEY_ASC"
  | "BIZ_MONEY_DESC"
  | "REGISTER_ASC"
  | "REGISTER_DESC";

export type TAdvertiserBizMoney = {
  rowNumber: number;
  customerId: number;
  id: string;
  nickName: string;
  name: string;
  bizMoneyAmount: number;
  registerOrUpdateTime: string;
};
