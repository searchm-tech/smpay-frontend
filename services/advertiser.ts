import { ApiError, get, post } from "@/lib/api";
import { mockAdvertiserData } from "./mock/advertiser";
import { buildQueryParams } from "@/lib/utils";

import type { AdvertiserListResponse, TableParams } from "./types";
import type { AdvertiserData } from "@/types/adveriser";
import type { RuleInfo, ScheduleInfo } from "@/types/sm-pay";
import type {
  RequestAdvertiserList,
  RequestAdvertiserSync,
  RequestAdvertiserSyncStatus,
  ResponseAdvertiserList,
} from "@/types/api/advertiser";

/**
 * TODO : 삭제  - 광고주 목록 조회 api
 * @param params
 * @returns
 */
export const fetchAdvertisers = async (
  params: TableParams
): Promise<AdvertiserListResponse & { total: number }> => {
  // 서버 응답을 시뮬레이션하기 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { pagination, sort, filters } = params;
  let filteredData = [...mockAdvertiserData];

  // 필터링 적용
  if (filters) {
    Object.entries(filters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        if (key === "search") {
          const searchTerm = values[0].toLowerCase();
          filteredData = filteredData.filter(
            (item: AdvertiserData) =>
              item.name.toLowerCase().includes(searchTerm) ||
              item.customerId.toLowerCase().includes(searchTerm) ||
              item.loginId.toLowerCase().includes(searchTerm)
          );
        } else {
          filteredData = filteredData.filter((item: AdvertiserData) => {
            const itemValue = String((item as any)[key]);
            return values.includes(itemValue);
          });
        }
      }
    });
  }

  // 정렬 적용
  if (sort?.field && sort.order) {
    filteredData.sort((a: AdvertiserData, b: AdvertiserData) => {
      const aValue = (a as any)[sort.field!];
      const bValue = (b as any)[sort.field!];

      if (typeof aValue === "string") {
        return sort.order === "ascend"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number") {
        return sort.order === "ascend" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }

  // 페이지네이션 적용
  const { current, pageSize } = pagination;
  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    success: true,
    total: filteredData.length,
    hasNextPage: filteredData.length > pageSize,
  };
};

/**
 * 광고주 상세 조회 api
 * @param id
 * @returns
 */
export const fetchAdvertiserDetail = async (id: number) => {
  // 서버 응답을 시뮬레이션하기 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: mockAdvertiserData.find((item: AdvertiserData) => item.id === id),
    success: true,
  };
};

/**
 * 광고주 상세 정보 수정 api
 * @param id
 * @param data
 * @returns
 */
export const updateAdvertiser = async (id: number, data: AdvertiserData) => {
  // 서버 응답을 시뮬레이션하기 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 500));

  const index = mockAdvertiserData.findIndex(
    (item: AdvertiserData) => item.id === id
  );
  if (index === -1) {
    return {
      success: false,
      message: "광고주를 찾을 수 없습니다.",
    };
  }

  const updatedAdvertiser = { ...mockAdvertiserData[index], ...data };
  mockAdvertiserData[index] = updatedAdvertiser;

  return {
    success: true,
    data: updatedAdvertiser,
  };
};

/**
 * 광고주 사업자 등록 번호 중복 체크 api
 * @param businessNumber
 * @returns
 */
export const checkAdvertiser = async (businessNumber: string) => {
  // 서버 응답을 시뮬레이션하기 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 500));

  const findAdvertiser = mockAdvertiserData.find(
    (item: AdvertiserData) => item.businessNumber === businessNumber
  );

  return {
    success: true,
    data: findAdvertiser,
    message: findAdvertiser ? "중복된 사업자등록번호입니다." : undefined,
  };
};

/**
 * 광고주 동의 요청 발송 api
 * @param id
 * @returns
 */

export type SendAdvertiserAgreementResponse = {
  success: boolean;
  message?: string;
};

export type SendAdvertiserAgreementParams = {
  id: number;
  ruleInfo: RuleInfo;
  scheduleInfo: ScheduleInfo;
};

export const sendAdvertiserAgreement = async (
  params: SendAdvertiserAgreementParams
) => {
  // 서버 응답을 시뮬레이션하기 위한 지연
  console.log("params", params);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
  };
};

// --- 실제 API ---

// 광고주 리스트 페이지네이션 조회 (SAG012)
export const getAdvertiserList = async (
  params: RequestAdvertiserList
): Promise<ResponseAdvertiserList> => {
  const { agentId, userId } = params;

  const queryParams = buildQueryParams({
    page: params.page,
    size: params.size,
    keyword: params.keyword,
    orderType: params.orderType,
  });

  const response: ResponseAdvertiserList = await get(
    `/service/api/v1/agents/${agentId}/users/${userId}/advertiser-list?${queryParams}`
  );
  return response;
};

// 광고주 데이터 동기화 작업 상태 변경 (SAG015)
// Description :동기화 하기전, IN_PROGRESS 상태로 변경하여, 진행중으로 만들고, 서버에서 성공하면 동기화 api 실행할 것
export const postAdvertiserSyncJobStatus = async (
  params: RequestAdvertiserSyncStatus
) => {
  try {
    const { agentId, userId, jobList } = params;

    const response: null = await post(
      `/service/api/v1/agents/${agentId}/users/${userId}/advertiser/sync/job-status`,
      jobList
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 광고주 데이터 동기화 (SAG013)
export const postAdvertiserSync = async (params: RequestAdvertiserSync) => {
  const { agentId, userId, advertiserIds } = params;

  try {
    const response: null = await post(
      `/service/api/v1/agents/${agentId}/users/${userId}/advertiser/sync`,
      { advertiserIds }
    );
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};
