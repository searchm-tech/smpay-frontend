import { ApiError, del, get, post } from "@/lib/api";
import { buildQueryParams } from "@/lib/utils";
import type {
  TRequestLicenseCreate,
  TRequestLicenseDelete,
  TRequestCustomersList,
  TResponseCustomersList,
  TResponseLicense,
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
