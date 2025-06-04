import type { AdvertiserOrderType, TAdvertiser } from "@/types/adveriser";

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
