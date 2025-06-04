import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  getAgencyAllApi,
  getAgencyApi,
  getAgencyDetail,
  getAgencyDomainNameApi,
  patchAgencyStatus,
  postAgencyRegister,
  putAgencyDetail,
} from "@/services/agency";
import { postAgencyUserEmailApi } from "@/services/user";

import type { TAgency } from "@/types/agency";
import type { RequestGroupMasterInvite } from "@/types/api/user";
import type {
  RequestAgencyRegister,
  RequestAgencys,
  RequestAgencyStatus,
  ResponseAgencyRegister,
  ResponseAgencys,
  ResponseAgencyDetail,
  RequestPutAgencyBill,
} from "@/types/api/agency";

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
  options?: UseMutationOptions<null, Error, RequestGroupMasterInvite>
) => {
  return useMutation<null, Error, RequestGroupMasterInvite>({
    mutationFn: (params: RequestGroupMasterInvite) =>
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

// 대행사 상태 변경 (AAG004) mutation
export const useMutationAgencyStatus = (
  options?: UseMutationOptions<null, Error, RequestAgencyStatus>
) => {
  return useMutation<null, Error, RequestAgencyStatus>({
    mutationFn: (params: RequestAgencyStatus) => patchAgencyStatus(params),
    ...options,
  });
};

// 대행사 도메인 이름 조회 query
export const useQueryAgencyDomainName = (
  code: string,
  options?: UseQueryOptions<TAgency, Error>
) => {
  return useQuery<TAgency>({
    queryKey: ["agencyDomainName", code],
    queryFn: () => getAgencyDomainNameApi(code),
    enabled: !!code,
    ...options,
  });
};

// 대행사 단일 정보 조회  query (AAG017)
export const useQueryAgencyDetail = (
  agentId: number,
  options?: UseQueryOptions<ResponseAgencyDetail | null, Error>
) => {
  return useQuery<ResponseAgencyDetail | null>({
    queryKey: ["agencyDetail", agentId],
    queryFn: () => getAgencyDetail(agentId),
    ...options,
  });
};

// 대행사 정보 수정 (AAG002) mutation
export const useMutationAgencyBillUpdate = (
  options?: UseMutationOptions<null, Error, RequestPutAgencyBill>
) => {
  return useMutation<null, Error, RequestPutAgencyBill>({
    mutationFn: (params: RequestPutAgencyBill) => putAgencyDetail(params),
    ...options,
  });
};
