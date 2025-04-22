// mocks/accountData.ts
export interface MemberData {
  id: number;
  no: number;
  accountType: string; // 계정유형
  companyName: string; // 대행사명
  name: string; // 이름
  email: string; // 이메일(ID)
  infoStatus: string; // 정보 수정
  status: "정상" | "비활성"; // 상태
  createdAt: string; // 기입일
}

export const mockMemberData: MemberData[] = [
  {
    id: 1,
    no: 10,
    accountType: "그룹장",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    infoStatus: "정보 수정",
    status: "정상",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 2,
    no: 9,
    accountType: "그룹장",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    infoStatus: "정보 수정",
    status: "비활성",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 3,
    no: 8,
    accountType: "그룹원",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    infoStatus: "정보 수정",
    status: "정상",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 4,
    no: 7,
    accountType: "그룹원",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    infoStatus: "정보 수정",
    status: "정상",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 5,
    no: 6,
    accountType: "그룹원",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    infoStatus: "정보 수정",
    status: "정상",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 6,
    no: 5,
    accountType: "그룹원",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    infoStatus: "정보 수정",
    status: "비활성",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 7,
    no: 4,
    accountType: "그룹원",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    infoStatus: "정보 수정",
    status: "정상",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 8,
    no: 3,
    accountType: "그룹원",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    infoStatus: "정보 수정",
    status: "정상",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 9,
    no: 2,
    accountType: "그룹원",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    infoStatus: "정보 수정",
    status: "정상",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 10,
    no: 1,
    accountType: "그룹원",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    infoStatus: "정보 수정",
    status: "정상",
    createdAt: "2025-10-22 15:37:19",
  },
];

// 페이지네이션을 위한 기본 설정
export const defaultPagination = {
  current: 1,
  pageSize: 10,
  total: mockMemberData.length,
};
