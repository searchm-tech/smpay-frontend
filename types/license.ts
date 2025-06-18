// TODO : 삭제  - 광고주 목록 조회 api
export type TCustomer = {
  advertiserId: number;
  customerId: number;
  id: string;
  nickname: string;
  name: string;
  isAdvertiserRegister: boolean; // true : 등록, false : 미등록
  syncType: TSyncType;
  description: string;
  registerOrUpdateDt: string;
};

// TODO : 삭제  - 광고주 목록 조회 api
export type TSyncType = "SYNC" | "UNSYNC" | "FAIL";

// 광고주 데이터 동기화 작업 타입
export type AdvertiserJobType = "BEFORE_PROGRESS" | "IN_PROGRESS" | "DONE";

// 광고주 데이터 동기화 Sync 정보
export type TAdvertiserSync = {
  advertiserSyncId: number;
  advertiserId: number;
  syncStatus: TSyncType;
  jobStatus: AdvertiserJobType;
  isBizMoneySync: boolean;
  description: string;
};
