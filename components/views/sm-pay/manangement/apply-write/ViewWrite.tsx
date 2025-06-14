import { useState } from "react";

import { Button } from "@/components/ui/button";
import LoadingUI from "@/components/common/Loading";

import { ConfirmDialog } from "@/components/composite/modal-components";

import RuleSection from "@/components/views/sm-pay/components/RuleSection";
import JudgementMemoSection from "@/components/views/sm-pay/components/JudgementMemoSection";
import AdvertiserSection from "@/components/views/sm-pay/components/AdvertiserSection";
import ScheduleSection from "@/components/views/sm-pay/components/ScheduleSection";
import AdvertiseStatusSection from "@/components/views/sm-pay/components/AdvertiseStatusSection";

import IndicatorsJudementSection from "./IndicatorsJudementSection";

import {
  useAdvertiserDetail,
  useMutateSendAdvertiserAgreement,
} from "@/hooks/queries/advertiser";

import { STATUS_LABELS } from "@/constants/status";
import {
  ApplyWriteModal,
  type ApplyWriteModalStatus,
} from "@/constants/dialog";

import type { RuleInfo, ScheduleInfo } from "@/types/sm-pay";

type ViewWrieProps = {
  selectedAdNum: number | null;
  onSubmit: () => void;
  onCancel: () => void;
};

const ViewWrite = ({ onSubmit, onCancel, selectedAdNum }: ViewWrieProps) => {
  const [writeModal, setWriteModal] = useState<ApplyWriteModalStatus | null>(
    null
  );

  const [ruleInfo, setRuleInfo] = useState<RuleInfo>({
    id: 0,
    roas: 0,
    increase: 0,
    increaseType: "flat", // flat, rate
    decrease: 0,
    decreaseType: "flat", // flat, rate
  });
  const [scheduleInfo, setScheduleInfo] = useState<ScheduleInfo>({
    id: 0,
    firstCharge: 0,
    maxCharge: 0,
  });

  const { data: response } = useAdvertiserDetail(selectedAdNum as number);

  const { mutate: mutateSendAdAgree, isPending: loadingSend } =
    useMutateSendAdvertiserAgreement({
      onSuccess: () => setWriteModal("send-success"),
    });

  const handleRuleInfoChange = (value: RuleInfo) => {
    setRuleInfo({ ...ruleInfo, ...value });
  };

  const handleScheduleInfoChange = (value: ScheduleInfo) => {
    setScheduleInfo({ ...scheduleInfo, ...value });
  };

  const handleConfrimModal = () => {
    // 동의 요청 완료
    if (writeModal === "send-success") {
      setWriteModal(null);
      onSubmit();
      return;
    }
  };

  const handleSendAdAgree = () => {
    mutateSendAdAgree({
      id: selectedAdNum as number,
      ruleInfo,
      scheduleInfo,
    });
  };

  return (
    <section className="mt-4">
      {loadingSend && <LoadingUI title="... 동의 요청 중" />}

      {writeModal && (
        <ConfirmDialog
          open
          onClose={() => setWriteModal(null)}
          onConfirm={handleConfrimModal}
          content={ApplyWriteModal[writeModal]}
          cancelDisabled={writeModal === "send-success"}
        />
      )}

      <div className="mt-4">
        <AdvertiseStatusSection
          status={response?.data ? STATUS_LABELS["REVIEW_PENDING"] : ""}
        />

        <AdvertiserSection advertiserDetail={response?.data || null} />

        <IndicatorsJudementSection />
      </div>

      <RuleSection id={"1"} type="write" />

      <ScheduleSection type="write" />
      <JudgementMemoSection type="write" />

      <div className="flex justify-center gap-4 py-5">
        <Button className="w-[150px]" onClick={handleSendAdAgree}>
          광고주 동의 요청 발송
        </Button>
        <Button variant="cancel" className="w-[150px]" onClick={onCancel}>
          취소
        </Button>
      </div>
    </section>
  );
};

export default ViewWrite;
