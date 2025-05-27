import { TAuthType, UserStatus } from "./user";

// type - 부서 정보
export type TDepartment = {
  departmentId: number;
  agentId: number;
  parentId: number | null;
  name: string;
};

// type - 부서 폴더(수정 추가 삭제) put params
export type TParamsDepartments = {
  departmentId: number;
  departmentName: string;
  displayOrder: number;
  userIds: number[];
  children: TParamsDepartments[];
};

// type - 부서 관리 폴더 구조
export type TDepartmentNode = {
  departmentId: number;
  parentId: number | null;
  name: string;
  displayOrder: number;
  users: TDepartmentUser[];
  children: TDepartmentNode[];
};

export type TDepartmentResponse = {
  departments: TDepartment[];
};

// TODO : TSMPayUser 타입 비교 필요
export type TDepartmentUser = {
  userId: number;
  agentId: number;
  id: string;
  status: UserStatus;
  type: TAuthType;
  name: string;
  phoneNumber: string;
};
