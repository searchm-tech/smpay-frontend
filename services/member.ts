// TODO : 삭제 예정

import { mockMemberData } from "./mock/members";
import type { TableParams } from "./types";
import type { MemberData } from "@/types/user";

export const fetchMembers = async (params: TableParams) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...mockMemberData];

  // 필터링
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        if (key === "search") {
          // 검색어 필터링
          filtered = filtered.filter((item) =>
            Object.values(item).some((value) =>
              String(value).toLowerCase().includes(values[0].toLowerCase())
            )
          );
        } else {
          // 기존 필터링 로직
          filtered = filtered.filter((item) =>
            values.includes(String(item[key as keyof MemberData]))
          );
        }
      }
    });
  }

  // 정렬
  if (params.sort?.field && params.sort.order) {
    filtered.sort((a, b) => {
      const aValue = a[params.sort!.field as keyof MemberData];
      const bValue = b[params.sort!.field as keyof MemberData];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return params.sort!.order === "ascend"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
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
};

export const deleteMember = async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
  };
};

/**
 * 회원 등록 - [대행사 기준]
 * @param data
 * @returns
 */
export const createMember = async (data: MemberData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
  };
};

/**
 * 회원 등록 - [대행사 기준]
 */
export const createMemberByAgency = async (data: MemberData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
  };
};
