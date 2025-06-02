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

export type TSyncType = "SYNC" | "UNSYNC" | "FAIL";
