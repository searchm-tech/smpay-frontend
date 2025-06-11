// mocks/smPayData.ts
export const mockSmPayData: SmPaySubmitData[] = [
  {
    id: 1,
    key: 1,
    no: 10,
    agencyName: "대행사1",
    departmentName: "홍길동",
    customerId: "123456",
    advertiserId: "advertiser",
    advertiserStatus: "new",
    userName: "카타민 주식회사",
    nickname: "cartamin",
    status: "심사 요청",
    updatedAt: "2025-02-14 18:30",
  },
  {
    id: 2,
    key: 2,
    no: 9,
    agencyName: "대행사2",
    departmentName: "홍길동",
    customerId: "123456",
    advertiserId: "advertiser",
    advertiserStatus: "new",
    userName: "카타민 주식회사",
    nickname: "cartamin",
    status: "심사 요청",
    updatedAt: "2025-02-14 18:30",
  },
  {
    id: 3,
    key: 3,
    no: 8,
    agencyName: "대행사3",
    departmentName: "홍길동",
    customerId: "123456",
    advertiserId: "advertiser",
    advertiserStatus: "new",
    userName: "카타민 주식회사",
    nickname: "cartamin",
    status: "승인",
    updatedAt: "2025-02-14 18:30",
  },
  {
    id: 4,
    key: 4,
    no: 7,
    agencyName: "대행사4",
    departmentName: "홍길동",
    customerId: "123456",
    advertiserId: "advertiser",
    advertiserStatus: "new",
    userName: "카타민 주식회사",
    nickname: "cartamin",
    status: "반려",
    updatedAt: "2025-02-14 18:30",
  },
  {
    id: 5,
    key: 5,
    no: 6,
    agencyName: "대행사5",
    departmentName: "홍길동",
    customerId: "123456",
    advertiserId: "advertiser",
    advertiserStatus: "new",
    userName: "카타민 주식회사",
    nickname: "cartamin",
    status: "일시중지",
    updatedAt: "2025-02-14 18:30",
  },
  {
    id: 6,
    key: 6,
    no: 5,
    agencyName: "대행사6",
    departmentName: "홍길동",
    customerId: "123456",
    advertiserId: "advertiser",
    advertiserStatus: "new",
    userName: "카타민 주식회사",
    nickname: "cartamin",
    status: "해지",
    updatedAt: "2025-02-14 18:30",
  },
];

// types/smPayTypes.ts
export interface SmPaySubmitData {
  id: number;
  key: number;
  no: number;
  agencyName: string; // 대행사명
  departmentName: string; // 담당자명
  customerId: string; // CUSTOMER ID
  advertiserId: string; // 광고주 로그인 ID
  advertiserStatus: "new" | undefined; // 광고주 상태 (new 태그)
  userName: string; // 사업자명
  nickname: string; // 광고주 닉네임
  status: "심사 요청" | "승인" | "반려" | "일시중지" | "해지"; // 상태
  updatedAt: string; // 최종 수정 일시
}
