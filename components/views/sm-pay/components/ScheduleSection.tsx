import { useState } from "react";
import { NumberInput } from "@/components/composite/input-components";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { HelpIcon } from "@/components/composite/icon-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { TooltipHover } from "@/components/composite/tooltip-components";

import { TOOLTIP_CONTENT } from "@/constants/hover";

import type { ScheduleInfo } from "@/types/sm-pay";

type Props = {
  scheduleInfo?: ScheduleInfo | null;
  type?: "show" | "write";
  handleScheduleInfoChange?: (value: ScheduleInfo) => void;
};

const ScheduleSection = ({
  scheduleInfo,
  type,
  handleScheduleInfoChange,
}: Props) => {
  console.log(scheduleInfo);
  return (
    <section>
      <div className="flex items-center gap-2 py-4">
        <LabelBullet labelClassName="text-base font-bold">
          선결제 스케쥴 설정
        </LabelBullet>
        <TooltipHover
          triggerContent={<HelpIcon />}
          content={TOOLTIP_CONTENT["prepayment_schedule_setting"]}
        />
      </div>

      {type === "show" && (
        <Descriptions columns={1}>
          <DescriptionItem label="일 최대 충전 한도">
            <span>1일 1회</span>
          </DescriptionItem>
          <DescriptionItem label="최초 충전 금액 설정">
            <span className="text-blue-600">
              {scheduleInfo?.firstCharge.toLocaleString()}원
            </span>
          </DescriptionItem>
          <DescriptionItem label="일 최대 충전 한도">
            <span className="text-blue-600">
              {scheduleInfo?.maxCharge.toLocaleString()}원
            </span>
          </DescriptionItem>
        </Descriptions>
      )}

      {type === "write" && (
        <Descriptions columns={1}>
          <DescriptionItem label="충전 스케쥴">
            <span>1일 1회</span>
          </DescriptionItem>
          <DescriptionItem label="최초 충전 금액 설정">
            <NumberInput
              className="max-w-[500px]"
              value={scheduleInfo?.firstCharge}
              onChange={(e) =>
                handleScheduleInfoChange &&
                handleScheduleInfoChange({
                  ...(scheduleInfo || {}),
                  firstCharge: Number(e) || 0,
                } as ScheduleInfo)
              }
            />
          </DescriptionItem>
          <DescriptionItem label="일 최대 충전 한도">
            <NumberInput
              className="max-w-[500px]"
              value={scheduleInfo?.maxCharge}
              onChange={(e) =>
                handleScheduleInfoChange &&
                handleScheduleInfoChange({
                  ...(scheduleInfo || {}),
                  maxCharge: Number(e) || 0,
                } as ScheduleInfo)
              }
            />
          </DescriptionItem>
        </Descriptions>
      )}
    </section>
  );
};

export default ScheduleSection;
