import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import LoadingUI from "@/components/common/Loading";

import { LabelBullet } from "@/components/composite/label-bullet";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { TooltipHover } from "@/components/composite/tooltip-components";
import { HelpIcon } from "@/components/composite/icon-components";

import AdvertiserDesc from "../../../components/AdvertiserDesc";
import { RuleEditDesc } from "../../../components/RuleDesc";
import { ScheduleEditDesc } from "../../../components/ScheduleDesc";
import AdvertiserDesEdit from "../../../components/AdvertiserDesEdit";

import {
  useAdvertiserDetail,
  useMutateSendAdvertiserAgreement,
} from "@/hooks/queries/advertiser";

import { HOVER_SMPAY } from "@/constants/hover";
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
  const [isChanged, setIsChanged] = useState(false);

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

  const { data: response, refetch } = useAdvertiserDetail(
    selectedAdNum as number
  );

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

  const onFinishEditAdvertiser = () => {
    refetch();
    setIsChanged(false);
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
        />
      )}

      <div className="mt-4">
        {isChanged && response?.data && (
          <AdvertiserDesEdit
            advertiserDetail={response.data}
            onFinishEdit={onFinishEditAdvertiser}
            onCancel={() => setIsChanged(false)}
          />
        )}

        {!isChanged && response?.data && (
          <AdvertiserDesc
            advertiserDetail={response.data}
            onEdit={() => setIsChanged(true)}
          />
        )}
      </div>

      <section>
        <div className="flex items-center gap-2 py-2">
          <LabelBullet labelClassName="text-base font-bold">
            충전 규칙 설정
          </LabelBullet>

          <TooltipHover
            triggerContent={<HelpIcon />}
            content={HOVER_SMPAY["rule"]}
          />
        </div>
        <RuleEditDesc
          ruleInfo={ruleInfo}
          handleRuleInfoChange={handleRuleInfoChange}
        />
      </section>

      <section>
        <div className="flex items-center gap-2 py-2">
          <LabelBullet labelClassName="text-base font-bold">
            선결제 스케쥴 설정
          </LabelBullet>
          <TooltipHover
            triggerContent={<HelpIcon />}
            content={HOVER_SMPAY["prepayment"]}
          />
        </div>

        <ScheduleEditDesc
          scheduleInfo={scheduleInfo}
          handleScheduleInfoChange={handleScheduleInfoChange}
        />
      </section>

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
