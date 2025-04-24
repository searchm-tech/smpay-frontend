import { TableParams } from "@/types/table";

export interface AgencyData {
  id: string;
  agency: string;
  owner: string;
  bussiness_num: number;
  status: boolean;
  date: string;
}

function toSearchParams(params: Record<string, unknown>) {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  }
  return searchParams;
}

function getApiParams(params: TableParams) {
  const { pagination, sortField, sortOrder } = params;
  return {
    page: pagination?.current,
    limit: pagination?.pageSize,
    sortBy: sortField,
    order:
      sortOrder === "ascend"
        ? "asc"
        : sortOrder === "descend"
        ? "desc"
        : undefined,
  };
}

// TODO : 무료 목 api 테스트 용
export async function getAgencies(params: TableParams): Promise<{
  data: AgencyData[];
  total: number;
}> {
  const apiParams = getApiParams(params);
  const searchParams = toSearchParams(apiParams);
  const url = `https://67ecd18d4387d9117bbb1051.mockapi.io/api/v1/agency?${searchParams.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch agencies");
  }

  const data = await res.json();

  return {
    data,
    // MockAPI에서는 total count를 헤더에서 제공하지 않음 → 대략 50으로 고정
    total: 50,
  };
}
