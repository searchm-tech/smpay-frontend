import { MemberData, ActiveStatus } from "@/types/user";

import type { TSMPayUser } from "@/types/user";

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

// ------------- 실제 목데이터 ---------------

const userTypes: TSMPayUser["type"][] = [
  "ASSOCIATE_ADVERTISER",
  "ADVERTISER",
  "AGENCY_GROUP_MEMBER",
  "AGENCY_GROUP_MANAGER",
  "AGENCY_GROUP_MASTER",
  "OPERATIONS_MANAGER",
  "SYSTEM_ADMINISTRATOR",
];

export const mockUserList: TSMPayUser[] = [
  {
    userId: 1,
    agentId: 1,
    loginId: "admin@smpay.com",
    password: "admin123!",
    status: true,
    isDeleted: false,
    type: "OPERATIONS_MANAGER",
    name: "고길동",
    phoneNumber: "010-1234-5678",
    regDate: new Date(Date.now() - 1 * 86400000).toISOString(),
    updateDate: null,
  },
  {
    userId: 2,
    agentId: 1,
    loginId: "agency@example.com",
    password: "agency123!",
    status: true,
    isDeleted: false,
    type: "ADVERTISER",
    name: "이철수",
    phoneNumber: "010-1234-5678",
    regDate: new Date(Date.now() - 1 * 86400000).toISOString(),
    updateDate: null,
  },
  ...Array.from({ length: 20 }).map((_, i) => ({
    userId: i + 3,
    agentId: Math.floor(Math.random() * 10) + 1,
    loginId: `user${i + 1}@example.com`,
    password: `password${i + 1}`,
    status: i % 2 === 0 ? true : false,
    isDeleted: i % 5 === 0,
    type: userTypes[i % userTypes.length], // 골고루 분포
    name: `이름${i + 1}`,
    phoneNumber: `010-1234-${String(1000 + i).slice(-4)}`,
    regDate: new Date(Date.now() - i * 86400000).toISOString(),
    updateDate:
      i % 4 === 0 ? new Date(Date.now() - i * 43200000).toISOString() : null,
  })),
];
