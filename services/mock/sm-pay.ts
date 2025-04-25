import type { SmPayStatus, SmPayData } from "@/types/sm-pay";

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

export const mockData: SmPayData[] = Array.from({ length: 157 }).map(
  (_, i) => ({
    id: i + 1,
    owner: `대표자 ${i + 1}`,
    accountId: `account_${i + 1}`,
    accountName: `계좌명 ${i + 1}`,
    businessName: `사업자 ${i + 1}`,
    bussiness_num: `110-22-33${i.toString().padStart(2, "0")}`,
    status: statusList[i % statusList.length],
    createdAt: new Date().toISOString().slice(0, 10),
  })
);
