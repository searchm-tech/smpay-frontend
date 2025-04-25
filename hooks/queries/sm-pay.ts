import { fetchSmPayData } from "@/services/sm-pay";
import type { FetchSmPayParams, SmPayResponse } from "@/services/types";
import { useQuery } from "@tanstack/react-query";

export const useSmPayList = (params: FetchSmPayParams) => {
  return useQuery<SmPayResponse>({
    queryKey: ["/smpay/list", params],
    queryFn: () => fetchSmPayData(params),
    staleTime: 1000 * 60,
  });
};
