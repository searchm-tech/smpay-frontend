import type { TAgency, TAgencyData, TAgencyStatus } from "@/types/agency";

// 대행사 페이지네이션 리스트 조회 응답 타입
export type ResponseAgencys = {
  content: TAgencyData[];
  page: number;
  size: number;
  totalCount: number;
};

// 대행사 페이지네이션 리스트 조회 요청 타입
export type RequestAgencys = {
  page: number;
  size: number;
  keyword: string;
  orderType: TAgencyOrder;
};

export type TAgencyOrder =
  | "NO_ASC"
  | "NO_DESC"
  | "AGENT_ASC"
  | "AGENT_DESC"
  | "USER_TYPE_ASC"
  | "USER_TYPE_DESC"
  | "NAME_ASC"
  | "NAME_DESC"
  | "LOGIN_ID_ASC"
  | "LOGIN_ID_DESC"
  | "STATUS_ASC"
  | "STATUS_DESC"
  | "REGISTER_DT_ASC"
  | "REGISTER_DT_DESC";

// 대행사 등록 요청 타입
export type RequestAgencyRegister = {
  name: string;
  uniqueCode: string;
  representativeName: string;
  businessRegistrationNumber: string;
  domainName: string;
  agentBills: RequestAgencyBills[]; // 일단은 1개만 (나중에 여러개로 변경 될 수 있음)
};

export type RequestAgencyBills = {
  name: string;
  phoneNumber: string;
  emailAddress: string;
};

// 대행사 등록 응답 타입
export type ResponseAgencyRegister = {
  agentBills: ResponseAgencyBills[];
  agentId: number;
  name: string;
  uniqueCode: string;
  representativeName: string;
  businessRegistrationNumber: string;
  status: TAgencyStatus;
};

export type ResponseAgencyBills = {
  agentBillId: number;
  agentId: number;
  name: string;
  phoneNumber: string;
  emailAddress: string;
};

// 중복 체크 응답 타입
export type ResponseDuplicate = {
  duplicate: boolean;
};

// 대행사 상태 변경 params type
export type RequestAgencyStatus = {
  agentId: number;
  status: TAgencyStatus;
};

// 대행사 단일 정보 조회 response type
export type ResponseAgencyDetail = {
  agent: TAgency;
  agentBills: ResponseAgencyBills[];
};

// 대행사 정보 수정 request type
export type RequestPutAgencyBill = {
  agentId: number;
  bills: {
    name: string;
    phoneNumber: string;
    emailAddress: string;
  }[];
};
