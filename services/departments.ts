import { ApiError, get, put } from "@/lib/api";
import type { TDepartmentNode, TParamsDepartments } from "@/types/department";
import type { OrganizationTreeNode } from "@/types/tree";

// 대행사 등록 및 수정(명칭 잘못 됨) API - ADG002
type TDepartmentsPutParams = {
  agentId: string;
  departments: TParamsDepartments[];
};

export const putDepartmentsApi = async (
  agencyId: string,
  params: TDepartmentsPutParams
) => {
  try {
    const response = await put(
      `/api/v1/agents/${agencyId}/departments`,
      params
    );
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// 대행사 부서 전체 조회 API - ADG001
export const getDepartmentsApi = async (
  agencyId: string
): Promise<TDepartmentNode> => {
  try {
    const response: TDepartmentNode = await get(
      `/api/v1/agents/${agencyId}/departments`
    );
    console.log(response);
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};

// Mock data for testing
const mockDepartmentData: TDepartmentNode = {
  departmentId: 1,
  parentId: null,
  name: "개발본부",
  displayOrder: 1,
  users: [],
  children: [
    {
      departmentId: 2,
      parentId: 1,
      name: "웹개발팀",
      displayOrder: 1,
      users: [
        {
          userId: 1,
          agentId: 1,
          id: "user-1",
          status: "NORMAL",
          type: "AGENCY_GROUP_MANAGER",
          name: "김철수",
          phoneNumber: "010-1234-5678",
        },
        {
          userId: 2,
          agentId: 1,
          id: "user-2",
          status: "NORMAL",
          type: "AGENCY_GROUP_MEMBER",
          name: "이영희",
          phoneNumber: "010-2345-6789",
        },
      ],
      children: [],
    },
    {
      departmentId: 3,
      parentId: 1,
      name: "게임개발팀",
      displayOrder: 2,
      users: [
        {
          userId: 3,
          agentId: 1,
          id: "user-3",
          status: "NORMAL",
          type: "AGENCY_GROUP_MANAGER",
          name: "박지성",
          phoneNumber: "010-3456-7890",
        },
        {
          userId: 4,
          agentId: 1,
          id: "user-4",
          status: "NORMAL",
          type: "AGENCY_GROUP_MEMBER",
          name: "손흥민",
          phoneNumber: "010-4567-8901",
        },
        {
          userId: 5,
          agentId: 1,
          id: "user-5",
          status: "NORMAL",
          type: "AGENCY_GROUP_MEMBER",
          name: "황희찬",
          phoneNumber: "010-5678-9012",
        },
      ],
      children: [],
    },
  ],
};

export const getDepartmentsApiTest = async (): Promise<TDepartmentNode> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockDepartmentData;
};

// Convert TDepartmentNode to TreeNode format
const convertToTreeNode = (node: TDepartmentNode): OrganizationTreeNode => {
  const treeNode: OrganizationTreeNode = {
    id: `dept-${node.departmentId}`,
    name: node.name,
    type: "folder",
    originId: node.departmentId,
    children: [
      ...node.users.map((user) => ({
        id: `user-${user.userId}`,
        name: user.name,
        type: "user" as const,
        originId: user.userId,
        userData: user,
      })),
      ...node.children.map((child) => convertToTreeNode(child)),
    ],
  };
  return treeNode;
};

// Helper function to get tree data
export const getTreeData = async (): Promise<OrganizationTreeNode[]> => {
  const departmentData = await getDepartmentsApiTest();
  return [convertToTreeNode(departmentData)];
};
