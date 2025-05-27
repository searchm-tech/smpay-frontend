import type { TAgency } from "./agency";
import type { TAuthType, UserStatus } from "./user";

// type - 회원 객체의 부서 정보
export type TDepartment = {
  departmentId: number;
  agentId: number;
  parentId: number | null;
  name: string;
};

// type - 부서 폴더(수정 추가 삭제) put params
export type TParamsDepartments = {
  departmentId?: number;
  departmentName: string;
  displayOrder: number;
  userIds: number[];
  children: TParamsDepartments[];
};

// type - 부서 조회 response
export type TDepartmentResponse = {
  departments: TDepartmentFolder[];
  agents: TAgency;
};

// type -  부서 조회 response의 부서 타입
export type TDepartmentFolder = {
  departmentId: number;
  parentId: number | null;
  name: string;
  displayOrder: number;
  users: TDepartmentUser[];
  children: TDepartmentFolder[];
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
