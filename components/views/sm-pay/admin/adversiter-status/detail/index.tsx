"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import LoadingUI from "@/components/common/Loading";
import { Button } from "@/components/ui/button";

import RuleSection from "@/components/views/sm-pay/components/RuleSection";
import OperationMemoSection from "@/components/views/sm-pay/components/OperationMemoSection";
import JudgementMemoSection from "@/components/views/sm-pay/components/JudgementMemoSection";
import AdvertiserDesc from "@/components/views/sm-pay/components/AdvertiserDesc";
import AccountDesc from "@/components/views/sm-pay/components/AccountDesc";
import ScheduleDesc from "@/components/views/sm-pay/components/ScheduleDesc";

import AdvertiseStatusDesc from "../../../components/AdvertiseStatusDesc";
import OperationAccountStatusDesc from "../../../components/OperationAccountStatusDesc";
import GuidSection from "../../../components/GuideSection";
import RejectModal from "./RejectModal";

import { useSmPaySubmitDetail } from "@/hooks/queries/sm-pay";

import type { AdvertiserData } from "@/types/adveriser";
import { STATUS_LABELS } from "@/constants/status";

type Props = {
  id: string;
};

const SmPayAdminAdversiterStatusDetailView = ({ id }: Props) => {
  const router = useRouter();
  const { data: response, isPending } = useSmPaySubmitDetail(id);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

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
        <RejectModal
          open={rejectModalOpen}
          onClose={() => setRejectModalOpen(false)}
          onConfirm={() => setRejectModalOpen(false)}
        />
      )}

      <GuidSection viewType="reject" onClick={() => setRejectModalOpen(true)} />
      <AdvertiseStatusDesc
        status={response.data ? STATUS_LABELS[response.data.status] : ""}
      />
      <AdvertiserDesc advertiserDetail={null} />
      <AccountDesc smPayData={null} />

      <RuleSection id={id} type="show" />
      <ScheduleDesc type="show" />
      <OperationAccountStatusDesc />

      <JudgementMemoSection type="show" />
      <OperationMemoSection type="show" />

      <div className="flex justify-center gap-4 py-5">
        <Button
          className="w-[150px]"
          onClick={() => router.push("/sm-pay/admin/adversiter-status")}
        >
          뒤로
        </Button>
        <Button variant="cancel" className="w-[150px]">
          버튼명
        </Button>
      </div>
    </div>
  );
};

export default SmPayAdminAdversiterStatusDetailView;
