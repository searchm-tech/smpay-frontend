"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { LabelBullet } from "@/components/composite/label-bullet";
import { TooltipHover } from "@/components/composite/tooltip-components";

import ScheduleDesc from "../../components/ScheduleDesc";
import { ScheduleEditDesc } from "../../components/ScheduleDesc";
import { hoverData } from "../../components/constants";

const ScheduleSection = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 py-4">
          <LabelBullet labelClassName="text-base">
            선결제 스케쥴 설정
          </LabelBullet>
          <TooltipHover
            triggerContent={hoverData["prepayment"].triggerContent}
            content={hoverData["prepayment"].content}
          />
        </div>

        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          변경하기
        </Button>
      </div>

      {isEditing ? <ScheduleEditDesc /> : <ScheduleDesc />}
    </section>
  );
};

export default ScheduleSection;
