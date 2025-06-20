import { JUDGEMENT_STATUS_MAP } from "@/constants/status";
import {
  mockData,
  mockRuleInfo,
  mockScheduleInfo,
  mockSmPayJudgementData,
} from "./mock/sm-pay";
import type {
  TableParams,
  SmPayResponse,
  SmPayRuleInfoResponse,
  SmPayScheduleInfoResponse,
  SmPayStatusResponse,
  SmPaySubmitDetailResponse,
  SmPayRejectReasonResponse,
  SmPayJudgementDataResponse,
  SmPayStopInfoResponse,
  SmPayJudgementStatusResponse,
} from "./types";
import type {
  BooleanResponse,
  RuleInfo,
  ScheduleInfo,
  SmPayJudgementStatus,
  SmPayStatus,
} from "@/types/sm-pay";
import { ApiError, get } from "@/lib/api";
import {
  RequestSmPayAdvertiserStatus,
  ResponseSmPayAdvertiserStatus,
  ResponseSmPayStatusCount,
} from "@/types/api/smpay";
import { RequestAgentUser } from "@/types/api/common";
import { buildQueryParams } from "@/lib/utils";

export const fetchSmPayData = async (
  params: TableParams
): Promise<SmPayResponse> => {
  // 서버 응답을 시뮬레이션하기 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { pagination, sort, filters } = params;
  let filteredData = [...mockData];

  // 필터링 적용
  if (filters) {
    Object.entries(filters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        if (key === "search") {
          // 검색어로 3개 필드 검색
          const searchTerm = values[0].toLowerCase();
          filteredData = filteredData.filter(
            (item) =>
              item.customerId.toLowerCase().includes(searchTerm) ||
              item.loginId.toLowerCase().includes(searchTerm) ||
              item.advertiserName.toLowerCase().includes(searchTerm)
          );
        } else {
          // 기존 필터링 로직
          filteredData = filteredData.filter((item) => {
            const itemValue = String((item as any)[key]);
            return values.includes(itemValue);
          });
        }
      }
    });
  }

  // 정렬 적용
  if (sort?.field && sort.order) {
    filteredData.sort((a, b) => {
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

      if (aValue instanceof Date) {
        return sort.order === "ascend"
          ? new Date(aValue).getTime() - new Date(bValue).getTime()
          : new Date(bValue).getTime() - new Date(aValue).getTime();
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
    total: filteredData.length,
    success: true,
  };
};

export const getSmPayStatus = async (): Promise<SmPayStatusResponse> => {
  // 서버 응답을 시뮬레이션하기 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 상태별 카운트 계산
  const statusCounts = mockData.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<SmPayStatus, number>);

  // 전체 카운트 계산
  const totalCount = mockData.length;

  return {
    data: [
      {
        id: 0,
        name: "전체",
        status: "ALL",
        count: totalCount,
      },
      {
        id: 1,
        name: "심사 대기",
        status: "REVIEW_PENDING",
        count: statusCounts["REVIEW_PENDING"] || 0,
      },
      {
        id: 2,
        name: "심사 반려",
        status: "REVIEW_REJECTED",
        count: statusCounts["REVIEW_REJECTED"] || 0,
      },
      {
        id: 3,
        name: "운영 검토 대기",
        status: "OPERATION_REVIEW_PENDING",
        count: statusCounts["OPERATION_REVIEW_PENDING"] || 0,
      },
      {
        id: 4,
        name: "운영 검토 거절",
        status: "OPERATION_REVIEW_REJECTED",
        count: statusCounts["OPERATION_REVIEW_REJECTED"] || 0,
      },
      {
        id: 5,
        name: "운영 검토 완료",
        status: "OPERATION_REVIEW_COMPLETED",
        count: statusCounts["OPERATION_REVIEW_COMPLETED"] || 0,
      },
      {
        id: 6,
        name: "광고주 동의 대기",
        status: "ADVERTISER_AGREEMENT_PENDING",
        count: statusCounts["ADVERTISER_AGREEMENT_PENDING"] || 0,
      },
      {
        id: 7,
        name: "광고주 동의 기한 만료",
        status: "ADVERTISER_AGREEMENT_EXPIRED",
        count: statusCounts["ADVERTISER_AGREEMENT_EXPIRED"] || 0,
      },
      {
        id: 8,
        name: "신청 취소",
        status: "APPLICATION_CANCELLED",
        count: statusCounts["APPLICATION_CANCELLED"] || 0,
      },
      {
        id: 9,
        name: "출금계좌 등록 실패",
        status: "WITHDRAWAL_ACCOUNT_REGISTRATION_FAILED",
        count: statusCounts["WITHDRAWAL_ACCOUNT_REGISTRATION_FAILED"] || 0,
      },
      {
        id: 10,
        name: "운영 중",
        status: "OPERATING",
        count: statusCounts["OPERATING"] || 0,
      },
      {
        id: 11,
        name: "일시중지",
        status: "SUSPENDED",
        count: statusCounts["SUSPENDED"] || 0,
      },
      {
        id: 12,
        name: "해지 대기",
        status: "TERMINATION_PENDING",
        count: statusCounts["TERMINATION_PENDING"] || 0,
      },
      {
        id: 13,
        name: "해지",
        status: "TERMINATED",
        count: statusCounts["TERMINATED"] || 0,
      },

      {
        id: 14,
        name: "심사 취소",
        status: "APPLICATION_CANCELLED",
        count: statusCounts["APPLICATION_CANCELLED"] || 0,
      },
    ],
    success: true,
  };
};

export const getSmPaySubmitDetail = async (
  id: string
): Promise<SmPaySubmitDetailResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const numId = parseInt(id, 10);
  const data = mockData.find((item) => item.id === numId);

  if (!data) {
    return { data: null, success: false };
  }

  return {
    data,
    success: true,
  };
};

export const getSmPayRuleInfo = async (
  id: string
): Promise<SmPayRuleInfoResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const numId = parseInt(id, 10);
  const data = mockRuleInfo.find((item) => item.id === numId);

  if (!data) {
    return { data: null, success: false };
  }

  return {
    data,
    success: true,
  };
};

export const updateSmPayScheduleInfo = async (
  id: string,
  data: ScheduleInfo
): Promise<SmPayScheduleInfoResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const numId = parseInt(id, 10);
  const updatedData = mockScheduleInfo.map((item) => {
    if (item.id === numId) {
      return { ...item, ...data };
    }
    return item;
  });

  const findData = updatedData.find((item) => item.id === numId);

  if (!findData) {
    return { data: null, success: false };
  }

  return { data: findData, success: true };
};

export const getSmPayRejectReason = async (
  id: string
): Promise<SmPayRejectReasonResponse> => {
  console.log("id", id);
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: `<div>
      <p>ROAS 평균값은 심사 기준치를 충족하지만</p>
      <p>
        ROAS의 변동폭이 너무 커서 선충전으로 결제를 해도 제대로 된 효율을 내기
        힘들 것 같습니다.
      </p>
    </div>`,
    success: true,
  };
};

export const getSmPayStopInfo = async (
  id: string
): Promise<SmPayStopInfoResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: {
      date: "2025-05-02",
      reason: "관리 권한 해제  / 관리자 중단",
    },
    success: true,
  };
};

export const updateSmPayStatus = async (
  id: string,
  status: string
): Promise<BooleanResponse> => {
  console.log(id, status);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: true,
    success: true,
  };
};

export const getSmPayJudgementData = async (
  params: TableParams
): Promise<SmPayJudgementDataResponse> => {
  console.log("params", params);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let filteredData = [...mockSmPayJudgementData];
  const { pagination, sort, filters } = params;

  // 필터링 적용
  if (filters) {
    Object.entries(filters).forEach(([key, values]) => {
      if (
        !values ||
        values.length === 0 ||
        (values.length === 1 && values[0] === "")
      ) {
        return; // 필터링 건너뜀
      }
      if (key === "search" && values[0] !== "") {
        const searchTerm = String(values[0]).toLowerCase();
        filteredData = filteredData.filter(
          (item) =>
            item.agencyName.toLowerCase().includes(searchTerm) ||
            item.departmentName.toLowerCase().includes(searchTerm) ||
            item.customerId.toLowerCase().includes(searchTerm) ||
            item.advertiserId.toLowerCase().includes(searchTerm) ||
            item.advertiserName.toLowerCase().includes(searchTerm) ||
            item.nickname.toLowerCase().includes(searchTerm)
        );
      } else if (
        key === "status" &&
        !(values.length === 1 && values[0] === "ALL")
      ) {
        filteredData = filteredData.filter((item) => {
          const itemValue = String((item as any)[key]);
          return values.includes(itemValue);
        });
      } else if (key !== "search" && key !== "status") {
        filteredData = filteredData.filter((item) => {
          const itemValue = String((item as any)[key]);
          return values.includes(itemValue);
        });
      }
    });
  }

  // 정렬 적용
  if (sort?.field && sort.order) {
    filteredData.sort((a, b) => {
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
      if (aValue instanceof Date) {
        return sort.order === "ascend"
          ? new Date(aValue).getTime() - new Date(bValue).getTime()
          : new Date(bValue).getTime() - new Date(aValue).getTime();
      }
      return 0;
    });
  }

  // 페이지네이션 적용
  const { current = 1, pageSize = 10 } = pagination || {};
  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total: filteredData.length,
    success: true,
  };
};

export const getSmPayJudgementStatus =
  async (): Promise<SmPayJudgementStatusResponse> => {
    // 상태별 카운트 계산 (영문 기준)
    const statusCounts = mockSmPayJudgementData.reduce((acc, item) => {
      const statusEng = item.status as SmPayJudgementStatus;
      if (statusEng) {
        acc[statusEng] = (acc[statusEng] || 0) + 1;
      }
      return acc;
    }, {} as Record<SmPayJudgementStatus, number>);

    // 전체 카운트
    const totalCount = mockSmPayJudgementData.length;

    // 결과 배열 생성
    const data = [
      { status: "ALL" as SmPayJudgementStatus, count: totalCount },
      ...Object.entries(statusCounts).map(([status, count]) => ({
        status: status as SmPayJudgementStatus,
        count,
      })),
    ];

    return {
      data: data.map((item) => ({
        ...item,
        label:
          JUDGEMENT_STATUS_MAP[item.status as SmPayJudgementStatus] || "전체",
      })),
      success: true,
    };
  };

// ---------- 실제 API -------------------

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
 * - 화면 : [대행사] SM Pay 신청 > 광고주 등록 리스트
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
