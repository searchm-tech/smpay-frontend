import { Fragment } from "react";
import { NumberInput } from "@/components/composite/input-components";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import type { ScheduleInfo } from "@/types/sm-pay";

type ScheduleDescProps = {
  scheduleInfo?: ScheduleInfo | null;
};

const ScheduleDesc = ({ scheduleInfo }: ScheduleDescProps) => {
  if (!scheduleInfo) return <Fragment />;

  return (
    <Descriptions columns={1}>
      <DescriptionItem label="일 최대 충전 한도">
        <span>1일 1회</span>
      </DescriptionItem>
      <DescriptionItem label="최초 충전 금액 설정">
        <span className="text-blue-600">
          {scheduleInfo.firstCharge.toLocaleString()}원
        </span>
      </DescriptionItem>
      <DescriptionItem label="일 최대 충전 한도">
        <span className="text-blue-600">
          {scheduleInfo.maxCharge.toLocaleString()}원
        </span>
      </DescriptionItem>
    </Descriptions>
  );
};

export default ScheduleDesc;

type ScheduleEditDescProps = {
  scheduleInfo: ScheduleInfo | null;
  handleScheduleInfoChange: (value: ScheduleInfo) => void;
};

export const ScheduleEditDesc = ({
  scheduleInfo,
  handleScheduleInfoChange,
}: ScheduleEditDescProps) => {
  if (!scheduleInfo) return <Fragment />;

  return (
    <Descriptions columns={1}>
      <DescriptionItem label="일 최대 충전 한도">
        <span>1일 1회</span>
      </DescriptionItem>
      <DescriptionItem label="최초 충전 금액 설정">
        <NumberInput
          className="max-w-[500px]"
          value={scheduleInfo.firstCharge}
          onChange={(e) =>
            handleScheduleInfoChange({
              ...scheduleInfo,
              firstCharge: Number(e),
            })
          }
        />
      </DescriptionItem>
      <DescriptionItem label="일 최대 충전 한도">
        <NumberInput
          className="max-w-[500px]"
          value={scheduleInfo.maxCharge}
          onChange={(e) =>
            handleScheduleInfoChange({ ...scheduleInfo, maxCharge: Number(e) })
          }
        />
      </DescriptionItem>
    </Descriptions>
  );
};
