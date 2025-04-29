import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import LoadingUI from "@/components/common/Loading";

import { cn } from "@/lib/utils";

import { dialogContent, hoverData } from "../../components/constants";

import { LabelBullet } from "@/components/composite/label-bullet";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { TooltipHover } from "@/components/composite/tooltip-components";
import AdvertiserDesc from "../../components/AdvertiserDesc";
import { RuleEditDesc } from "../../components/RuleDesc";
import { ScheduleEditDesc } from "../../components/ScheduleDesc";
import AdvertiserDesEdit from "../../components/AdvertiserDesEdit";

import {
  useAdvertiserDetail,
  useMutateUpdateAdvertiser,
  useMutateSendAdvertiserAgreement,
} from "@/hooks/queries/advertiser";

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
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [openDialogRequest, setOpenDialogRequest] = useState(false);

  const [ruleInfo, setRuleInfo] = useState<RuleInfo>({
    id: 0,
    roas: 0,
    increase: 0,
    increaseType: "flat", // flat, rate
    decrease: 0,
    decreaseType: "flat", // flat, rate
  });
  const [scheduleInfo, setScheduleInfo] = useState<ScheduleInfo>({
    firstCharge: 0,
    maxCharge: 0,
  });

  const { data: response, refetch } = useAdvertiserDetail(
    selectedAdNum as number
  );

  const { mutate: mutateUpdateAdvertiser, isPending: loadingEdit } =
    useMutateUpdateAdvertiser({
      onSuccess: (data) => {
        console.log("data", data);
        setOpenDialogConfirm(false);
        setIsChanged(false);
        refetch();
      },
    });

  const { mutate: mutateSendAdvertiserAgreement, isPending: loadingSend } =
    useMutateSendAdvertiserAgreement({
      onSuccess: (data) => {
        onSubmit();
      },
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
    if (editAdvertiser) {
      mutateUpdateAdvertiser(editAdvertiser);
    }
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
      {openDialogConfirm && (
        <ConfirmDialog
          open={openDialogConfirm}
          onClose={() => setOpenDialogConfirm(false)}
          onConfirm={handleSubmitAdvertiser}
          content={dialogContent["confirm"].content}
        />
      )}

      {openDialogRequest && (
        <ConfirmDialog
          open={openDialogRequest}
          onConfirm={() => {
            setOpenDialogRequest(false);
            mutateSendAdvertiserAgreement({
              id: selectedAdNum as number,
              ruleInfo,
              scheduleInfo,
            });
          }}
          content={dialogContent["send"].content}
          cancelDisabled={true}
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
                onClick={() => setOpenDialogConfirm(true)}
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
            triggerContent={hoverData["rule"].triggerContent}
            content={hoverData["rule"].content}
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
            triggerContent={hoverData["prepayment"].triggerContent}
            content={hoverData["prepayment"].content}
          />
        </div>

        <ScheduleEditDesc
          scheduleInfo={scheduleInfo}
          handleScheduleInfoChange={handleScheduleInfoChange}
        />
      </section>

      <div className="flex justify-center gap-4 py-5">
        <Button
          className="w-[150px]"
          onClick={() => setOpenDialogRequest(true)}
        >
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
