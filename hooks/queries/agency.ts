import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  AgencyData,
  getAgency,
  getAgencyAllApi,
  getAgencyApi,
  postAgencyRegister,
  updateAgency,
} from "@/services/agency";
import { postAgencyUserEmailApi } from "@/services/user";

import type { TableParams } from "@/types/table";
import type { TAgency } from "@/types/agency";
import type { TAgencyUserEmailParams } from "@/types/api/user";
import type {
  RequestAgencyRegister,
  RequestAgencys,
  ResponseAgencyRegister,
  ResponseAgencys,
} from "@/types/api/agency";

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

// ------------ 실제 API query ------------

// 대행사 페이지네이션 리스트 조회 (AAG003) query
export const useQueryAgencyApi = (
  params: RequestAgencys,
  options?: Partial<UseQueryOptions<ResponseAgencys, Error>>
) => {
  return useQuery<ResponseAgencys>({
    queryKey: ["agencyApi", params],
    queryFn: () => getAgencyApi(params),
    ...options,
  });
};

// 대행사 회원가입 (AAG001) - 대행사 등록 mutation
export const useMutationAgencyRegister = (
  options?: UseMutationOptions<
    ResponseAgencyRegister,
    Error,
    RequestAgencyRegister
  >
) => {
  return useMutation<ResponseAgencyRegister, Error, RequestAgencyRegister>({
    mutationFn: (data: RequestAgencyRegister) => postAgencyRegister(data),
    ...options,
  });
};
