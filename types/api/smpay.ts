import {
  SmPayAdvertiserApplyDto,
  SmPayAdvertiserApplyStatus,
  SmPayAdvertiserStatusDto,
  SmPayAdvertiserStautsOrderType,
} from "@/types/smpay";

import { RequestAgentUser } from "./common";

// 광고주 상태 갯수 조회(SAG020) response type
export interface ResponseSmPayStatusCount {
  totalCount: number;
  waitReviewCount: number;
  rejectCount: number;
  operationReviewCount: number;
  operationRejectCount: number;
  operationReviewSuccessCount: number;
  advertiserAgreeWaitCount: number;
  advertiserAgreeTimeExpireCount: number;
  cancelCount: number;
  registerWithDrawAccountFailCount: number;
  operationCount: number;
  pauseCount: number;
  terminateWaitCount: number;
  terminateCount: number;
}

// 광고주 상태 리스트 페이지네이션 조회(SAG019) request type
export type RequestSmPayAdvertiserStatus = {
  user: RequestAgentUser;
  queryParams: QueryParams;
};

// 광고주 상태 리스트 페이지네이션 조회(SAG019) query params type
export type QueryParams = {
  page: number;
  size: number;
  keyword: string;
  orderType: SmPayAdvertiserStautsOrderType;
};

// 광고주 상태 리스트 페이지네이션 조회(SAG019) response type
export type ResponseSmPayAdvertiserStatus = {
  content: SmPayAdvertiserStatusDto[];
  page: number;
  size: number;
  totalCount: number;
};

// 광고주 상태 리스트 페이지네이션 조회(SAG019) query params type
export type SmPayAdvertiserApplyQuery = {
  page: number;
  size: number;
  keyword: string;
  orderType: SmPayAdvertiserApplyStatus;
};

// 광고주 smPay 신청 관리 리스트 조회(SAG022) request type
export type RequestSmPayAdvertiserApply = {
  user: RequestAgentUser;
  queryParams: SmPayAdvertiserApplyQuery;
};

// 광고주 smPay 신청 관리 리스트 조회(SAG022) response type
export type ResponseSmPayAdvertiserApply = {
  content: SmPayAdvertiserApplyDto[];
  page: number;
  size: number;
  totalCount: number;
};

// 광고주 detail 조회(SAG024) request type
export type RequestSmPayAdvertiserDetail = {
  user: RequestAgentUser;
  advertiserId: number;
};

// 광고주 detail 조회(SAG024) response type
export type ResponseSmPayAdvertiserDetail = {
  advertiserId: number;
  userId: number;
  customerId: number;
  id: string;
  nickName: string;
  name: string;
  representativeName: string;
  businessRegistrationNumber: string;
  phoneNumber: string;
  emailAddress: string;
  status: SmPayAdvertiserApplyStatus;
  roleId: number;
  isLossPrivileges: boolean;
};

// 광고주 detail 등록 및 수정(SAG023) request type
export type RequestSmPayAdvertiserDetailPut = {
  user: RequestAgentUser;
  advertiserId: number;
  params: PutSmPayAdvertiserDetail;
};

export type PutSmPayAdvertiserDetail = {
  name: string;
  representativeName: string;
  representativeNumber: string;
  phoneNumber: string;
  email: string;
};

// 광고주 성과 기반 참고용 심사 지표 조회(28일)(SAG028) request type
export type RequestSmPayAdvertiserStatIndicator = {
  user: RequestAgentUser;
  advertiserId: number;
};

// 광고주 성과 기반 참고용 심사 지표 조회(28일)(SAG028) response type
export type ResponseSmPayAdvertiserStatIndicator = {
  operationPeriod: number; // 운영 기간
  dailyAverageRoas: number; // 일별 평균 ROAS 1.0,
  monthlyConvAmt: number; // 월별 전환액 1000.0,
  dailySalesAmt: number; // 일별 매출액 100.0,
  recommendRoas: number; // 권장 ROAS  0.8,
};
