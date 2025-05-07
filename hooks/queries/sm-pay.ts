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
  getSmPayRuleHistory,
  getSmPayRuleInfo,
  getSmPayScheduleInfo,
  getSmPayStatus,
  getSmPayStopInfo,
  getSmPaySubmitDetail,
  updateSmPayApplySubmit,
  updateSmPayRuleInfo,
  updateSmPayScheduleInfo,
  updateSmPayStatus,
} from "@/services/sm-pay";

import type {
  SmPayRejectReasonResponse,
  FetchSmPayParams,
  SmPayResponse,
  SmPayRuleHistoryResponse,
  SmPayRuleInfoResponse,
  SmPayScheduleInfoResponse,
  SmPaySubmitDetailResponse,
  SmPayJudgementDataResponse,
  SmPayStopInfoResponse,
  SmPayStatusResponse,
  SmPayJudgementStatusResponse,
} from "@/services/types";
import type { RuleInfo, ScheduleInfo, BooleanResponse } from "@/types/sm-pay";

export const useSmPayList = (params: FetchSmPayParams) => {
  return useQuery<SmPayResponse>({
    queryKey: ["/smpay/list", params],
    queryFn: () => fetchSmPayData(params),
    staleTime: 1000 * 60,
  });
};

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

type RuleInfoParams = {
  id: string;
  params: RuleInfo;
};

export const useSmPayRuleInfoUpdate = (
  options?: UseMutationOptions<SmPayRuleInfoResponse, Error, RuleInfoParams>
) => {
  return useMutation<SmPayRuleInfoResponse, Error, RuleInfoParams>({
    mutationFn: ({ id, params }) => updateSmPayRuleInfo(id, params),
    ...options,
  });
};

export const useSmPayScheduleInfo = (id: string) => {
  return useQuery<SmPayScheduleInfoResponse>({
    queryKey: ["/smpay/schedule-info", id],
    queryFn: () => getSmPayScheduleInfo(id),
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

export const useSmPayRuleHistory = (id: string) => {
  return useQuery<SmPayRuleHistoryResponse>({
    queryKey: ["/smpay/rule-history", id],
    queryFn: () => getSmPayRuleHistory(id),
    enabled: !!id,
    initialData: {
      data: [],
      success: false,
    },
  });
};

export const useSmPayApplySubmit = (
  options?: UseMutationOptions<BooleanResponse, Error, string>
) => {
  return useMutation<BooleanResponse, Error, string>({
    mutationFn: (id) => updateSmPayApplySubmit(id),
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

export const useSmPayJudgementData = (params: FetchSmPayParams) => {
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
