"use client";
import { useState } from "react";

import { TooltipHover } from "@/components/composite/tooltip-components";
import { LabelBullet } from "@/components/composite/label-bullet";

import { Button } from "@/components/ui/button";

import ScheduleDesc, {
  ScheduleEditDesc,
} from "@/components/views/sm-pay/components/ScheduleDesc";
import { hoverData } from "@/components/views/sm-pay/components/constants";

import type { ScheduleInfo } from "@/types/sm-pay";

const ScheduleSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [scheduleInfo, setScheduleInfo] = useState<ScheduleInfo | null>(null);

  const handleScheduleInfoChange = (data: ScheduleInfo) => {
    setScheduleInfo(data);
  };

  return (
    <section>
      <div className="flex items-center gap-4 py-2">
        <div className="flex items-center gap-2 py-2">
          <LabelBullet labelClassName="text-base font-bold">
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

      {isEditing ? (
        <ScheduleEditDesc
          scheduleInfo={scheduleInfo}
          handleScheduleInfoChange={handleScheduleInfoChange}
        />
      ) : (
        <ScheduleDesc />
      )}
    </section>
  );
};

export default ScheduleSection;
