import type { MemberData } from "@/types/user";
import { TableParamsMember } from "./admin";

export const mockMemberData: MemberData[] = [
  {
    id: 1,
    no: 10,
    accountType: "그룹장",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    // infoStatus: "정보 수정",
    status: "active",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 2,
    no: 9,
    accountType: "그룹장",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    // infoStatus: "정보 수정",
    status: "inactive",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 3,
    no: 8,
    accountType: "그룹원",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    // infoStatus: "정보 수정",
    status: "active",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 4,
    no: 7,
    accountType: "그룹원",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    // infoStatus: "정보 수정",
    status: "active",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 5,
    no: 6,
    accountType: "그룹원",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    // infoStatus: "정보 수정",
    status: "active",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 6,
    no: 5,
    accountType: "그룹원",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    // infoStatus: "정보 수정",
    status: "inactive",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 7,
    no: 4,
    accountType: "그룹원",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    // infoStatus: "정보 수정",
    status: "active",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 8,
    no: 3,
    accountType: "그룹원",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    // infoStatus: "정보 수정",
    status: "active",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 9,
    no: 2,
    accountType: "그룹원",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    // infoStatus: "정보 수정",
    status: "active",
    createdAt: "2025-10-22 15:37:19",
  },
  {
    id: 10,
    no: 1,
    accountType: "그룹원",
    companyName: "(주)씨차례",
    name: "홍길동",
    email: "12@1212.com",
    // infoStatus: "정보 수정",
    status: "active",
    createdAt: "2025-10-22 15:37:19",
  },
];

// 페이지네이션을 위한 기본 설정
export const defaultPagination = {
  current: 1,
  pageSize: 10,
  total: mockMemberData.length,
};

export const dialogContent = {
  "update-status": "회원 상태가 변경되었습니다.",
  "response-delete": "회원이 삭제되었습니다.",
};

export type DialogTypes = keyof typeof dialogContent;

export const statusDialogContent = {
  NORMAL: (
    <>
      <p>회원을 활성화하면 다시 서비스 이용이 가능해집니다.</p>
      <p>진행하시겠습니까?</p>
    </>
  ),
  STOP: (
    <>
      <p>회원을 비활성화하면 로그인 및 서비스 이용이 제한됩니다.</p>
      <p>진행하시겠습니까?</p>
    </>
  ),
  TEMP: null,
};

export const defaultTableParams: TableParamsMember = {
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  filters: {},
  sortField: "REGISTER_DT_DESC",
  sortOrder: "ascend",
  keyword: "",
};
