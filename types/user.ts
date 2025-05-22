// TODO : 삭제 예정
export type TUser = {
  id: string;
  email: string;
  name: string;
  role: TAuthType;
  token: string;
};

export interface MemberData {
  id: number;
  no: number;
  accountType: string; // 계정유형
  companyName: string; // 대행사명
  name: string; // 이름
  email: string; // 이메일(ID)
  // infoStatus: string; // 정보 수정
  status: ActiveStatus; // 상태
  createdAt: string; // 기입일
}

export type ActiveStatus = "active" | "inactive";

// ------------------------실제 타입------------------------

export type TAuthType =
  | "ASSOCIATE_ADVERTISER"
  | "ADVERTISER"
  | "AGENCY_GROUP_MEMBER"
  | "AGENCY_GROUP_MANAGER"
  | "AGENCY_GROUP_MASTER"
  | "OPERATIONS_MANAGER"
  | "SYSTEM_ADMINISTRATOR";
// 	ASSOCIATE_ADVERTISER : 준광고주 ADVERTISER : 광고주 AGENCY_GROUP_MEMBER : 대행사 그룹원 AGENCY_GROUP_MANAGER : 대행사 그룹장 AGENCY_GROUP_MASTER : 대행사 최상위 그룹장 OPERATIONS_MANAGER : 운영관리자 SYSTEM_ADMINISTRATOR : 시스템 관리자

export type TSMPayUser = {
  id: number;
  agentId: number;
  userId: number;
  status: UserStatus;
  type: TAuthType;
  name: string;
  phoneNumber: string;
};

export type UserStatus = "NORMAL" | "STOP" | "TEMP"; // NORMAL : 활성화 STOP : 비활성화 TEMP : 임시

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
};

export type UserResponseDto = {
  userId: number;
  agentId: number;
  id: string;
  status: UserStatus;
  type: TAuthType;
  name: string;
};

// agents/users/mail-verifications params type
export type TMailVerifyParams = {
  agentCode: string;
  userCode: string;
};

// /admin/api/v1/agents/${agentCode}/users/${userCode} response type
export type TSignUpMailVerifyResponse = {
  url: string;
  loginId: string;
};
