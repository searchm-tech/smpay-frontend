import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import LoadingUI from "@/components/common/Loading";

import { cn } from "@/lib/utils";

import { LabelBullet } from "@/components/composite/label-bullet";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { TooltipHover } from "@/components/composite/tooltip-components";
import AdvertiserDesc from "../../components/AdvertiserDesc";
import { RuleEditDesc } from "../../components/RuleDesc";
import { ScheduleEditDesc } from "../../components/ScheduleDesc";
import AdvertiserDesEdit from "../../components/AdvertiserDesEdit";

import { HelpIcon } from "@/components/composite/icon-components";

import {
  useAdvertiserDetail,
  useMutateUpdateAdvertiser,
  useMutateSendAdvertiserAgreement,
} from "@/hooks/queries/advertiser";

import { HOVER_SMPAY } from "@/constants/hover";
import { APPLY_WRITE_CONTENT } from "@/constants/dialog";

import type { ViewProps } from ".";
import type { AdvertiserData } from "@/types/adveriser";
import type { RuleInfo, ScheduleInfo } from "@/types/sm-pay";

type ViewWrieProps = ViewProps & {
  selectedAdNum: number | null;
  onSubmit: () => void;
};

const ViewWrite = ({
  onSubmit,
  onCancel,
  display,
  selectedAdNum,
}: ViewWrieProps) => {
  const [isChanged, setIsChanged] = useState(false);

  const [openReqUpdate, setOpenReqUdpate] = useState(false);
  const [openSendSuccess, setOpenSendSuccess] = useState(false);

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

  const { mutate: mutateUpdateAdvertiser, isPending: loadingEdit } =
    useMutateUpdateAdvertiser({
      onSuccess: (data) => {
        setOpenReqUdpate(false);
        setIsChanged(false);
        refetch();
      },
    });

  const { mutate: mutateSendAdAgree, isPending: loadingSend } =
    useMutateSendAdvertiserAgreement({
      onSuccess: () => setOpenSendSuccess(true),
    });

  const [advertiserDetail, setAdvertiserDetail] =
    useState<AdvertiserData | null>(null);

  const [editAdvertiser, setEditAdvertiser] = useState<AdvertiserData | null>(
    null
  );

  const handleRuleInfoChange = (value: RuleInfo) => {
    setRuleInfo({ ...ruleInfo, ...value });
  };

  const handleScheduleInfoChange = (value: ScheduleInfo) => {
    setScheduleInfo({ ...scheduleInfo, ...value });
  };

  const handleAdvertiserEdit = (data: AdvertiserData) => {
    setEditAdvertiser(data);
  };

  const handleSubmitAdvertiser = () => {
    if (editAdvertiser) mutateUpdateAdvertiser(editAdvertiser);
  };

  const handleSendSuccess = () => {
    setOpenSendSuccess(false);
    onSubmit();
  };

  const handleSendAdAgree = () => {
    mutateSendAdAgree({
      id: selectedAdNum as number,
      ruleInfo,
      scheduleInfo,
    });
  };

  useEffect(() => {
    if (response?.data) {
      setAdvertiserDetail(response.data);
    }
  }, [response]);

  return (
    <section className={cn(!display && "hidden")}>
      {loadingEdit && <LoadingUI title="... 정보 변경 중" />}
      {loadingSend && <LoadingUI title="... 동의 요청 중" />}

      {openReqUpdate && (
        <ConfirmDialog
          open
          onClose={() => setOpenReqUdpate(false)}
          onConfirm={handleSubmitAdvertiser}
          content={APPLY_WRITE_CONTENT["req-update"]}
        />
      )}

      {openSendSuccess && (
        <ConfirmDialog
          open
          onConfirm={handleSendSuccess}
          content={APPLY_WRITE_CONTENT["send-success"]}
          cancelDisabled
        />
      )}

      <div className="mt-4">
        <div className="flex items-center gap-4 pb-4">
          <LabelBullet labelClassName="text-base font-bold">
            광고주 기본 정보
          </LabelBullet>

          {isChanged ? (
            <div className="flex gap-2">
              <Button
                className="w-[100px]"
                onClick={() => setOpenReqUdpate(true)}
              >
                변경완료
              </Button>
              <Button
                className="w-[100px]"
                variant="cancel"
                onClick={() => setIsChanged(false)}
              >
                취소
              </Button>
            </div>
          ) : (
            <Button
              className="w-[100px]"
              onClick={() => {
                setEditAdvertiser(advertiserDetail);
                setIsChanged(true);
              }}
            >
              변경하기
            </Button>
          )}
        </div>

        {isChanged && editAdvertiser && (
          <AdvertiserDesEdit
            advertiserDetail={editAdvertiser}
            handleAdvertiserEdit={handleAdvertiserEdit}
          />
        )}

        {!isChanged && <AdvertiserDesc advertiserDetail={advertiserDetail} />}
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
