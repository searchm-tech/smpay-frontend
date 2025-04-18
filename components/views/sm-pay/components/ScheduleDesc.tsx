import { Input } from "@/components/ui/input";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";

const ScheduleDesc = () => {
  return (
    <Descriptions columns={1} bordered>
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

export const ScheduleEditDesc = () => {
  return (
    <Descriptions columns={1} bordered>
      <DescriptionItem label="일 최대 충전 한도">
        <span>1일 1회</span>
      </DescriptionItem>
      <DescriptionItem label="최초 충전 금액 설정">
        <Input className="max-w-[500px]" />
      </DescriptionItem>
      <DescriptionItem label="일 최대 충전 한도">
        <Input className="max-w-[500px]" />
      </DescriptionItem>
    </Descriptions>
  );
};
