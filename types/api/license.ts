import { TCustomer } from "../license";

// 마케터 API 라이선스 등록 + 수정 (SAG008) request type
export type TRequestLicenseCreate = {
  agentId: string;
  userId: string;
  customerId: number;
  apiKey: string;
  secretKey: string;
};

// 마케터 API 라이선스 조회 (SAG009) response type
export type TResponseLicense = {
  userId: number;
  customerId: number;
  accessLicense: string;
  secretKey: string;
};

// 마케터 API 라이선스 삭제 (SAG011) request type
export type TRequestLicenseDelete = {
  agentId: string;
  userId: string;
};

// 광고주 리스트 조회 (SAG012) response type
export type TResponseCustomersList = {
  content: TCustomer[];
  page: number;
  size: number;
  totalCount: number;
};

// 광고주 리스트 조회 (SAG013) request type
export type TRequestCustomersList = {
  page: number;
  size: number;
  keyword: string;
  orderType: CustomerOrderType;
};

export type CustomerOrderType =
  | "ADVERTISER_REGISTER_ASC"
  | "ADVERTISER_REGISTER_DESC" // 등록 여부
  | "ADVERTISER_SYNC_ASC"
  | "ADVERTISER_SYNC_DESC" // 동기화 여부
  | "ADVERTISER_REGISTER_TIME_ASC"
  | "ADVERTISER_REGISTER_TIME_DESC"; // 최종 광고 데이터 동기화 시간
