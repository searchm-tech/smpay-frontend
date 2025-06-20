"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import LoadingUI from "@/components/common/Loading";

import RuleSection from "@/components/views/sm-pay/components/RuleSection";
import OperationMemoSection from "@/components/views/sm-pay/components/OperationMemoSection";
import JudgementMemoSection from "@/components/views/sm-pay/components/JudgementMemoSection";
import AdvertiseStatusSection from "@/components/views/sm-pay/components/AdvertiseStatusSection";
import ScheduleSection from "@/components/views/sm-pay/components/ScheduleSection";
import AdvertiserSection from "@/components/views/sm-pay/components/AdvertiserSection";
import AccountSection from "@/components/views/sm-pay/components/AccountSection";
import IndicatorsJudementSection from "@/components/views/sm-pay/components/IndicatorsJudementSection";
import GuidSection from "@/components/views/sm-pay/components/GuideSection";

import { RejectDialog } from "../../manangement/dialog";

import { STATUS_LABELS } from "@/constants/status";

import { useSmPaySubmitDetail } from "@/hooks/queries/sm-pay";

import type { AdvertiserData } from "@/types/adveriser";

interface SmPayApplyDetailViewProps {
  id: string;
}

const SmPayApplyDetailView = ({ id }: SmPayApplyDetailViewProps) => {
  const router = useRouter();

  const [isReject, setIsReject] = useState(false);

  const { data: response, isPending } = useSmPaySubmitDetail(id);

  const advertiserData: AdvertiserData | null = response?.data
    ? {
        id: response.data.id,
        name: response.data.advertiserName,
        customerId: response.data.customerId,
        loginId: response.data.loginId,
        advertiserName: response.data.advertiserName,
        status: "AVAILABLE",
        updatedAt: response.data.updatedAt,
        businessName: response.data.businessName,
        businessNumber: response.data.businessNumber,
        businessOwnerName: response.data.businessOwnerName,
        businessOwnerPhone: response.data.businessOwnerPhone,
        businessOwnerEmail: response.data.businessOwnerEmail,
      }
    : null;

  return (
    <div>
      {isPending && <LoadingUI title="SM Pay 정보 조회 중..." />}
      {isReject && (
        <RejectDialog
          id={id}
          onClose={() => setIsReject(false)}
          onConfirm={() => setIsReject(false)}
        />
      )}
      <GuidSection viewType="reject" onClick={() => setIsReject(true)} />
      <AdvertiseStatusSection
        isHistory
        status={response.data ? STATUS_LABELS[response.data.status] : ""}
      />
      <AdvertiserSection advertiserDetail={null} />

      <AccountSection smPayData={response.data} />
      <IndicatorsJudementSection advertiserId={advertiserData?.id || 0} />

      <RuleSection id={"1"} type="show" />

      <ScheduleSection type="show" />

      <JudgementMemoSection type="show" />

      <OperationMemoSection type="show" />

      <div className="flex justify-center gap-4 py-5">
        <Button
          variant="cancel"
          className="w-[150px]"
          onClick={() => router.push("/sm-pay/management")}
        >
          뒤로
        </Button>
      </div>
    </div>
  );
};

export default SmPayApplyDetailView;
