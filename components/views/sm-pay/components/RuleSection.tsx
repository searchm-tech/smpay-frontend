"use client";

import { useState, useEffect } from "react";

import { TooltipHover } from "@/components/composite/tooltip-components";
import { Button } from "@/components/ui/button";
import { LabelBullet } from "@/components/composite/label-bullet";

import RuleDesc, {
  RuleEditDesc,
} from "@/components/views/sm-pay/components/RuleDesc";
import { hoverData } from "@/components/views/sm-pay/components/constants";
import HistoryModal from "./HistoryModal";

import type { RuleInfo } from "@/types/sm-pay";
import { useSmPayRuleInfo } from "@/hooks/queries/sm-pay";

type RuleSectionProps = {
  id: string;
};
const RuleSection = ({ id }: RuleSectionProps) => {
  const { data: ruleData } = useSmPayRuleInfo(id);

  const [isEditing, setIsEditing] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
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

  console.log(ruleData);

  useEffect(() => {
    if (ruleData?.data) {
      setRuleInfo(ruleData.data);
    }
  }, [ruleData]);

  return (
    <section>
      {isHistory && (
        <HistoryModal open={isHistory} onClose={() => setIsHistory(false)} />
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
            <Button className="w-[100px]" onClick={() => setIsEditing(false)}>
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
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
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
