"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import LoadingUI from "@/components/common/Loading";
import { ConfirmDialog } from "@/components/composite/modal-components";

import AdvertiserSection from "../../components/AdvertiserSection";
import ScheduleSection from "../../components/ScheduleSection";
import RuleSection from "../../components/RuleSection";
import GuidSection from "../../components/GuideSection";
import AccountDesc from "../../components/AccountDesc";

import {
  useSmPaySubmitDetail,
  useSmPayApplySubmit,
} from "@/hooks/queries/sm-pay";

import { APPLY_SUBMIT_CONTENT } from "@/constants/dialog";
import type { AdvertiserData } from "@/types/adveriser";

interface ApplySubmitViewProps {
  id: string;
}

const ApplySubmitView = ({ id }: ApplySubmitViewProps) => {
  const router = useRouter();
  const { data, isPending } = useSmPaySubmitDetail(id);

  const {
    mutate: applySubmit,
    isPending: isApplySubmitPending,
    isSuccess,
  } = useSmPayApplySubmit();

  const [isSubmit, setIsSubmit] = useState(false);

  const advertiserData: AdvertiserData = {
    id: data?.data?.id || 0,
    name: data?.data?.advertiserName || "",
    customerId: data?.data?.customerId || "",
    loginId: data?.data?.loginId || "",
    advertiserName: data?.data?.advertiserName || "",
    status: "AVAILABLE",
    updatedAt: data?.data?.updatedAt || "",
    businessName: data?.data?.businessName || "",
    businessNumber: data?.data?.businessNumber || "",
    businessOwnerName: data?.data?.businessOwnerName || "",
    businessOwnerPhone: data?.data?.businessOwnerPhone || "",
    businessOwnerEmail: data?.data?.businessOwnerEmail || "",
  };

  return (
    <div>
      {isPending && <LoadingUI title="SM Pay 정보 조회 중..." />}
      {isApplySubmitPending && <LoadingUI title="심사 요청 중..." />}

      {isSuccess && (
        <ConfirmDialog
          open
          onConfirm={() => router.push("/sm-pay/management")}
          cancelDisabled
          content={APPLY_SUBMIT_CONTENT["success-apply"]}
        />
      )}

      {isSubmit && (
        <ConfirmDialog
          open={isSubmit}
          onClose={() => setIsSubmit(false)}
          onConfirm={() => applySubmit(id)}
          content={APPLY_SUBMIT_CONTENT["req-apply"]}
        />
      )}

      <GuidSection viewType="submit" />

      <div className="mt-4 flex flex-col gap-2">
        <AdvertiserSection advertiserData={advertiserData} />
        <AccountDesc smPayData={data?.data} />
        <RuleSection id={id} />
        <ScheduleSection id={id} />
      </div>

      <div className="flex justify-center gap-4 py-5">
        <Button className="w-[150px]" onClick={() => setIsSubmit(true)}>
          심사 요청
        </Button>
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

export default ApplySubmitView;
