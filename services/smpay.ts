// 광고주 smPay 신청 관리 리스트 조회(SAG022)

import { ApiError, get } from "@/lib/api";
import { buildQueryParams } from "@/lib/utils";
import {
  RequestSmPayAdvertiserApply,
  RequestSmPayAdvertiserStatus,
  ResponseSmPayAdvertiserApply,
  ResponseSmPayAdvertiserStatus,
} from "@/types/api/smpay";

/**
 * 광고주 상태 리스트 페이지네이션 조회(SAG019)
 * - 화면 : [대행사] SM Pay 관리 > 목록 리스트
 */
export const getSmPayAdvertiserStatusList = async ({
  user,
  queryParams,
}: RequestSmPayAdvertiserStatus): Promise<ResponseSmPayAdvertiserStatus> => {
  const { agentId, userId } = user;
  const paramsResult = buildQueryParams({
    page: queryParams.page,
    size: queryParams.size,
    keyword: queryParams.keyword,
    orderType: queryParams.orderType,
  });

  try {
    const response = await get<ResponseSmPayAdvertiserStatus>(
      `/service/api/v1/agents/${agentId}/users/${userId}/advertisers/status-list?${paramsResult}`
    );

    return {
      ...response,
      content: response.content.map((item) => ({
        ...item,
        id: item.advertiserCustomerId,
      })),
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

/**
 * 광고주 smPay 신청 관리 리스트 조회(SAG022)
 * - 화면 : [대행사] SM Pay 관리 > 목록 리스트
 */

export const getSmPayAdvertiserApplyList = async ({
  user,
  queryParams,
}: RequestSmPayAdvertiserApply): Promise<ResponseSmPayAdvertiserApply> => {
  console.log("user", user);
  const { agentId, userId } = user;
  const paramsResult = buildQueryParams({
    page: queryParams.page,
    size: queryParams.size,
    keyword: queryParams.keyword,
    orderType: queryParams.orderType,
  });

  try {
    const response = await get<ResponseSmPayAdvertiserApply>(
      `/service/api/v1/agents/${agentId}/users/${userId}/advertisers-apply-list?${paramsResult}`
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};
