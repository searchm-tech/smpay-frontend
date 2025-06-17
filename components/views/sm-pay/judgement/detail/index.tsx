"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/composite/modal-components";

import LoadingUI from "@/components/common/Loading";

import RuleSection from "@/components/views/sm-pay/components/RuleSection";
import OperationMemoSection from "@/components/views/sm-pay/components/OperationMemoSection";
import JudgementMemoSection from "@/components/views/sm-pay/components/JudgementMemoSection";
import ScheduleSection from "@/components/views/sm-pay/components/ScheduleSection";
import AdvertiseStatusSection from "@/components/views/sm-pay/components/AdvertiseStatusSection";
import AdvertiserSection from "@/components/views/sm-pay/components/AdvertiserSection";
import IndicatorsJudementSection from "@/components/views/sm-pay/components/IndicatorsJudementSection";
import AdvertiserSimulationModal from "@/components/views/sm-pay/components/AdvertiserSimulationModal";
import GuidSection from "@/components/views/sm-pay/components/GuideSection";

import ApproveModal from "./ApproveModal";
import RejectSendModal from "./RejectSendModal";
import { RejectDialog } from "@/components/views/sm-pay/manangement/dialog";

import {
  useSmPaySubmitDetail,
  useSmPayStatusUpdate,
} from "@/hooks/queries/sm-pay";

import { STATUS_LABELS } from "@/constants/status";

import type { AdvertiserData } from "@/types/adveriser";

type SmPayJudgementDetailViewProps = {
  id: string;
};

const status = "reject";

const SmPayJudgementDetailView = ({ id }: SmPayJudgementDetailViewProps) => {
  const router = useRouter();

  const [isApproved, setIsApproved] = useState(false);
  const [isRejectSend, setIsRejectSend] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [isRestart, setIsRestart] = useState(false);
  const [isSimulation, setIsSimulation] = useState(false);
  const { data: response, isPending } = useSmPaySubmitDetail(id);

  const { mutate: updateStatus, isPending: isUpdating } = useSmPayStatusUpdate({
    onSuccess: () => {
      setIsRestart(false);
    },
  });

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
      {(isPending || isUpdating) && <LoadingUI />}
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

      {isReject && (
        <RejectDialog
          id={id}
          onClose={() => setIsReject(false)}
          onConfirm={() => setIsReject(false)}
        />
      )}
      {isRestart && (
        <ConfirmDialog
          open
          title="광고주 심사 재개"
          onClose={() => setIsRestart(false)}
          onConfirm={() => updateStatus({ id, status: "REVIEW_APPROVED" })}
          content="광고주 상태를 다시 활성화 하시겠습니까?"
        />
      )}

      {isSimulation && (
        <AdvertiserSimulationModal
          open={isSimulation}
          onClose={() => setIsSimulation(false)}
        />
      )}

      <GuidSection
        viewType="master-judgement"
        onClick={handleOpenRejectModal}
      />
      <AdvertiseStatusSection
        status={response.data ? STATUS_LABELS[response.data.status] : ""}
      />
      <AdvertiserSection advertiserDetail={advertiserData} />

      <IndicatorsJudementSection />

      <RuleSection id={"1"} type="show" />
      <ScheduleSection type="show" />

      <JudgementMemoSection type="show" />

      <OperationMemoSection type="write" />

      {status === "reject" && (
        <div className="flex justify-center gap-4 py-5">
          <Button
            className="minw-[150px]"
            variant="orangeOutline"
            onClick={() => setIsSimulation(true)}
          >
            광고 성과 예측 시뮬레이션
          </Button>

          <Button
            variant="cancel"
            className="w-[150px]"
            onClick={() => router.push("/sm-pay/judgement")}
          >
            심사 승인
          </Button>

          <Button
            variant="secondary"
            className="w-[150px]"
            onClick={() => router.push("/sm-pay/judgement")}
          >
            심사 반려
          </Button>
        </div>
      )}
    </div>
  );
};

export default SmPayJudgementDetailView;
