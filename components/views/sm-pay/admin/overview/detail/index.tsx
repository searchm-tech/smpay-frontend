"use client";

import { useState } from "react";

import LoadingUI from "@/components/common/Loading";
import { Button } from "@/components/ui/button";

import RuleSection from "@/components/views/sm-pay/components/RuleSection";
import OperationMemoSection from "@/components/views/sm-pay/components/OperationMemoSection";
import JudgementMemoSection from "@/components/views/sm-pay/components/JudgementMemoSection";
import ScheduleDesc from "@/components/views/sm-pay/components/ScheduleDesc";

import RejectSendModal from "./RejectSendModal";
import CompleteModal from "./CompleteModal";
import AgencyInfoDesc from "../../../components/AgencyInfoDesc";

import OperationAccountStatusDesc from "../../../components/OperationAccountStatusDesc";
import AdvertiseStatusDesc from "../../../components/AdvertiseStatusDesc";

import { useSmPaySubmitDetail } from "@/hooks/queries/sm-pay";

import { STATUS_LABELS } from "@/constants/status";

import type { AdvertiserData } from "@/types/adveriser";
import AdvertiserDesc from "../../../components/AdvertiserDesc";

type Props = {
  id: string;
};

const SmPayAdminOverviewDetailView = ({ id }: Props) => {
  const { data: response, isPending } = useSmPaySubmitDetail(id);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);

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
      {rejectModalOpen && (
        <RejectSendModal
          open={rejectModalOpen}
          onClose={() => setRejectModalOpen(false)}
          onConfirm={() => setRejectModalOpen(false)}
        />
      )}
      {completeModalOpen && (
        <CompleteModal
          open={completeModalOpen}
          onClose={() => setCompleteModalOpen(false)}
          onConfirm={() => setCompleteModalOpen(false)}
        />
      )}

      <AdvertiseStatusDesc
        status={response.data ? STATUS_LABELS[response.data.status] : ""}
      />

      <div className="flex justify-center gap-1 w-full">
        <AgencyInfoDesc />
        <AdvertiserDesc advertiserDetail={null} />
      </div>

      <RuleSection id={id} type="show" />
      <ScheduleDesc type="show" />
      <OperationAccountStatusDesc />

      <JudgementMemoSection type="show" />
      <OperationMemoSection type="show" />

      <div className="flex justify-center gap-4 py-5">
        <Button
          className="w-[150px]"
          onClick={() => setCompleteModalOpen(true)}
        >
          운영 검토 완료
        </Button>
        <Button
          variant="cancel"
          className="w-[150px]"
          onClick={() => setRejectModalOpen(true)}
        >
          운영 검토 거절
        </Button>
      </div>
    </div>
  );
};

export default SmPayAdminOverviewDetailView;
