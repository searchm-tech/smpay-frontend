"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/composite/modal-components";

import ApproveModal from "./ApproveModal";
import LoadingUI from "@/components/common/Loading";
import AdvertiserSection from "../../components/AdvertiserSection";
import RuleSection from "../../components/RuleSection";
import ScheduleSection from "../../components/ScheduleSection";
import StandardSection from "../../components/StandardSection";
import AdvertiseStatusDesc from "../../components/AdvertiseStatusDesc";
import GuidSection from "../../components/GuideSection";
import RejectSendModal from "./RejectSendModal";
import AccountDesc from "../../components/AccountDesc";
import RejectModal from "../../components/RejectModal";
import {
  useSmPaySubmitDetail,
  useSmPayStatusUpdate,
} from "@/hooks/queries/sm-pay";
import { getSmPayStatusLabel } from "@/utils/status";

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
        <RejectModal
          id={id}
          open
          onClose={() => setIsReject(false)}
          onConfirm={() => setIsReject(false)}
          confirmDisabled={true}
        />
      )}
      {isRestart && (
        <ConfirmDialog
          open
          title="광고주 심사 재개"
          onClose={() => setIsRestart(false)}
          onConfirm={() => {
            updateStatus({ id, status: "REVIEW_APPROVED" });
          }}
          content="광고주 상태를 다시 활성화 하시겠습니까?"
        />
      )}

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

      {/* <div className="flex justify-center gap-4 py-5">
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
      </div> */}

      {status === "reject" && (
        <div className="flex justify-center gap-4 py-5">
          <Button className="w-[150px]" onClick={() => setIsRestart(true)}>
            재개
          </Button>

          <Button
            variant="cancel"
            className="w-[150px]"
            onClick={() => router.push("/sm-pay/judgement")}
          >
            뒤로
          </Button>
        </div>
      )}
    </div>
  );
};

export default SmPayJudgementDetailView;
