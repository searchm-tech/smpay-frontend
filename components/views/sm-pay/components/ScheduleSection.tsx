"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { TooltipHover } from "@/components/composite/tooltip-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { HelpIcon } from "@/components/composite/icon-components";
import { ConfirmDialog } from "@/components/composite/modal-components";

import LoadingUI from "@/components/common/Loading";
import ScheduleDesc, {
  ScheduleEditDesc,
} from "@/components/views/sm-pay/components/ScheduleDesc";

import {
  useSmPayScheduleInfo,
  useSmPayScheduleInfoUpdate,
} from "@/hooks/queries/sm-pay";
import { HOVER_SMPAY } from "@/constants/hover";

import type { ScheduleInfo } from "@/types/sm-pay";

type ScheduleSectionProps = {
  id: string;
  isReadonly?: boolean;
};

const ScheduleSection = ({ id, isReadonly }: ScheduleSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [scheduleInfo, setScheduleInfo] = useState<ScheduleInfo | null>(null);

  const { data: scheduleInfoData, isPending } = useSmPayScheduleInfo(id);
  const { mutate: mutateUpdate, isPending: loadingUpdate } =
    useSmPayScheduleInfoUpdate({
      onSuccess: () => {
        setIsSaving(false);
        setIsEditing(false);
        setScheduleInfo(null);
      },
    });

  const handleScheduleInfoChange = (data: ScheduleInfo) => {
    setScheduleInfo(data);
  };

  const handleClickEdit = () => {
    setIsEditing(true);
    if (scheduleInfoData) {
      setScheduleInfo(scheduleInfoData.data);
    }
  };

  const handleClickCancel = () => {
    setIsEditing(false);
    setIsSaving(false);
    setScheduleInfo(null);
  };

  const handleClickSave = () => {
    if (!scheduleInfo) return;
    mutateUpdate({ id, params: scheduleInfo });
  };

  const btnGroupComponent = isEditing ? (
    <div className="flex gap-2">
      <Button className="w-[100px]" onClick={() => setIsSaving(true)}>
        변경완료
      </Button>
      <Button
        className="w-[100px]"
        variant="cancel"
        onClick={handleClickCancel}
      >
        취소
      </Button>
    </div>
  ) : (
    <Button className="w-[100px]" onClick={handleClickEdit}>
      변경하기
    </Button>
  );

  return (
    <section>
      {isPending && <LoadingUI title="SM Pay 정보 조회 중..." />}
      {loadingUpdate && <LoadingUI title="저장 중..." />}

      {isSaving && (
        <ConfirmDialog
          open
          content="저장하시겠습니까?"
          onConfirm={handleClickSave}
          onClose={() => setIsSaving(false)}
        />
      )}

      <div className="flex items-center gap-4 py-2">
        <div className="flex items-center gap-2 py-2">
          <LabelBullet labelClassName="text-base font-bold">
            선결제 스케쥴 설정
          </LabelBullet>
          <TooltipHover
            triggerContent={<HelpIcon />}
            content={HOVER_SMPAY["prepayment"]}
          />
        </div>

        {!isReadonly && btnGroupComponent}
      </div>
      {isEditing ? (
        <ScheduleEditDesc
          scheduleInfo={scheduleInfo}
          handleScheduleInfoChange={handleScheduleInfoChange}
        />
      ) : (
        <ScheduleDesc scheduleInfo={scheduleInfoData?.data} />
      )}
    </section>
  );
};

export default ScheduleSection;
