import { NumberInput } from "@/components/composite/input-components";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { ScheduleInfo } from "../manangement/apply-write/ViewWrite";

const ScheduleDesc = () => {
  return (
    <Descriptions columns={1}>
      <DescriptionItem label="일 최대 충전 한도">
        <span>1일 1회</span>
      </DescriptionItem>
      <DescriptionItem label="최초 충전 금액 설정">
        <span className="text-blue-600">100,000원</span>
      </DescriptionItem>
      <DescriptionItem label="일 최대 충전 한도">
        <span className="text-blue-600">300,000원</span>
      </DescriptionItem>
    </Descriptions>
  );
};

export default ScheduleDesc;

type ScheduleEditDescProps = {
  scheduleInfo: ScheduleInfo;
  handleScheduleInfoChange: (value: ScheduleInfo) => void;
};

export const ScheduleEditDesc = ({
  scheduleInfo,
  handleScheduleInfoChange,
}: ScheduleEditDescProps) => {
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
