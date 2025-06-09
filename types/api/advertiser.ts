import type {
  AdvertiserOrderType,
  AdvertiserSyncStatus,
  TAdvertiser,
  TAdvertiserBizMoney,
  TAdvertiserBizMoneyOrderType,
  TAdvertiserSyncCompleteStatus,
  TAdvertiserSyncCompleteSync,
} from "@/types/adveriser";

// 광고주 리스트 페이지네이션 조회 request type
export type RequestAdvertiserList = {
  page: number;
  size: number;
  keyword: string;
  orderType: AdvertiserOrderType;
  agentId?: number;
  userId?: number;
};

// 광고주 리스트 페이지네이션 조회 response type
export type ResponseAdvertiserList = {
  content: TAdvertiser[];
  page: number;
  size: number;
  totalCount: number;
};

export type RequestAdvertiserSyncStatus = {
  agentId: number;
  userId: number;
  jobList: {
    advertiserId: number;
    status: AdvertiserSyncStatus;
  }[];
};

export type RequestAdvertiserSync = {
  agentId: number;
  userId: number;
  advertiserIds: number[];
  startDate?: string; // 나중에 수동으로 동기화 할 수 있어서... 지금은 사용 안함
  endDate?: string; // 나중에 수동으로 동기화 할 수 있어서... 지금은 사용 안함
};

// 광고주 데이터 동기화 완료 리스트 조회 response type
export type ResponseAdvertiserSyncCompleteList = {
  advertiserId: number;
  userId: number;
  customerId: number;
  id: string;
  nickName: string;
  representativeName: string;
  businessRegistrationNumber: string;
  phoneNumber: string;
  emailAddress: string;
  status: TAdvertiserSyncCompleteStatus;
  name: string;
  roleId: number;
  sync: TAdvertiserSyncCompleteSync;
};

export type RequestAdvertiserBizMoneyList = {
  page: number;
  size: number;
  keyword: string;
  orderType: TAdvertiserBizMoneyOrderType;
  agentId?: number;
  userId?: number;
};

export type ResponseAdvertiserBizMoneyList = {
  content: TAdvertiserBizMoney[];
  page: number;
  size: number;
  totalCount: number;
};
