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
