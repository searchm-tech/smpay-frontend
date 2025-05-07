import type {
  SmPayStatus,
  SmPayData,
  RuleInfo,
  ScheduleInfo,
  RuleHistory,
  SmPayJudgementData,
  SmPayJudgementStatus,
} from "@/types/sm-pay";

const statusList: SmPayStatus[] = [
  "ADVERTISER_AGREEMENT_REQUEST",
  "ADVERTISER_DISAGREED",
  "ADVERTISER_AGREEMENT_EXPIRED",
  "ADVERTISER_AGREEMENT_COMPLETED",
  "REVIEW_PENDING",
  "REVIEW_APPROVED",
  "REJECTED",
  "SUSPENDED",
  "TERMINATION_IN_PROGRESS",
  "TERMINATED",
];

const judgementStatusList: SmPayJudgementStatus[] = [
  "REVIEW_REQUEST",
  "APPROVED",
  "REJECTED",
  "SUSPENDED",
  "TERMINATED",
];

export const mockData: SmPayData[] = Array.from({ length: 157 }).map(
  (_, i) => ({
    id: i + 1,
    no: i + 1,
    manager: `담당자 ${i + 1}`,
    customerId: `CUST_${(i + 1).toString().padStart(5, "0")}`,
    loginId: `user_${(i + 1).toString().padStart(3, "0")}`,
    advertiserName: `광고주 ${i + 1}`,
    businessName: `사업자명 ${i + 1}`,
    businessNumber: `123-45-${(i + 1).toString().padStart(5, "0")}`,
    businessOwnerName: `대표자명 ${i + 1}`,
    businessOwnerPhone: `010-${Math.floor(
      1000 + Math.random() * 9000
    )}-${Math.floor(1000 + Math.random() * 9000)}`,
    businessOwnerEmail: `owner${i + 1}@example.com`,
    status: statusList[i % statusList.length],
    createdAt: new Date(
      Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000
    ).toISOString(),
    updatedAt: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
    lastModifiedAt: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
    chargeAccount: `123-45-${(i + 1).toString().padStart(5, "0")}`,
    chargeAccountNumber: `123-45-${(i + 1).toString().padStart(5, "0")}`,
    chargeAccountHolderName: `대표자명 ${i + 1}`,
    chargeAccountBank: `우리은행`,
    chargeAccountBankCode: `123-45-${(i + 1).toString().padStart(5, "0")}`,
    chargeAccountBankName: `우리은행`,
    salesAccount: `123-45-${(i + 1).toString().padStart(5, "0")}`,
    salesAccountNumber: `123-45-${(i + 1).toString().padStart(5, "0")}`,
    salesAccountHolderName: `대표자명 ${i + 1}`,
    salesAccountBank: `우리은행`,
    salesAccountBankCode: `123-45-${(i + 1).toString().padStart(5, "0")}`,
    salesAccountBankName: `우리은행`,
  })
);

export const mockRuleInfo: RuleInfo[] = Array.from({ length: 157 }).map(
  (_, i) => ({
    id: i + 1,
    roas: Math.floor(100 + Math.random() * 50),
    increase: Math.floor(10 + Math.random() * 10),
    increaseType: "flat",
    decrease: Math.floor(10 + Math.random() * 10),
    decreaseType: "flat",
  })
);

export const mockScheduleInfo: ScheduleInfo[] = Array.from({ length: 157 }).map(
  (_, i) => ({
    id: i + 1,
    firstCharge: Math.floor(100000 + Math.random() * 900000),
    maxCharge: Math.floor(300000 + Math.random() * 2000000),
  })
);

export const mockRuleHistory: RuleHistory[] = Array.from({ length: 157 }).map(
  (_, i) => ({
    smPayId: i + 1,
    id: i + 1,
    date: new Date(
      Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000
    ).toISOString(),
    roas: Math.floor(100 + Math.random() * 50),
    increase: Math.floor(10 + Math.random() * 10),
    increaseType: "flat",
    decrease: Math.floor(10 + Math.random() * 10),
    decreaseType: "flat",
  })
);

export const mockSmPayJudgementData: SmPayJudgementData[] = Array.from({
  length: 157,
}).map((_, i) => ({
  id: i + 1,
  key: i + 1,
  no: i + 1,
  agencyName: `대행사 ${i + 1}`,
  departmentName: `담당자 ${i + 1}`,
  customerId: `CID${String(i + 1).padStart(5, "0")}`,
  advertiserId: `AID${String(i + 1).padStart(5, "0")}`,
  advertiserStatus: i % 5 === 0 ? "new" : undefined,
  userName: `사업자${i + 1}`,
  nickname: `광고주${i + 1}`,
  status: judgementStatusList[
    i % judgementStatusList.length
  ] as SmPayJudgementData["status"],
  updatedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(), // 하루씩 이전 날짜
}));
