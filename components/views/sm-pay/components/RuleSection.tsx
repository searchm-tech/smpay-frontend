"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { TooltipHover } from "@/components/composite/tooltip-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { ConfirmDialog } from "@/components/composite/modal-components";

import RuleDesc, {
  RuleEditDesc,
} from "@/components/views/sm-pay/components/RuleDesc";
import HistoryModal from "./HistoryModal";
import LoadingUI from "@/components/common/Loading";

import { hoverData } from "@/components/views/sm-pay/components/constants";

import {
  useSmPayRuleInfo,
  useSmPayRuleInfoUpdate,
} from "@/hooks/queries/sm-pay";
import type { RuleInfo } from "@/types/sm-pay";

type RuleSectionProps = {
  id: string;
};
const RuleSection = ({ id }: RuleSectionProps) => {
  const { data: ruleData, refetch } = useSmPayRuleInfo(id);

  const { mutate: updateRuleInfo, isPending: isUpdating } =
    useSmPayRuleInfoUpdate({
      onSuccess: () => {
        setIsConfirm(false);
        setIsEditing(false);
        refetch();
      },
    });

  const [isEditing, setIsEditing] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const [ruleInfo, setRuleInfo] = useState<RuleInfo>({
    id: 0,
    roas: 0,
    increase: 0,
    increaseType: "flat",
    decrease: 0,
    decreaseType: "flat",
  });

  const handleRuleInfoChange = (ruleInfo: RuleInfo) => {
    setRuleInfo(ruleInfo);
  };

  useEffect(() => {
    if (ruleData?.data) {
      setRuleInfo(ruleData.data);
    }
  }, [ruleData]);

  return (
    <section>
      {isUpdating && <LoadingUI title="변경 중..." />}

      {isHistory && (
        <HistoryModal open={isHistory} onClose={() => setIsHistory(false)} />
      )}
      {isConfirm && (
        <ConfirmDialog
          open={isConfirm}
          content="변경하시겠습니까?"
          onClose={() => setIsConfirm(false)}
          onConfirm={() => updateRuleInfo({ id, params: ruleInfo })}
        />
      )}
      <div className="flex items-center gap-4 py-2">
        <div className="flex items-center gap-2 py-2">
          <LabelBullet labelClassName="text-base font-bold">
            충전 규칙 설정
          </LabelBullet>

          <TooltipHover
            triggerContent={hoverData["rule"].triggerContent}
            content={hoverData["rule"].content}
          />
        </div>

        {isEditing ? (
          <div className="flex gap-2">
            <Button className="w-[100px]" onClick={() => setIsConfirm(true)}>
              변경완료
            </Button>
            <Button
              className="w-[100px]"
              variant="cancel"
              onClick={() => setIsEditing(false)}
            >
              취소
            </Button>
          </div>
        ) : (
          <Button className="w-[100px]" onClick={() => setIsEditing(true)}>
            변경하기
          </Button>
        )}

        <Button variant="outline" onClick={() => setIsHistory(true)}>
          변경 이력 보기
        </Button>
      </div>
      {!isEditing && <RuleDesc ruleInfo={ruleData?.data} />}
      {isEditing && (
        <RuleEditDesc
          ruleInfo={ruleInfo}
          handleRuleInfoChange={handleRuleInfoChange}
        />
      )}
    </section>
  );
};

export default RuleSection;
