import { get, ApiError, post } from "@/lib/api";
import { buildQueryParams } from "@/lib/utils";
import { agencyData as mockAgencyData } from "@/services/mock/agency";
import type { TableParams } from "@/types/table";
import type { TAgency } from "@/types/agency";
import type { RequestAgencys, ResponseAgencys } from "@/types/api/agency";

export interface AgencyData {
  id: string;
  agency: string; // 대행사명
  code: string; // 대행사 고유코드
  owner: string; // 대표자명
  bussiness_num: string; // 사업자 등록 번호
  company_email_domain: string; // 회사 메일 도메인
  invoice_manager: string; // 계산서 발행 담당자명
  invoice_manager_contact: string; // 계산서 발행 담당자 연락처
  invoice_manager_email: string; // 계산서 발행 담당자 이메일
  status: boolean;
  date: string;
}

// TODO : 무료 목 api 테스트 용
export async function getAgencies(params: TableParams): Promise<{
  data: AgencyData[];
  total: number;
  success: boolean;
}> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...mockAgencyData];

  // 필터링
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, values]) => {
      if (values && Array.isArray(values) && values.length > 0) {
        if (key === "search") {
          filtered = filtered.filter((item) =>
            Object.values(item).some((value) => {
              if (typeof value === "string") {
                return value
                  .toLowerCase()
                  .includes(String(values[0]).toLowerCase());
              }
              if (typeof value === "number" || typeof value === "boolean") {
                return String(value)
                  .toLowerCase()
                  .includes(String(values[0]).toLowerCase());
              }
              return false;
            })
          );
        } else {
          filtered = filtered.filter((item) =>
            Array.isArray(values)
              ? values
                  .map(String)
                  .includes(String(item[key as keyof AgencyData]))
              : String(item[key as keyof AgencyData]) === String(values)
          );
        }
      }
    });
  }

  // 정렬
  if (params.sortField && params.sortOrder) {
    filtered.sort((a, b) => {
      const aValue = a[params.sortField as keyof AgencyData];
      const bValue = b[params.sortField as keyof AgencyData];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return params.sortOrder === "ascend"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return params.sortOrder === "ascend"
          ? aValue - bValue
          : bValue - aValue;
      }
      return 0;
    });
  }

  // 페이지네이션
  const { current = 1, pageSize = 10 } = params.pagination || {};
  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginated = filtered.slice(startIndex, endIndex);

  return {
    data: paginated,
    total: filtered.length,
    success: true,
  };
}

// 대행사 상세
export async function getAgency(id: string): Promise<AgencyData | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockAgencyData.find((item) => item.id === id) ?? null;
}

// 대행사 정보 수정
export async function updateAgency(
  id: string,
  data: AgencyData
): Promise<AgencyData | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const index = mockAgencyData.findIndex((item) => item.id === id);
  if (index !== -1) {
    mockAgencyData[index] = data;

    return data;
  }

  return null;
}

// 대행사 등록 > 대행사 고유코드 중복 확인
export async function checkAgencyCode(code: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return !mockAgencyData.some((item) => item.code === code);
}

// 대행사 등록 > 사업자 등록 번호 중복 확인
export async function checkBusinessNumber(number: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return !mockAgencyData.some((item) => item.bussiness_num === number);
}

// 대행사 등록 > 회사 메일 도메인 중복 확인
export async function checkCompanyEmailDomain(
  domain: string
): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return !mockAgencyData.some((item) => item.company_email_domain === domain);
}

// 대행사 등록
export async function registerAgency(
  data: AgencyData
): Promise<AgencyData | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return data;
}

// ---- 실제 API 호출 ----

// 대행사 전체 리스트 조회 API
export async function getAgencyAllApi(): Promise<TAgency[]> {
  try {
    const response: TAgency[] = await get("/admin/api/v1/agents/all");
    return response; // result만 반환!
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
}

// 대행사ㅣ 도메인 이름 조회
export const getAgencyDomainNameApi = async (
  code: string
): Promise<TAgency> => {
  try {
    const response: TAgency = await get(`/api/v1/agents?agentCode=${code}`);
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// ------------ 실제 API 호출 ------------

// 대행사 페이지네이션 리스트 조회 (AAG003)
export async function getAgencyApi(
  params: RequestAgencys
): Promise<ResponseAgencys> {
  try {
    const isNoSort =
      params.orderType === "NO_DESC" || params.orderType === "NO_ASC";
    const apiOrderType = isNoSort ? "REGISTER_DT_DESC" : params.orderType;

    const queryParams = buildQueryParams({
      page: params.page,
      size: params.size,
      keyword: params.keyword,
      orderType: apiOrderType,
    });

    const response: ResponseAgencys = await get(
      `/admin/api/v1/agents?${queryParams}`
    );
    return response; // result만 반환!
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
}
