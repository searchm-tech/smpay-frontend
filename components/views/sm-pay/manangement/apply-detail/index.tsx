"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSmPaySubmitDetail } from "@/hooks/queries/sm-pay";
import { useEffect } from "react";

import AdvertiserSection from "../../components/AdvertiserSection";
import RuleSection from "../../components/RuleSection";
import ScheduleSection from "../../components/ScheduleSection";
import GuidSection from "../../components/GuideSection";
import LoadingUI from "@/components/common/Loading";
import { AdvertiserData } from "@/types/adveriser";

interface SmPayApplyDetailViewProps {
  id: string;
}

// [대행사, 관리자] SM Pay 관리 -> 조회 -> 신청 내역 상세
const SmPayApplyDetailView = ({ id }: SmPayApplyDetailViewProps) => {
  const router = useRouter();

  useEffect(() => {
    console.log("Component received id:", id);
  }, [id]);

  const { data, isPending } = useSmPaySubmitDetail(id);

  console.log("Component rendering with id:", id);

  if (isPending) {
    return <LoadingUI title="SM Pay 정보 조회 중..." />;
  }

  const advertiserData: AdvertiserData | null = data?.data
    ? {
        id: data.data.id,
        name: data.data.advertiserName,
        customerId: data.data.customerId,
        loginId: data.data.loginId,
        advertiserName: data.data.advertiserName,
        status: "AVAILABLE",
        updatedAt: data.data.updatedAt,
        businessName: data.data.businessName,
        businessNumber: data.data.businessNumber,
        businessOwnerName: data.data.businessOwnerName,
        businessOwnerPhone: data.data.businessOwnerPhone,
        businessOwnerEmail: data.data.businessOwnerEmail,
      }
    : null;

  return (
    <div>
      <GuidSection viewType="guide" />
      <AdvertiserSection advertiserData={advertiserData} />
      <RuleSection id={id} />
      <ScheduleSection />

      <div className="flex justify-center gap-4 py-5">
        <Button className="w-[150px]">확인</Button>
        <Button
          variant="cancel"
          className="w-[150px]"
          onClick={() => router.push("/sm-pay/management")}
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default SmPayApplyDetailView;
