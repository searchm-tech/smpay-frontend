import { MemberData, ActiveStatus } from "@/types/user";

export type TRole = "admin" | "agency";

export interface Member {
  id: string;
  email: string;
  password: string;
  name: string;
  role: TRole;
  status: "active" | "inactive" | "pending";
  department?: string;
}

export const members = [
  // 고정 멤버 1
  {
    id: "1",
    email: "admin@smpay.com",
    password: "admin123!",
    name: "고길동",
    role: "admin",
    status: "active",
    department: "IT",
  },
  // 고정 멤버 2
  {
    id: "2",
    email: "agency@example.com",
    password: "agency123!",
    name: "이철수",
    role: "agency",
    status: "active",
    department: "Marketing",
  },
  // 나머지 목데이터는 동적으로 생성
  ...Array.from({ length: 50 }).map((_, i) => ({
    id: String(i + 3),
    email: `user${i + 1}@example.com`,
    password: "user123",
    name: `사용자${i + 1}`,
    role: "agency",
    status: i % 2 === 0 ? "active" : "inactive",
    department: ["Sales", "HR", "Finance", "Operations"][i % 4],
  })),
];

export const mockMemberData: MemberData[] = [
  ...Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    no: i + 1,
    accountType: i % 2 === 0 ? "agency" : "admin",
    companyName: `대행사${i + 1}`,
    name: `이름${i + 1}`,
    email: `user${i + 1}@example.com`,
    infoStatus: i % 3 === 0 ? "수정 필요" : "정상",
    status: (i % 2 === 0 ? "active" : "inactive") as ActiveStatus,
    createdAt: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
  })),
];
