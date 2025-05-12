import { TableParams } from "@/services/types";
import { agencyData as mockAgencyData } from "@/services/mock/agency";

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
      if (values && values.length > 0) {
        if (key === "search") {
          filtered = filtered.filter((item) =>
            Object.values(item).some((value) => {
              if (typeof value === "string") {
                return value.toLowerCase().includes(values[0].toLowerCase());
              }
              if (typeof value === "number" || typeof value === "boolean") {
                return String(value)
                  .toLowerCase()
                  .includes(values[0].toLowerCase());
              }
              return false;
            })
          );
        } else {
          filtered = filtered.filter((item) =>
            values.includes(String(item[key as keyof AgencyData]))
          );
        }
      }
    });
  }

  // 정렬
  if (params.sort?.field && params.sort?.order) {
    filtered.sort((a, b) => {
      const aValue = a[params.sort!.field as keyof AgencyData];
      const bValue = b[params.sort!.field as keyof AgencyData];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return params.sort!.order === "ascend"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return params.sort!.order === "ascend"
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

export async function getAgency(id: string): Promise<AgencyData | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockAgencyData.find((item) => item.id === id) ?? null;
}

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
