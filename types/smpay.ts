export type SmPayAdvertiserApplyStatus =
  | "UNSYNC_ADVERTISER"
  | "APPLICABLE"
  | "WAIT_REVIEW"
  | "REJECT"
  | "OPERATION_REVIEW"
  | "OPERATION_REJECT"
  | "OPERATION_REVIEW_SUCCESS"
  | "OPERATION"
  | "PAUSE"
  | "TERMINATE_WAIT"
  | "TERMINATE"
  | "ADVERTISER_AGREE_WAIT"
  | "ADVERTISER_AGREE_TIME_EXPIRE"
  | "CANCEL"
  | "REGISTER_WITHDRAW_ACCOUNT_FAIL";

// SMPay 신청 > 광고주 목록 광고주 데이터 DTO
export type SmPayAdvertiserApplyDto = {
  advertiserId: number;
  advertiserCustomerId: number;
  advertiserLoginId: string;
  advertiserNickName: number;
  advertiserName: string;
  advertiserType: SmPayAdvertiserApplyStatus;
  registerOrUpdateDt: string;
};

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
  advertiserType: SmPayAdvertiserApplyStatus;
  description: string;
  descriptionRegisterDt: string;
  registerOrUpdateDt: string;
  isMyAdvertiser: true;
};
