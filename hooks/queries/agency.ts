import {
  useMutation,
  useQuery,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  AgencyData,
  checkAgencyCode,
  checkBusinessNumber,
  checkCompanyEmailDomain,
  getAgencies,
  getAgency,
  registerAgency,
  updateAgency,
} from "@/services/agency";

import type { TableParams } from "@/types/table";

// 대행사 목록 > 대행사 목록  query
export const useAgencyList = (params: TableParams) => {
  return useQuery({
    queryKey: ["agencies", params],
    queryFn: () => getAgencies(params),
  });
};

// 대행사 상세 > 대행사 상세  query
export const useAgencyDetail = (id: string) => {
  return useQuery<AgencyData | null>({
    queryKey: ["agency", id],
    queryFn: () => getAgency(id),
  });
};

// 대행사 정보 수정 > 대행사 정보 수정  query
export const useAgencyUpdate = (
  options?: UseMutationOptions<AgencyData | null, Error, AgencyData>
) => {
  return useMutation<AgencyData | null, Error, AgencyData>({
    mutationFn: (data: AgencyData) => updateAgency(data.id, data),
    ...options,
  });
};

// 대행사 등록 > 대행사 고유코드 중복 확인 mutation
export const useCheckAgencyCode = (
  options?: UseMutationOptions<boolean, Error, string>
) => {
  return useMutation<boolean, Error, string>({
    mutationFn: (code: string) => checkAgencyCode(code),
    ...options,
  });
};

// 대행사 등록 > 사업자 등록 번호 중복 확인 mutation
export const useCheckBusinessNumber = (
  options?: UseMutationOptions<boolean, Error, string>
) => {
  return useMutation<boolean, Error, string>({
    mutationFn: (number: string) => checkBusinessNumber(number),
    ...options,
  });
};

// 대행사 등록 > 회사 메일 도메인 중복 확인 mutation
export const useCheckCompanyEmailDomain = (
  options?: UseMutationOptions<boolean, Error, string>
) => {
  return useMutation<boolean, Error, string>({
    mutationFn: (domain: string) => checkCompanyEmailDomain(domain),
    ...options,
  });
};

// 대행사 등록 > 대행사 등록 mutation
export const useRegisterAgency = (
  options?: UseMutationOptions<AgencyData | null, Error, AgencyData>
) => {
  return useMutation<AgencyData | null, Error, AgencyData>({
    mutationFn: (data: AgencyData) => registerAgency(data),
    ...options,
  });
};
