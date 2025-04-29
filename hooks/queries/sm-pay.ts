import {
  useQuery,
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";

import {
  fetchSmPayData,
  getSmPayRuleInfo,
  getSmPayScheduleInfo,
  getSmPaySubmitDetail,
  updateSmPayRuleInfo,
  updateSmPayScheduleInfo,
} from "@/services/sm-pay";

import type {
  FetchSmPayParams,
  SmPayResponse,
  SmPayRuleInfoResponse,
  SmPayScheduleInfoResponse,
  SmPaySubmitDetailResponse,
} from "@/services/types";
import type { RuleInfo, ScheduleInfo } from "@/types/sm-pay";

export const useSmPayList = (params: FetchSmPayParams) => {
  return useQuery<SmPayResponse>({
    queryKey: ["/smpay/list", params],
    queryFn: () => fetchSmPayData(params),
    staleTime: 1000 * 60,
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
