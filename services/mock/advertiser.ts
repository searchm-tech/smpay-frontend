import { AdvertiserData, AdvertiserStatus } from "@/types/adveriser";

const statusList: AdvertiserStatus[] = [
  "AVAILABLE",
  "AGREEMENT_REQUEST",
  "AGREEMENT_REJECTED",
  "AGREEMENT_EXPIRED",
  "AGREEMENT_COMPLETED",
  "REVIEW_REQUEST",
  "REVIEW_PENDING",
  "REVIEW_APPROVED",
  "REVIEW_REJECTED",
];

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
}));
