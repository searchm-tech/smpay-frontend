import { ApiError, get, put } from "@/lib/api";
import type {
  TDepartmentResponse,
  TParamsDepartments,
} from "@/types/department";

// 대행사 등록 및 수정(명칭 잘못 됨) API - ADG002
export type TDepartmentsPutParams = {
  agentId: string;
  departments: TParamsDepartments[];
};

export const putDepartmentsApi = async (params: TDepartmentsPutParams) => {
  const { agentId, departments } = params;

  try {
    const response = await put(`/api/v1/agents/${agentId}/departments`, {
      departments,
    });
    console.log(response);
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 대행사 부서 전체 조회 API - ADG001
export const getDepartmentsApi = async (
  agencyId: number
): Promise<TDepartmentResponse> => {
  try {
    const response: TDepartmentResponse = await get(
      `/api/v1/agents/${agencyId}/departments`
    );

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 하위 부서 조회 API - SAG005
export const getSubDepartmentsApi = async (agentId: number, userId: number) => {
  const response = await get(
    `/service/api/v1/agents/${agentId}/users/${userId}/subordinate-departments`
  );
  return response;
};

export type TSubDepartmentsResponse = {};

// 대기
const test = {
  departmentId: 3,
  agentId: 2,
  parentId: 2,
  name: "두번째 부서",
  displayOrder: 1,
  children: [
    {
      departmentId: 3,
      agentId: 2,
      parentId: 2,
      name: "두번째 부서",
      displayOrder: 1,
      children: [],
    },
  ],
};
