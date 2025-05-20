// TODO : 삭제 예정
import { MemberData, ActiveStatus } from "@/types/user";

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
