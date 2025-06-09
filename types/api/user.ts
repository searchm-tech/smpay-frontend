// 대행사 회원 메일 인증 코드 확인 API

import { TAuthType, TResetPwdType, UserStatus } from "../user";

// agents/users/mail-verifications request type
export type RequestMailVerify = {
  agentCode: string;
  userCode: string;
};

// agents/users/mail-verifications response type
export type ResponseMailVerify = {
  isVerified: boolean;
  adminAgentResponseDto: AdminAgentResponseDto;
  userResponseDto: UserResponseDto;
};

export type AdminAgentResponseDto = {
  agentId: number;
  name: string;
  uniqueCode: string;
  representativeName: string;
  businessRegistrationNumber: string;
  status: string;
  domainName: string;
};

export type UserResponseDto = {
  userId: number;
  agentId: number;
  id: string;
  status: UserStatus;
  type: TAuthType;
  name: string;
  phoneNumber: string;
};

// 대행사 비밀번호 설정 또는 비밀번호 재설정 request type
export type RequestUserPwd = {
  agentId: number;
  userId: number;
  password: string;
  phone: string;
  type: TResetPwdType;
};

// 대행사 회원 정보 조회 request type
export type RequestUserInfo = {
  agentId: number;
  userId: number;
};

// 기본 정보 변경 (U004) request type
export type RequestPatchUserInfo = {
  userId: number;
  name: string;
  emailAddress: string;
  phoneNumber: string;
};

// [관리자] 대행사 최상위 그룹장 회원 초대 메일 발송 (AAG013) request type
export type RequestGroupMasterInvite = {
  agentId: number;
  userType: TAuthType;
  name: string;
  emailAddress: string;
};

// [관리자] 대행사 최상위 그룹장 회원 가입 (직접 등록) (AAG005) request type
export type RequestAgencyGroupMasterDirect = {
  userType: TAuthType;
  name: string;
  emailAddress: string;
  password: string;
  phoneNumber: string;
  agentId: number;
};

// 회원 직접 등록 API (SAG007) request type
export type RequestMemberDirect = {
  type: TAuthType;
  name: string;
  emailAddress: string;
  password: string;
  phoneNumber: string;
  agentId: number;
  departmentId: number;
};

// 회원 가입 메일 발송 API (SAG006) request type
export type RequestSignupEmail = {
  type: TAuthType;
  name: string;
  emailAddress: string;
  agentId: number;
  departmentId: number;
};

// 대행사 회원 페이지네이션 조회 (AAG006) response type
export type ResponseAgencyUsers = {
  page: number;
  size: number;
  totalCount: number;
  content: AgencyUserDto[];
};

// TODO : 실제 모델이랑 비교 필요
export type AgencyUserDto = {
  userId: number;
  agentName: string;
  type: TAuthType;
  userName: string;
  loginId: string;
  status: UserStatus;
  registerDt: string;
  id: string;
};

export type GroupUserDto = {
  userId: number;
  userType: TAuthType;
  userName: string;
  status: UserStatus;
  registerDt: string;
  emailAddress: string;
  id: string;
};

// 확장된 응답 타입 (no 속성이 포함된 content)
export type ResponseAgencyUsersWithNo = {
  page: number;
  size: number;
  totalCount: number;
  content: (AgencyUserDto & { id: string })[];
};

// 그룹장 회원 목록 조회 API (AAG007) response type
export type ResponseGroupUser = {
  page: number;
  size: number;
  totalCount: number;
  content: GroupUserDto[];
};

// 대행사 회원 페이지네이션 조회 (AAG006) params type
export type RequestAgencyUsers = {
  page: number;
  size: number;
  keyword: string;
  orderType: AgencyUsersOrder;
};

// 그룹장 회원 목록 조회 API params type
export type GroupUserDtoParams = {
  page: number;
  size: number;
  keyword: string;
  orderType: AgencyUsersOrder;
};

// 시스템 관리자 - 대행사 회원 목록 조회 API 정렬 타입
export type AgencyUsersOrder =
  | "NO_ASC" // 불필요 - 그냥 프론트에서 필요함
  | "NO_DESC" // 불필요 - 그냥 프론트에서 필요함
  | "AGENT_ASC"
  | "AGE`NT_DESC"
  | "USER_TYPE_ASC"
  | "USER_TYPE_DESC"
  | "NAME_ASC"
  | "NAME_DESC"
  | "LOGIN_ID_ASC"
  | "LOGIN_ID_DESC"
  | "STATUS_ASC"
  | "STATUS_DESC"
  | "REGISTER_DT_ASC"
  | "REGISTER_DT_DESC";

// 회원 상태 변경 params type
export type RequestAgencyUserStatus = {
  userId: number;
  agentId: number;
  status: UserStatus;
};

// 대행사 회원 삭제 API params type
export type RequestAgencyUserDelete = {
  userId: number;
  agentId: number;
};
