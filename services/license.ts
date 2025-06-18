import { ApiError, del, get, post, put } from "@/lib/api";
import { buildQueryParams } from "@/lib/utils";
import type {
  TRequestLicenseCreate,
  TRequestLicenseDelete,
  TRequestCustomersList,
  TResponseCustomersList,
  TResponseLicense,
  TRequestUpdateAdvertiserSyncStatus,
  TRequestAdvertiserSyncJobList,
  TResponseAdvertiserSyncJob,
} from "@/types/api/license";

// 마케터 API 라이선스 등록 + 수정 (SAG008)
export const postAgentsUserLicense = async (
  data: TRequestLicenseCreate
): Promise<null> => {
  const { agentId, userId, customerId, apiKey, secretKey } = data;

  const params = {
    customerId,
    apiKey,
    secretKey,
  };

  try {
    const response: null = await post(
      `/service/api/v1/agents/${agentId}/users/${userId}/api-license`,
      params
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 마케터 API 라이선스 조회 (SAG009)
export const getAgentsUserLicense = async (
  agentId: string,
  userId: string
): Promise<TResponseLicense> => {
  console.log("실행???");
  try {
    const response: TResponseLicense = await get(
      `/service/api/v1/agents/${agentId}/users/${userId}/api-license`
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 마케터 API 라이선스 삭제 (SAG011)
export const deleteAgentsUserLicense = async (
  data: TRequestLicenseDelete
): Promise<null> => {
  const { agentId, userId } = data;

  try {
    const response: null = await del(
      `/service/api/v1/agents/${agentId}/users/${userId}/api-license`
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 광고주 리스트 조회 (SAG012)
export const getCustomersList = async (
  params: TRequestCustomersList & { agentId: number; userId: number }
): Promise<TResponseCustomersList> => {
  const { agentId, userId } = params;

  const queryParams = buildQueryParams({
    page: params.page,
    size: params.size,
    keyword: params.keyword,
    orderType: params.orderType,
  });

  try {
    const response: TResponseCustomersList = await get(
      `/service/api/v1/agents/${agentId}/users/${userId}/advertiser-list?${queryParams}`
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 광고주 데이터 동기화 작업 상태 변경 (SAG015)
export const postAdvertiserSyncStatus = async (
  data: TRequestUpdateAdvertiserSyncStatus
): Promise<null> => {
  const { agentId, userId, status, advertiserId } = data;

  try {
    const response: null = await post(
      `/service/api/v1/agents/${agentId}/users/${userId}/advertiser/sync/job-status`,
      { status, advertiserId }
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 광고주 데이터 동기화 작업별 리스트 조회 (SAG016)
export const getAdvertiserSyncJobList = async (
  params: TRequestAdvertiserSyncJobList
): Promise<TResponseAdvertiserSyncJob[]> => {
  const { agentId, userId, type } = params;

  try {
    const response: TResponseAdvertiserSyncJob[] = await get(
      `/service/api/v1/agents/${agentId}/users/${userId}/advertisers-job-type-list?type=${type}`
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};
