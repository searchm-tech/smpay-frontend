import {
  mockData,
  mockRuleHistory,
  mockRuleInfo,
  mockScheduleInfo,
} from "./mock/sm-pay";
import type {
  FetchSmPayParams,
  SmPayResponse,
  SmPayRuleInfoResponse,
  SmPayScheduleInfoResponse,
  SmPayStatusResponse,
  SmPaySubmitDetailResponse,
  SmPayRuleHistoryResponse,
} from "./types";
import type { BooleanResponse, RuleInfo, ScheduleInfo } from "@/types/sm-pay";

export const fetchSmPayData = async (
  params: FetchSmPayParams
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
  }, {} as Record<string, number>);

  // 전체 카운트 계산
  const totalCount = mockData.length;

  return {
    data: [
      {
        id: 0,
        name: "전체",
        status: "ALL",
        count: totalCount,
        createdAt: "",
        updatedAt: "",
      },
      {
        id: 1,
        name: "광고주 동의 요청",
        status: "ADVERTISER_AGREEMENT_REQUEST",
        count: statusCounts["ADVERTISER_AGREEMENT_REQUEST"] || 0,
        createdAt: "",
        updatedAt: "",
      },
      {
        id: 2,
        name: "광고주 미동의",
        status: "ADVERTISER_DISAGREED",
        count: statusCounts["ADVERTISER_DISAGREED"] || 0,
        createdAt: "",
        updatedAt: "",
      },
      {
        id: 3,
        name: "광고주 동의기한 만료",
        status: "ADVERTISER_AGREEMENT_EXPIRED",
        count: statusCounts["ADVERTISER_AGREEMENT_EXPIRED"] || 0,
        createdAt: "",
        updatedAt: "",
      },
      {
        id: 4,
        name: "광고주 동의 완료",
        status: "ADVERTISER_AGREEMENT_COMPLETED",
        count: statusCounts["ADVERTISER_AGREEMENT_COMPLETED"] || 0,
        createdAt: "",
        updatedAt: "",
      },
      {
        id: 5,
        name: "심사 대기",
        status: "REVIEW_PENDING",
        count: statusCounts["REVIEW_PENDING"] || 0,
        createdAt: "",
        updatedAt: "",
      },
      {
        id: 6,
        name: "심사 승인",
        status: "REVIEW_APPROVED",
        count: statusCounts["REVIEW_APPROVED"] || 0,
        createdAt: "",
        updatedAt: "",
      },
      {
        id: 7,
        name: "반려",
        status: "REJECTED",
        count: statusCounts["REJECTED"] || 0,
        createdAt: "",
        updatedAt: "",
      },
      {
        id: 8,
        name: "일시중지",
        status: "SUSPENDED",
        count: statusCounts["SUSPENDED"] || 0,
        createdAt: "",
        updatedAt: "",
      },
      {
        id: 9,
        name: "해지 신청 진행",
        status: "TERMINATION_IN_PROGRESS",
        count: statusCounts["TERMINATION_IN_PROGRESS"] || 0,
        createdAt: "",
        updatedAt: "",
      },
      {
        id: 10,
        name: "해지",
        status: "TERMINATED",
        count: statusCounts["TERMINATED"] || 0,
        createdAt: "",
        updatedAt: "",
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

export const updateSmPayRuleInfo = async (
  id: string,
  data: RuleInfo
): Promise<SmPayRuleInfoResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const numId = parseInt(id, 10);

  const updatedData = mockRuleInfo.map((item) => {
    if (item.id === numId) {
      return { ...item, ...data };
    }
    return item;
  });

  const findData = updatedData.find((item) => item.id === numId);

  if (!findData) {
    return { data: null, success: false };
  }

  return {
    data: findData,
    success: true,
  };
};

export const getSmPayScheduleInfo = async (
  id: string
): Promise<SmPayScheduleInfoResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const numId = parseInt(id, 10);
  const data = mockScheduleInfo.find((item) => item.id === numId);

  if (!data) {
    return { data: null, success: false };
  }

  return { data, success: true };
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

export const getSmPayRuleHistory = async (
  id: string
): Promise<SmPayRuleHistoryResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: mockRuleHistory,
    success: true,
  };
};

export const updateSmPayApplySubmit = async (
  id: string
): Promise<BooleanResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: true,
    success: true,
  };
};
