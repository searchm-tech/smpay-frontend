import {
  useQuery,
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";

import {
  fetchSmPayData,
  getSmPayRuleInfo,
  getSmPaySubmitDetail,
  updateSmPayRuleInfo,
} from "@/services/sm-pay";

import type {
  FetchSmPayParams,
  SmPayResponse,
  SmPayRuleInfoResponse,
  SmPaySubmitDetailResponse,
} from "@/services/types";
import type { RuleInfo } from "@/types/sm-pay";

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
