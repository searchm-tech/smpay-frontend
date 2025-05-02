"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import AdvertiserSection from "../../components/AdvertiserSection";
import RuleSection from "../../components/RuleSection";
import ScheduleSection from "../../components/ScheduleSection";
import StandardSection from "../../components/StandardSection";
import AdvertiseStatusDesc from "../../components/AdvertiseStatusDesc";
import GuidSection from "../../components/GuideSection";
import ApproveModal from "./ApproveModal";
import RejectSendModal from "./RejectSendModal";

import { useSmPaySubmitDetail } from "@/hooks/queries/sm-pay";
import { getSmPayStatusLabel } from "@/utils/status";

import type { AdvertiserData } from "@/types/adveriser";
import AccountDesc from "../../components/AccountDesc";
import LoadingUI from "@/components/common/Loading";
import RejectModal from "../../components/RejectModal";

type SmPayJudgementDetailViewProps = {
  id: string;
};

const SmPayJudgementDetailView = ({ id }: SmPayJudgementDetailViewProps) => {
  const [isApproved, setIsApproved] = useState(false);
  const [isRejectSend, setIsRejectSend] = useState(false);
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

  const handleOpenRejectModal = () => {
    setIsReject(true);
  };

  return (
    <div>
      {isPending && <LoadingUI />}
      <ApproveModal
        open={isApproved}
        onClose={() => setIsApproved(false)}
        onConfirm={() => setIsApproved(false)}
      />

      <RejectSendModal
        open={isRejectSend}
        onClose={() => setIsRejectSend(false)}
        onConfirm={() => setIsRejectSend(false)}
      />

      <RejectModal
        open={isReject}
        onClose={() => setIsReject(false)}
        onConfirm={() => setIsReject(false)}
        confirmDisabled={true}
      />

      <GuidSection
        viewType="reject"
        className="bg-[#FCECEC]"
        onClick={handleOpenRejectModal}
      />

      <AdvertiseStatusDesc
        status={response.data ? getSmPayStatusLabel(response.data.status) : ""}
      />
      <AdvertiserSection advertiserData={advertiserData} />
      <AccountDesc smPayData={response.data} />
      <RuleSection id={"1"} />
      <ScheduleSection id={"1"} />
      <StandardSection />

      <div className="flex justify-center gap-4 py-5">
        <Button className="w-[150px]" onClick={() => setIsApproved(true)}>
          승인
        </Button>
        <Button
          variant="cancel"
          className="w-[150px]"
          onClick={() => setIsRejectSend(true)}
        >
          반려
        </Button>
      </div>
    </div>
  );
};

export default SmPayJudgementDetailView;
