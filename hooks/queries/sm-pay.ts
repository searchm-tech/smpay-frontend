import { fetchSmPayData, getSmPaySubmitDetail } from "@/services/sm-pay";
import type {
  FetchSmPayParams,
  SmPayResponse,
  SmPaySubmitDetailResponse,
} from "@/services/types";
import { useQuery } from "@tanstack/react-query";

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
  });
};
