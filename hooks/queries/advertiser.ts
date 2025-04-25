import { useQuery } from "@tanstack/react-query";
import { fetchAdvertisers } from "@/services/advertiser";
import type { FetchAdvertiserParams } from "@/services/types";

export const useAdvertiserList = (params: FetchAdvertiserParams) => {
  return useQuery({
    queryKey: ["advertisers", params],
    queryFn: () => fetchAdvertisers(params),
  });
};
