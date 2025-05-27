import {
  getDepartmentsApi,
  putDepartmentsApi,
  TDepartmentsPutParams,
} from "@/services/departments";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import type { TDepartmentFolder } from "@/types/department";

// 대행사 부서 전체 조회 query
export const useQueryDepartments = (
  agentId: number,
  options?: Partial<UseQueryOptions<TDepartmentFolder[], Error>>
) => {
  return useQuery({
    queryKey: ["departments", agentId],
    queryFn: () => getDepartmentsApi(agentId),
    enabled: !!agentId,
    ...options,
  });
};

// 대행사 부서 수정 mutation
export const useMutationDepartments = (
  options?: Partial<UseMutationOptions<null, Error, TDepartmentsPutParams>>
) => {
  return useMutation({
    mutationFn: (params) => putDepartmentsApi(params),
    ...options,
  });
};


