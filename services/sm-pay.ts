import { JUDGEMENT_STATUS_MAP } from "@/constants/status";
import {
  mockData,
  mockRuleHistory,
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
  SmPayRuleHistoryResponse,
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
} from "@/types/sm-pay";

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
      },
      {
        id: 1,
        name: "광고주 동의 요청",
        status: "ADVERTISER_AGREEMENT_REQUEST",
        count: statusCounts["ADVERTISER_AGREEMENT_REQUEST"] || 0,
      },
      {
        id: 2,
        name: "광고주 미동의",
        status: "ADVERTISER_DISAGREED",
        count: statusCounts["ADVERTISER_DISAGREED"] || 0,
      },
      {
        id: 3,
        name: "광고주 동의기한 만료",
        status: "ADVERTISER_AGREEMENT_EXPIRED",
        count: statusCounts["ADVERTISER_AGREEMENT_EXPIRED"] || 0,
      },
      {
        id: 4,
        name: "광고주 동의 완료",
        status: "ADVERTISER_AGREEMENT_COMPLETED",
        count: statusCounts["ADVERTISER_AGREEMENT_COMPLETED"] || 0,
      },
      {
        id: 5,
        name: "심사 대기",
        status: "REVIEW_PENDING",
        count: statusCounts["REVIEW_PENDING"] || 0,
      },
      {
        id: 6,
        name: "심사 승인",
        status: "REVIEW_APPROVED",
        count: statusCounts["REVIEW_APPROVED"] || 0,
      },
      {
        id: 7,
        name: "반려",
        status: "REJECTED",
        count: statusCounts["REJECTED"] || 0,
      },
      {
        id: 8,
        name: "일시중지",
        status: "SUSPENDED",
        count: statusCounts["SUSPENDED"] || 0,
      },
      {
        id: 9,
        name: "해지 신청 진행",
        status: "TERMINATION_IN_PROGRESS",
        count: statusCounts["TERMINATION_IN_PROGRESS"] || 0,
      },
      {
        id: 10,
        name: "해지",
        status: "TERMINATED",
        count: statusCounts["TERMINATED"] || 0,
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
            item.userName.toLowerCase().includes(searchTerm) ||
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
