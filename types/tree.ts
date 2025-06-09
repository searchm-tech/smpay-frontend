import type { TDepartmentUser } from "./department";

export interface DepartmentTreeNode {
  id: string;
  name: string;
  children?: DepartmentTreeNode[];
}

export interface OrganizationTreeNode {
  id: string;
  name: string;
  type: "folder" | "user";
  originId?: number; // 부서 ID 또는 사용자 ID
  userData?: TDepartmentUser;
  children?: OrganizationTreeNode[];
}
