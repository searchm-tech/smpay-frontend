import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  AgencyData,
  checkAgencyCode,
  checkBusinessNumber,
  checkCompanyEmailDomain,
  getAgencies,
  getAgency,
  getAgencyAllApi,
  registerAgency,
  updateAgency,
} from "@/services/agency";
import { postAgencyUserEmailApi } from "@/services/user";

import type { TableParams } from "@/types/table";
import type { TAgency } from "@/types/agency";
import type { TAgencyUserEmailParams } from "@/services/user";

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

// --- 실제 API 호출 ---

// 대행사 전체 리스트 조회 쿼리
export const useQueryAgencyAll = (
  options?: Partial<UseQueryOptions<TAgency[], Error>>
) => {
  return useQuery<TAgency[]>({
    queryKey: ["agencyAll"],
    queryFn: getAgencyAllApi,
    initialData: [],
    ...options,
  });
};

// 대행사 최상위 그룹장 회원 초대 메일 발송 뮤테이션
export const useMutationAgencySendMail = (
  options?: UseMutationOptions<AgencyData | null, Error, TAgencyUserEmailParams>
) => {
  return useMutation<AgencyData | null, Error, TAgencyUserEmailParams>({
    mutationFn: (params: TAgencyUserEmailParams) =>
      postAgencyUserEmailApi(params),
    ...options,
  });
};
