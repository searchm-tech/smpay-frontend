import {
  useMutation,
  useQuery,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  AgencyData,
  getAgencies,
  getAgency,
  updateAgency,
} from "@/services/agency";

import type { TableParams } from "@/types/table";

export const useAgencyList = (params: TableParams) => {
  return useQuery({
    queryKey: ["agencies", params],
    queryFn: () => getAgencies(params),
  });
};

export const useAgencyDetail = (id: string) => {
  return useQuery<AgencyData | null>({
    queryKey: ["agency", id],
    queryFn: () => getAgency(id),
  });
};

export const useAgencyUpdate = (
  options?: UseMutationOptions<AgencyData | null, Error, AgencyData>
) => {
  return useMutation<AgencyData | null, Error, AgencyData>({
    mutationFn: (data: AgencyData) => updateAgency(data.id, data),
    ...options,
  });
};
