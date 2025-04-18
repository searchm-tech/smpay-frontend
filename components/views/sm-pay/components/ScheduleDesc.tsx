import { Input } from '@/components/ui/input';
import { Descriptions } from 'antd';

const descLabelClassName = 'font-bold';

const ScheduleDesc = () => {
  return (
    <Descriptions column={1} bordered styles={{ label: { width: 200 } }}>
      <Descriptions.Item label={<span className={descLabelClassName}>일 최대 충전 한도</span>}>
        <span>1일 1회</span>
      </Descriptions.Item>
      <Descriptions.Item label={<span className={descLabelClassName}>최초 충전 금액 설정</span>}>
        <span className="text-blue-600">100,000원</span>
      </Descriptions.Item>
      <Descriptions.Item label={<span className={descLabelClassName}>일 최대 충전 한도</span>}>
        <span className="text-blue-600">300,000원</span>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ScheduleDesc;

export const ScheduleEditDesc = () => {
  return (
    <Descriptions column={1} bordered styles={{ label: { width: 200 } }}>
      <Descriptions.Item label={<span className={descLabelClassName}>일 최대 충전 한도</span>}>
        <span>1일 1회</span>
      </Descriptions.Item>
      <Descriptions.Item label={<span className={descLabelClassName}>최초 충전 금액 설정</span>}>
        <Input className="max-w-[500px]" />
      </Descriptions.Item>
      <Descriptions.Item label={<span className={descLabelClassName}>일 최대 충전 한도</span>}>
        <Input className="max-w-[500px]" />
      </Descriptions.Item>
    </Descriptions>
  );
};
