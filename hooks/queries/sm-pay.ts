import {
  useQuery,
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";

import {
  fetchSmPayData,
  getSmPayAdvertiserStatusList,
  getSmPayJudgementData,
  getSmPayJudgementStatus,
  getSmPayRejectReason,
  getSmPayRuleInfo,
  getSmPayStatus,
  getSmPayStatusCountList,
  getSmPayStopInfo,
  getSmPaySubmitDetail,
  updateSmPayScheduleInfo,
  updateSmPayStatus,
} from "@/services/sm-pay";

import type {
  SmPayRejectReasonResponse,
  TableParams,
  SmPayResponse,
  SmPayRuleInfoResponse,
  SmPayScheduleInfoResponse,
  SmPaySubmitDetailResponse,
  SmPayJudgementDataResponse,
  SmPayStopInfoResponse,
  SmPayStatusResponse,
  SmPayJudgementStatusResponse,
} from "@/services/types";
import type { RuleInfo, ScheduleInfo, BooleanResponse } from "@/types/sm-pay";
import type { RequestAgentUser } from "@/types/api/common";
import type {
  ResponseSmPayAdvertiserStatus,
  ResponseSmPayStatusCount,
  QueryParams,
} from "@/types/api/smpay";

import { useAuthQuery } from "@/hooks/useAuthQuery";

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
export const useSmPayRuleInfo = (id: string) => {
  return useQuery<SmPayRuleInfoResponse>({
    queryKey: ["/smpay/rule-info", id],
    queryFn: () => getSmPayRuleInfo(id),
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
