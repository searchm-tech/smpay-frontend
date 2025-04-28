import {
  useMutation,
  useQuery,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  fetchAdvertisers,
  fetchAdvertiserDetail,
  checkAdvertiser,
  updateAdvertiser,
  SendAdvertiserAgreementParams,
  sendAdvertiserAgreement,
} from "@/services/advertiser";
import type { FetchAdvertiserParams } from "@/services/types";
import { AdvertiserData } from "@/types/adveriser";

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
