// 광고주 smPay 신청 관리 리스트 조회(SAG022)

import { ApiError, get, put } from "@/lib/api";
import { buildQueryParams } from "@/lib/utils";
import { RequestAgentUser } from "@/types/api/common";
import {
  RequestSmPayAdvertiserApply,
  RequestSmPayAdvertiserDetail,
  RequestSmPayAdvertiserDetailPut,
  RequestSmPayAdvertiserStatus,
  ResponseSmPayAdvertiserApply,
  ResponseSmPayAdvertiserDetail,
  ResponseSmPayAdvertiserStatus,
  ResponseSmPayStatusCount,
} from "@/types/api/smpay";

// 광고주 상태 갯수 조회(SAG020) API
export const getSmPayStatusCountList = async (
  params: RequestAgentUser
): Promise<ResponseSmPayStatusCount> => {
  const { agentId, userId } = params;
  try {
    const response = await get<ResponseSmPayStatusCount>(
      `/service/api/v1/agents/${agentId}/users/${userId}/advertisers/status-count-list`
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

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

/**
 * 광고주 detail 조회(SAG024)
 * - 화면 : [대행사] SM Pay 관리 > 목록 리스트 > 정보 변경 모달
 */
export const getSmPayAdvertiserDetail = async ({
  user,
  advertiserId,
}: RequestSmPayAdvertiserDetail): Promise<ResponseSmPayAdvertiserDetail> => {
  console.log("user", user);
  const { agentId, userId } = user;

  try {
    const response = await get<ResponseSmPayAdvertiserDetail>(
      `/service/api/v1/agents/${agentId}/users/${userId}/advertisers/${advertiserId}/details`
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

/**
 * 광고주 detail 등록 및 수정(SAG023)
 * - 화면 : [대행사] SM Pay 관리 > 목록 리스트 > 정보 등록, 변경 모달
 */
export const putSmPayAdvertiserDetail = async ({
  user,
  advertiserId,
  params,
}: RequestSmPayAdvertiserDetailPut): Promise<null> => {
  const { agentId, userId } = user;
  const response = await put<null>(
    `/service/api/v1/agents/${agentId}/users/${userId}/advertisers/${advertiserId}/details`,
    params
  );
  return response;
};
