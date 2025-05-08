import type { TRole } from "@/services/mock/members";

export type TUser = {
  id: string;
  email: string;
  name: string;
  role: TRole;
  token: string;
};

export interface MemberData {
  id: number;
  no: number;
  accountType: string; // 계정유형
  companyName: string; // 대행사명
  name: string; // 이름
  email: string; // 이메일(ID)
  infoStatus: string; // 정보 수정
  status: ActiveStatus; // 상태
  createdAt: string; // 기입일
}

export type ActiveStatus = "active" | "inactive";
