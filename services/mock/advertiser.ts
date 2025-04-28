import type { AdvertiserData } from "@/types/adveriser";

const statusList = [
  "AVAILABLE",
  "AGREEMENT_REQUEST",
  "AGREEMENT_REJECTED",
  "AGREEMENT_EXPIRED",
  "AGREEMENT_COMPLETED",
  "REVIEW_REQUEST",
  "REVIEW_PENDING",
  "REVIEW_APPROVED",
  "REVIEW_REJECTED",
] as const;

export const mockAdvertiserData: AdvertiserData[] = Array.from({
  length: 20,
}).map((_, i) => ({
  id: i + 1,
  name: `광고주 ${i + 1}`,
  customerId: `CUST_${(i + 1).toString().padStart(5, "0")}`,
  loginId: `user_${(i + 1).toString().padStart(3, "0")}`,
  advertiserName: `광고주 ${i + 1}`,
  status: statusList[i % statusList.length],
  updatedAt: new Date().toISOString().slice(0, 10),
  businessName: `사업자명 ${i + 1}`,
  businessNumber: `${(123 + i).toString().padStart(3, "0")}-${(88 + i)
    .toString()
    .padStart(2, "0")}-${(12345 + i).toString().padStart(5, "0")}`,
  businessOwnerName: `대표자${i + 1}`,
  businessOwnerPhone: `010-${Math.floor(1000 + i)
    .toString()
    .padStart(4, "0")}-${Math.floor(1000 + i * 2)
    .toString()
    .padStart(4, "0")}`,
  businessOwnerEmail: `owner${i + 1}@business${i + 1}.com`,
}));
