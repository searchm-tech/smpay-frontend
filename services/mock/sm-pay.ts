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
  })
);
