// 대행사 회원 메일 인증 코드 확인 API

import { TAuthType, TResetPwdType, UserStatus } from "../user";

// agents/users/mail-verifications params type
export type TMailVerifyParams = {
  agentCode: string;
  userCode: string;
};

// agents/users/mail-verifications response type
export type TMailVerifyUser = {
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

// 대행사 비밀번호 설정 또는 비밀번호 재설정 params type
export type TAgentsUsersPwParams = {
  agentId: number;
  userId: number;
  password: string;
  phone: string;
  type: TResetPwdType;
};

// 대행사 회원 정보 조회 params type
export type TUserInfoParams = {
  agentId: number;
  userId: number;
};

// 기본 정보 변경 (U004) params type
export type TUserInfoPatchParams = {
  userId: number;
  name: string;
  emailAddress: string;
  phoneNumber: string;
};

// [관리자] 대행사 최상위 그룹장 회원 초대 메일 발송 (AAG013) params type
export type TAgencyUserEmailParams = {
  agentId: number;
  userType: TAuthType;
  name: string;
  emailAddress: string;
};

// [관리자] 대행사 최상위 그룹장 회원 가입 (직접 등록) (AAG005) params type
export type TAgencyGroupMasterPostParams = {
  userType: TAuthType;
  name: string;
  emailAddress: string;
  password: string;
  phoneNumber: string;
  agentId: number;
};

// 회원 직접 등록 API (SAG007) params type
export type TAgencyUserDirectPostParams = {
  type: TAuthType;
  name: string;
  emailAddress: string;
  password: string;
  phoneNumber: string;
  agentId: number;
  departmentId: number;
};

// 회원 가입 메일 발송 API (SAG006)
export type TAgencyUserEmailSendParams = {
  type: TAuthType;
  name: string;
  emailAddress: string;
  agentId: number;
  departmentId: number;
};

// 대행사 회원 페이지네이션 조회 (AAG006) response type
export type TAgencyUsersResponse = {
  page: number;
  size: number;
  totalCount: number;
  content: TAgencyUser[];
};

// TODO : 실제 모델이랑 비교 필요
export type TAgencyUser = {
  userId: number;
  agentName: string;
  type: TAuthType;
  userName: string;
  loginId: string;
  status: UserStatus;
  registerDt: string;
  id: string;
};

// 확장된 응답 타입 (no 속성이 포함된 content)
export type TAgencyUsersResponseWithNo = {
  page: number;
  size: number;
  totalCount: number;
  content: (TAgencyUser & { id: string })[];
};

// 대행사 회원 페이지네이션 조회 (AAG006) params type
export type TAgencyUsersParams = {
  page: number;
  size: number;
  keyword: string;
  orderType: TAgencyUsersOrder;
};

export type TAgencyUsersOrder =
  | "AGENT_ASC"
  | "AGENT_DESC"
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
