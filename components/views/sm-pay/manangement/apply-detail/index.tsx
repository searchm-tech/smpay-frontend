"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import LoadingUI from "@/components/common/Loading";

import OperationMemoSection from "@/components/views/sm-pay/components/OperationMemoSection";

import RuleSection from "../../components/RuleSection";
import ScheduleSection from "../../components/ScheduleSection";
import GuidSection from "../../components/GuideSection";
import AccountDesc from "../../components/AccountDesc";
import AdvertiseStatusDesc from "../../components/AdvertiseStatusDesc";
import AdvertiserDesc from "../../components/AdvertiserDesc";
import RejectModal from "../../components/RejectModal";
import AdvertiserPerformanceSection from "../../components/AdvertiserPerformanceSection";
import { IndicatorDetermineSectionNoSubDesc } from "../../components/IndicatorDetermineSection";

import { JudgementMemoShowSection } from "../../components/JudgementMemoSection";

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
        <RejectModal
          id={id}
          open
          onClose={() => setIsReject(false)}
          onConfirm={() => setIsReject(false)}
          confirmDisabled={true}
        />
      )}
      <GuidSection viewType="reject" onClick={() => setIsReject(true)} />
      <AdvertiseStatusDesc
        status={response.data ? STATUS_LABELS[response.data.status] : ""}
      />
      <AdvertiserDesc advertiserDetail={advertiserData} isReadonly />

      <AccountDesc smPayData={response.data} />

      <AdvertiserPerformanceSection />

      <IndicatorDetermineSectionNoSubDesc />

      <RuleSection id={"1"} isReadonly />

      <ScheduleSection id={"1"} isReadonly />

      <JudgementMemoShowSection />

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
