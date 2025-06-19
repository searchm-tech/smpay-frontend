"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import RuleSection from "@/components/views/sm-pay/components/RuleSection";
import OperationMemoSection from "@/components/views/sm-pay/components/OperationMemoSection";
import JudgementMemoSection from "@/components/views/sm-pay/components/JudgementMemoSection";
import AdvertiseStatusSection from "@/components/views/sm-pay/components/AdvertiseStatusSection";
import ScheduleSection from "@/components/views/sm-pay/components/ScheduleSection";
import AdvertiserSection from "@/components/views/sm-pay/components/AdvertiserSection";
import AccountSection from "@/components/views/sm-pay/components/AccountSection";
import IndicatorsJudementSection from "@/components/views/sm-pay/components/IndicatorsJudementSection";
import GuidSection from "@/components/views/sm-pay/components/GuideSection";

const SMPayManagementHistoryView = () => {
  const router = useRouter();
  const [isReject, setIsReject] = useState(false);

  return (
    <div>
      <GuidSection viewType="reject" onClick={() => setIsReject(true)} />
      <AdvertiseStatusSection isHistory status={""} />
      <AdvertiserSection advertiserDetail={null} />

      <AccountSection smPayData={null} />
      <IndicatorsJudementSection />

      <RuleSection id={"1"} type="show" />

      <ScheduleSection type="show" />

      <JudgementMemoSection type="show" />

      <OperationMemoSection type="show" />

      <div className="flex justify-center gap-4 py-5">
        <Button
          variant="cancel"
          className="w-[150px]"
          onClick={() => router.push("/sm-pay/management/apply-detail/1")}
        >
          닫기
        </Button>
      </div>
    </div>
  );
};

export default SMPayManagementHistoryView;
