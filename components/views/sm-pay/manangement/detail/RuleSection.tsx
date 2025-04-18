"use client";

import { useState } from "react";

import { TooltipHover } from "@/components/composite/tooltip-components";
import { Button } from "@/components/ui/button";
import { LabelBullet } from "@/components/composite/label-bullet";

import RuleDesc, {
  RuleEditDesc,
} from "@/components/views/sm-pay/components/RuleDesc";

import { hoverData } from "@/components/views/sm-pay/components/constants";
import HistoryModal from "../../components/HistoryModal";

const RuleSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  return (
    <section>
      {isHistory && (
        <HistoryModal open={isHistory} onClose={() => setIsHistory(false)} />
      )}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 py-4">
          <LabelBullet labelClassName="text-base">충전 규칙 설정</LabelBullet>

          <TooltipHover
            triggerContent={hoverData["rule"].triggerContent}
            content={hoverData["rule"].content}
          />
        </div>

        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "취소하기" : "변경하기"}
        </Button>

        <Button variant="outline" onClick={() => setIsHistory(true)}>
          변경 이력 보기
        </Button>
      </div>

      {!isEditing && <RuleDesc />}
      {isEditing && <RuleEditDesc />}
    </section>
  );
};

export default RuleSection;
