export interface AdvertiserData {
  id: number;
  name: string;
  customerId: string;
  loginId: string;
  advertiserName: string;
  status: AdvertiserStatus;
  updatedAt: string;
  businessName: string;
  businessNumber: string;
  businessOwnerName: string;
  businessOwnerPhone: string;
  businessOwnerEmail: string;
}

export type AdvertiserStatus =
  | "AVAILABLE" // 신청 가능 (신청 가능)
  | "AGREEMENT_REQUEST" // 광고주 동의 요청
  | "AGREEMENT_REJECTED" // 광고주 미동의 (신청 가능)
  | "AGREEMENT_EXPIRED" // 광고주 동의 기한 만료
  | "AGREEMENT_COMPLETED" // 광고주 동의 완료
  | "REVIEW_REQUEST" // 심사 요청
  | "REVIEW_PENDING" // 심사 대기
  | "REVIEW_APPROVED" // 심사 승인
  | "REVIEW_REJECTED"; // 심사 반려 (신청 가능)

