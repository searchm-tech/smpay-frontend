import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  fetchAdvertisers,
  fetchAdvertiserDetail,
  checkAdvertiser,
  updateAdvertiser,
  SendAdvertiserAgreementParams,
  sendAdvertiserAgreement,
  getAdvertiserList,
  postAdvertiserSyncJobStatus,
  postAdvertiserSync,
  delAdvertiserSync,
} from "@/services/advertiser";
import type { FetchAdvertiserParams } from "@/services/types";
import type { AdvertiserData } from "@/types/adveriser";

import type {
  RequestAdvertiserList,
  RequestAdvertiserSync,
  RequestAdvertiserSyncStatus,
  ResponseAdvertiserList,
} from "@/types/api/advertiser";

export const useAdvertiserList = (params: FetchAdvertiserParams) => {
  return useQuery({
    queryKey: ["advertisers", params],
    queryFn: () => fetchAdvertisers(params),
  });
};

export const useAdvertiserDetail = (id: number) => {
  return useQuery({
    queryKey: ["advertiser", id],
    queryFn: () => fetchAdvertiserDetail(id),
  });
};

/**
 * 사업자등록번호 중복 체크
 * @param options
 * @returns
 */

interface CheckAdvertiserResponse {
  success: boolean;
  message?: string;
  data?: AdvertiserData;
}

export const useMutateCheckAdvertiser = (
  options?: UseMutationOptions<CheckAdvertiserResponse, Error, string>
) => {
  return useMutation({
    mutationFn: (businessNumber: string) => checkAdvertiser(businessNumber),
    ...options,
  });
};

/**
 * 광고주 상세 정보 수정
 * @param options
 * @returns
 */

interface UpdateAdvertiserResponse {
  success: boolean;
  message?: string;
  data?: AdvertiserData;
}

export const useMutateUpdateAdvertiser = (
  options?: UseMutationOptions<UpdateAdvertiserResponse, Error, AdvertiserData>
) => {
  return useMutation({
    mutationFn: (data: AdvertiserData) => updateAdvertiser(data.id, data),
    ...options,
  });
};

/**
 * 광고주 동의 요청 발송
 * @param options
 * @returns
 */

interface SendAdvertiserAgreementResponse {
  success: boolean;
  message?: string;
}

export const useMutateSendAdvertiserAgreement = (
  options?: UseMutationOptions<
    SendAdvertiserAgreementResponse,
    Error,
    SendAdvertiserAgreementParams
  >
) => {
  return useMutation({
    mutationFn: (params: SendAdvertiserAgreementParams) =>
      sendAdvertiserAgreement(params),
    ...options,
  });
};

// ---- 실제 react-query 사용 코드 ----

// 광고주 리스트 페이지네이션 조회 (SAG012) query
export const useQueryAdvertiserList = (
  params: RequestAdvertiserList,
  options?: UseQueryOptions<ResponseAdvertiserList, Error>
) => {
  return useQuery({
    queryKey: ["advertiserList", params],
    queryFn: () => getAdvertiserList(params),
    enabled: !!params.agentId && !!params.userId,
    ...options,
  });
};

// 광고주 데이터 동기화 작업 상태 변경 (SAG015) mutation
// Description :동기화 하기전, IN_PROGRESS 상태로 변경하여, 진행중으로 만들고, 서버에서 성공하면 동기화 api 실행할 것
export const useMutateAdvertiserSyncJobStatus = (
  options?: UseMutationOptions<null, Error, RequestAdvertiserSyncStatus>
) => {
  return useMutation({
    mutationFn: (params: RequestAdvertiserSyncStatus) =>
      postAdvertiserSyncJobStatus(params),
    ...options,
  });
};

// 광고주 데이터 동기화 (SAG013) mutation
export const useMutateAdvertiserSync = (
  options?: UseMutationOptions<null, Error, RequestAdvertiserSync>
) => {
  return useMutation({
    mutationFn: (params: RequestAdvertiserSync) => postAdvertiserSync(params),
    ...options,
  });
};

// 광고주 데이터 동기화 해제 (SAG014)
// Description : 동기화 해제는 동기화 된 광고주만 가능하다.
export const useMuateDeleteAdvertiserSync = (
  options?: UseMutationOptions<null, Error, RequestAdvertiserSync>
) => {
  return useMutation<null, Error, RequestAdvertiserSync>({
    mutationFn: (data: RequestAdvertiserSync) => delAdvertiserSync(data),
    ...options,
  });
};
