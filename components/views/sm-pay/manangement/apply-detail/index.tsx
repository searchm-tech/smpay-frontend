"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import AdvertiserSection from "../../components/AdvertiserSection";
import RuleSection from "../../components/RuleSection";
import ScheduleSection from "../../components/ScheduleSection";
import GuidSection from "../../components/GuideSection";

// [대행사, 관리자] SM Pay 관리 -> 조회 -> 신청 내역 상세
const SmPayApplyDetailView = () => {
  const router = useRouter();

  return (
    <div>
      <GuidSection viewType="guide" />
      <AdvertiserSection advertiserData={null} />
      <RuleSection />
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
