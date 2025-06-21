// 광고주 smPay 신청 관리 리스트 조회(SAG022)

import { ApiError, get, post, put } from "@/lib/api";
import { buildQueryParams } from "@/lib/utils";
import { RequestAgentUser } from "@/types/api/common";
import {
  RequestSmPayAdvertiserApply,
  RequestSmPayAdvertiserDailyStat,
  RequestSmPayAdvertiserDetail,
  RequestSmPayAdvertiserDetailPut,
  RequestSmPayAdvertiserStatIndicator,
  RequestSmPayAdvertiserStatus,
  RequestSmPayWrite,
  ResponseSmPayAdvertiserApply,
  ResponseSmPayAdvertiserDetail,
  ResponseSmPayAdvertiserStatIndicator,
  ResponseSmPayAdvertiserStatus,
  ResponseSmPayStatusCount,
} from "@/types/api/smpay";

import { DailyStat } from "@/types/smpay";

//

/**
 * 광고주 상태 갯수 조회(SAG020) API
 * - 화면 : [대행사] SM Pay 관리 > 상태 개수 영역
 */
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

    const { page, size, orderType } = queryParams;

    let content = response.content.map((item, index) => ({
      ...item,
      no: (page - 1) * size + index + 1,
    }));

    if (orderType === "NO_ASC") {
      content = content.reverse();
    }

    return {
      ...response,
      content,
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

/**
 * 광고주 성과 기반 참고용 심사 지표 조회(28일)(SAG028)
 * - 화면 : IndicatorsJudementSection
 */
export const getSmPayAdvertiserStatIndicator = async ({
  user,
  advertiserId,
}: RequestSmPayAdvertiserStatIndicator): Promise<ResponseSmPayAdvertiserStatIndicator> => {
  const { agentId, userId } = user;

  try {
    const response = await get<ResponseSmPayAdvertiserStatIndicator>(
      `/service/api/v1/agents/${agentId}/users/${userId}/advertisers/${advertiserId}/stat-indicator`
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// /core/service/api/v1/agents/1/users/1/advertisers/1/daily-stat

/**
 * 광고주 일 별 성과 조회(28일)(SAG027)
 * - 화면 : IndicatorModal
 */
export const getSmPayAdvertiserDailyStat = async ({
  user,
  advertiserId,
}: RequestSmPayAdvertiserDailyStat): Promise<DailyStat[]> => {
  const { agentId, userId } = user;

  try {
    const response = await get<DailyStat[]>(
      `/service/api/v1/agents/${agentId}/users/${userId}/advertisers/${advertiserId}/daily-stat`
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
 * 광고주 smPay 등록(SAG029) API
 * - 화면 : SM Pay 신청
 */
export const postSmPay = async ({
  user,
  advertiserId,
  params,
}: RequestSmPayWrite): Promise<null> => {
  const { agentId, userId } = user;

  try {
    const response = await post<null>(
      `/service/api/v1/agents/${agentId}/users/${userId}/advertisers/${advertiserId}/form`,
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
