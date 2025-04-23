export interface AdvertiserData {
  key: number;
  customerId: string;
  advertiserId: string;
  advertiserNickname: string;
  userName: string;
  infoStatus: "정보 변경" | "정보 등록" | "정보 등록";
  registrationStatus: "등록" | "미등록";
  masterStatus: "등기화" | "비등기화";
  updatedAt: string;
}

export const mockAdvertiserData: AdvertiserData[] = [
  {
    key: 1,
    customerId: "123456",
    advertiserId: "advertiser_01",
    advertiserNickname: "Cartamin",
    userName: "카타민",
    infoStatus: "정보 변경",
    registrationStatus: "등록",
    masterStatus: "등기화",
    updatedAt: "2025-02-14 18:30",
  },
  {
    key: 2,
    customerId: "789012",
    advertiserId: "advertiser_02",
    advertiserNickname: "Cartamin Pro",
    userName: "카타민",
    infoStatus: "정보 변경",
    registrationStatus: "등록",
    masterStatus: "등기화",
    updatedAt: "2025-02-14 18:30",
  },
  {
    key: 3,
    customerId: "345678",
    advertiserId: "advertiser_03",
    advertiserNickname: "Cartamin Plus",
    userName: "카타민",
    infoStatus: "정보 등록",
    registrationStatus: "미등록",
    masterStatus: "비등기화",
    updatedAt: "-",
  },
  {
    key: 4,
    customerId: "901234",
    advertiserId: "advertiser_04",
    advertiserNickname: "Cartamin Gold",
    userName: "카타민",
    infoStatus: "정보 등록",
    registrationStatus: "등록",
    masterStatus: "등기화",
    updatedAt: "2025-02-14 18:30",
  },
  {
    key: 5,
    customerId: "567890",
    advertiserId: "advertiser_05",
    advertiserNickname: "Cartamin Silver",
    userName: "카타민",
    infoStatus: "정보 등록",
    registrationStatus: "미등록",
    masterStatus: "비등기화",
    updatedAt: "-",
  },
  {
    key: 6,
    customerId: "234567",
    advertiserId: "advertiser_06",
    advertiserNickname: "Cartamin Bronze",
    userName: "카타민",
    infoStatus: "정보 변경",
    registrationStatus: "등록",
    masterStatus: "등기화",
    updatedAt: "2025-02-14 18:30",
  },
  {
    key: 7,
    customerId: "890123",
    advertiserId: "advertiser_07",
    advertiserNickname: "Cartamin Premium",
    userName: "카타민",
    infoStatus: "정보 등록",
    registrationStatus: "등록",
    masterStatus: "등기화",
    updatedAt: "2025-02-14 18:30",
  },
  {
    key: 8,
    customerId: "456789",
    advertiserId: "advertiser_08",
    advertiserNickname: "Cartamin Basic",
    userName: "카타민",
    infoStatus: "정보 등록",
    registrationStatus: "미등록",
    masterStatus: "비등기화",
    updatedAt: "-",
  },
  {
    key: 9,
    customerId: "012345",
    advertiserId: "advertiser_09",
    advertiserNickname: "Cartamin Elite",
    userName: "카타민",
    infoStatus: "정보 변경",
    registrationStatus: "등록",
    masterStatus: "등기화",
    updatedAt: "2025-02-14 18:30",
  },
  {
    key: 10,
    customerId: "678901",
    advertiserId: "advertiser_10",
    advertiserNickname: "Cartamin VIP",
    userName: "카타민",
    infoStatus: "정보 등록",
    registrationStatus: "등록",
    masterStatus: "등기화",
    updatedAt: "2025-02-14 18:30",
  },
];
