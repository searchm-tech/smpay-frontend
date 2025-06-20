import { SmPayAdvertiserApplyStatus } from "@/types/smpay";
import {
  SmPayAdvertiserApplyDto,
  SmPayAdvertiserStatusDto,
  SmPayAdvertiserStautsOrderType,
} from "../sm-pay";
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
