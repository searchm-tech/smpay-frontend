import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteAgentsUserLicense,
  getAdvertiserSyncJobList,
  getAgentsUserLicense,
  postAdvertiserSyncStatus,
  postAgentsUserLicense,
} from "@/services/license";

import type {
  TRequestLicenseCreate,
  TRequestLicenseDelete,
  TResponseAdvertiserSyncJob,
  TRequestAdvertiserSyncJobList,
  TRequestUpdateAdvertiserSyncStatus,
  TResponseLicense,
  TRequestLicense,
} from "@/types/api/license";

// 마케터 API 라이선스 등록 + 수정 (SAG008) mutate
export const useMuateLicense = (
  options?: UseMutationOptions<null, Error, TRequestLicenseCreate>
) => {
  return useMutation<null, Error, TRequestLicenseCreate>({
    mutationFn: (data: TRequestLicenseCreate) => postAgentsUserLicense(data),
    ...options,
  });
};

// 마케터 API 라이선스 삭제 (SAG011) mutate
export const useMuateDeleteLicense = (
  options?: UseMutationOptions<null, Error, TRequestLicenseDelete>
) => {
  return useMutation<null, Error, TRequestLicenseDelete>({
    mutationFn: (data: TRequestLicenseDelete) => deleteAgentsUserLicense(data),
    ...options,
  });
};

// 광고주 데이터 동기화 작업별 리스트 조회 (SAG016) query
export const useQueryAdvertiserSyncJobList = (
  params: TRequestAdvertiserSyncJobList
) => {
  return useQuery<TResponseAdvertiserSyncJob[]>({
    queryKey: ["advertiserSyncJobList", params.agentId, params.userId],
    queryFn: () => getAdvertiserSyncJobList(params),
    enabled: !!params.agentId && !!params.userId,
    initialData: [],
  });
};

// 광고주 데이터 동기화 작업별 리스트 조회 (SAG016) mutate
export const useMuateAdvertiserSyncStatus = (
  options?: UseMutationOptions<null, Error, TRequestUpdateAdvertiserSyncStatus>
) => {
  return useMutation<null, Error, TRequestUpdateAdvertiserSyncStatus>({
    mutationFn: (data: TRequestUpdateAdvertiserSyncStatus) =>
      postAdvertiserSyncStatus(data),
    ...options,
  });
};

// 마케터 API 라이선스 조회 (SAG009) query
export const useQueryLicense = (params: TRequestLicense) => {
  return useQuery<TResponseLicense>({
    queryKey: ["license", params.agentId, params.userId],
    queryFn: () =>
      getAgentsUserLicense(params.agentId.toString(), params.userId.toString()),
    enabled: !!params.agentId && !!params.userId,
  });
};
