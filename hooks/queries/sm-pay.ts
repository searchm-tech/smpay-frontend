import {
  useQuery,
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";

import {
  fetchSmPayData,
  getSmPayJudgementData,
  getSmPayJudgementStatus,
  getSmPayRejectReason,
  getSmPayStatus,
  getSmPayStopInfo,
  getSmPaySubmitDetail,
  updateSmPayScheduleInfo,
  updateSmPayStatus,
} from "@/services/sm-pay";

import type {
  SmPayRejectReasonResponse,
  TableParams,
  SmPayResponse,
  SmPayScheduleInfoResponse,
  SmPaySubmitDetailResponse,
  SmPayJudgementDataResponse,
  SmPayStopInfoResponse,
  SmPayStatusResponse,
  SmPayJudgementStatusResponse,
} from "@/services/types";
import type { ScheduleInfo, BooleanResponse } from "@/types/sm-pay";
import type { RequestAgentUser } from "@/types/api/common";
import type {
  ResponseSmPayAdvertiserStatus,
  ResponseSmPayStatusCount,
  ResponseSmPayAdvertiserApply,
  QueryParams,
  SmPayAdvertiserApplyQuery,
  PutSmPayAdvertiserDetail,
  ResponseSmPayAdvertiserDetail,
  ResponseSmPayAdvertiserStatIndicator,
} from "@/types/api/smpay";

import { useAuthQuery } from "../useAuthQuery";
import { useAuthMutation } from "../useAuthMutation";
import {
  getSmPayAdvertiserApplyList,
  getSmPayAdvertiserDetail,
  getSmPayAdvertiserStatIndicator,
  getSmPayAdvertiserStatusList,
  getSmPayStatusCountList,
  putSmPayAdvertiserDetail,
  getSmPayAdvertiserDailyStat,
} from "@/services/smpay";
import type { DailyStat } from "@/types/smpay";

export const useSmPayList = (params: TableParams) => {
  return useQuery<SmPayResponse>({
    queryKey: ["/smpay/list", params],
    queryFn: () => fetchSmPayData(params),
    staleTime: 1000 * 60,
  });
};

// 삭제 예정
export const useSmPayStatus = () => {
  return useQuery<SmPayStatusResponse>({
    queryKey: ["/smpay/status"],
    queryFn: () => getSmPayStatus(),
  });
};

export const useSmPaySubmitDetail = (id: string) => {
  return useQuery<SmPaySubmitDetailResponse>({
    queryKey: ["/smpay/submit-detail", id],
    queryFn: () => getSmPaySubmitDetail(id),
    enabled: !!id,
    initialData: {
      data: null,
      success: false,
    },
  });
};

type ScheduleInfoParams = {
  id: string;
  params: ScheduleInfo;
};

export const useSmPayScheduleInfoUpdate = (
  options?: UseMutationOptions<
    SmPayScheduleInfoResponse,
    Error,
    ScheduleInfoParams
  >
) => {
  return useMutation<SmPayScheduleInfoResponse, Error, ScheduleInfoParams>({
    mutationFn: ({ id, params }) => updateSmPayScheduleInfo(id, params),
    ...options,
  });
};

export const useSmPayRejectReason = (id: string) => {
  return useQuery<SmPayRejectReasonResponse>({
    queryKey: ["/smpay/reject-reason", id],
    queryFn: () => getSmPayRejectReason(id),
    enabled: !!id,
    initialData: {
      data: "",
      success: false,
    },
  });
};

export const useSmPayStopInfo = (id: string) => {
  return useQuery<SmPayStopInfoResponse>({
    queryKey: ["/smpay/stop-info", id],
    queryFn: () => getSmPayStopInfo(id),
    enabled: !!id,
    initialData: {
      data: {
        date: "",
        reason: "",
      },
      success: false,
    },
  });
};

type StatusParams = {
  id: string;
  status: string;
};

export const useSmPayStatusUpdate = (
  options?: UseMutationOptions<BooleanResponse, Error, StatusParams>
) => {
  return useMutation<BooleanResponse, Error, StatusParams>({
    mutationFn: ({ id, status }) => updateSmPayStatus(id, status),
    ...options,
  });
};

export const useSmPayJudgementData = (params: TableParams) => {
  return useQuery<SmPayJudgementDataResponse>({
    queryKey: ["/smpay/judgement-data", params],
    queryFn: () => getSmPayJudgementData(params),
  });
};

export const useSmPayJudgementStatus = () => {
  return useQuery<SmPayJudgementStatusResponse>({
    queryKey: ["/smpay/judgement-status"],
    queryFn: () => getSmPayJudgementStatus(),
  });
};

// ------------- 실제 react-query -----------

// 광고주 상태 갯수 조회(SAG020) query
export const useSmPayStatusCountList = () => {
  return useAuthQuery<ResponseSmPayStatusCount>({
    queryKey: ["/smpay/status-count-list"],
    queryFn: (user: RequestAgentUser) => getSmPayStatusCountList(user),
  });
};

// 광고주 상태 리스트 페이지네이션 조회(SAG019) query
export const useSmPayAdvertiserStatusList = (params: QueryParams) => {
  return useAuthQuery<ResponseSmPayAdvertiserStatus>({
    queryKey: ["/smpay/advertiser-status-list", params],
    queryFn: (user: RequestAgentUser) =>
      getSmPayAdvertiserStatusList({ user, queryParams: params }),
  });
};

// 광고주 smPay 신청 관리 리스트 조회(SAG022) query
export const useSmPayAdvertiserApplyList = (
  params: SmPayAdvertiserApplyQuery
) => {
  return useAuthQuery<ResponseSmPayAdvertiserApply>({
    queryKey: ["/smpay/advertiser-apply-list", params],
    queryFn: (user: RequestAgentUser) =>
      getSmPayAdvertiserApplyList({ user, queryParams: params }),
  });
};

// useSmPayAdvertiserUpdate 훅에 전달될 variables 타입 정의
type SmPayAdvertiserUpdateVariables = {
  advertiserId: number;
  params: PutSmPayAdvertiserDetail;
};

// 광고주 detail 등록 및 수정(SAG023) mutate
export const useSmPayAdvertiserUpdate = (
  options?: UseMutationOptions<null, Error, SmPayAdvertiserUpdateVariables>
) => {
  return useAuthMutation<null, Error, SmPayAdvertiserUpdateVariables>({
    mutationFn: (variables, user) =>
      putSmPayAdvertiserDetail({
        user,
        advertiserId: variables.advertiserId,
        params: variables.params,
      }),
    ...options,
  });
};

// 광고주 detail 조회(SAG024) query
export const useSmPayAdvertiserDetail = (advertiserId: number) => {
  return useAuthQuery<ResponseSmPayAdvertiserDetail>({
    queryKey: ["/smpay/advertiser-detail", advertiserId],
    queryFn: (user: RequestAgentUser) =>
      getSmPayAdvertiserDetail({ user, advertiserId }),
  });
};

// 광고주 성과 기반 참고용 심사 지표 조회(28일)(SAG028) query
export const useSmPayAdvertiserStatIndicator = (advertiserId: number) => {
  return useAuthQuery<ResponseSmPayAdvertiserStatIndicator>({
    queryKey: ["/smpay/advertiser-stat-indicator", advertiserId],
    queryFn: (user: RequestAgentUser) =>
      getSmPayAdvertiserStatIndicator({ user, advertiserId }),
  });
};

// 광고주 일 별 성과 조회(28일)(SAG027) query
export const useSmPayAdvertiserDailyStat = (advertiserId: number) => {
  return useAuthQuery<DailyStat[]>({
    queryKey: ["/smpay/advertiser-daily-stat", advertiserId],
    queryFn: (user: RequestAgentUser) =>
      getSmPayAdvertiserDailyStat({ user, advertiserId }),
  });
};
