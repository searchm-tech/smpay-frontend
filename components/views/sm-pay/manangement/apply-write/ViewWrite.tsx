import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

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
} from "@/hooks/queries/advertiser";

import type { ViewProps } from ".";
import type { AdvertiserData } from "@/types/adveriser";

import LoadingUI from "@/components/common/Loading";

type ViewWrieProps = ViewProps & {
  selectedAdNum: number | null;
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

  const [advertiserDetail, setAdvertiserDetail] =
    useState<AdvertiserData | null>(null);

  const [editAdvertiser, setEditAdvertiser] = useState<AdvertiserData | null>(
    null
  );

  const handleCancel = () => {
    setOpenDialogRequest(true);
  };

  const handleAdvertiserEdit = (data: AdvertiserData) => {
    setEditAdvertiser(data);
  };

  const handleSubmitAdvertiser = () => {
    console.log("????");
    if (editAdvertiser) {
      mutateUpdateAdvertiser(editAdvertiser);
    }
  };

  console.log(advertiserDetail);

  const handleCancelAdvertiser = () => {
    setIsChanged(false);
  };

  useEffect(() => {
    if (response?.data) {
      setAdvertiserDetail(response.data);
    }
  }, [response]);

  return (
    <section className={cn(!display && "hidden")}>
      {loadingEdit && <LoadingUI title="... 정보 변경 중" />}
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
            onCancel();
            setOpenDialogRequest(false);
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
        <RuleEditDesc />
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

        <ScheduleEditDesc />
      </section>

      <div className="flex justify-center gap-4 py-5">
        <Button className="w-[150px]" onClick={() => {}}>
          신청
        </Button>
        <Button variant="cancel" className="w-[150px]" onClick={handleCancel}>
          취소
        </Button>
      </div>
    </section>
  );
};

export default ViewWrite;
