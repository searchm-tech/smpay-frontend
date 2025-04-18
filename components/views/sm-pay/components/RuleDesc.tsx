import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";

const RuleDesc = () => {
  return (
    <Descriptions columns={1} bordered>
      <DescriptionItem label="충전 규칙 설정">
        <div className="text-sm flex flex-col gap-2">
          <p>
            기준 ROAS가 <span className="font-medium">400% 이상</span>이면 충전
            금액을 <span className="text-blue-600">정률로 3%씩 증액</span>하고
          </p>
          <p>
            기준 ROAS가 <span className="font-medium">400% 미만</span>이면 충전
            금액을 <span className="text-red-600">정률로 5%씩 감액</span>합니다.
          </p>
        </div>
      </DescriptionItem>
    </Descriptions>
  );
};

export default RuleDesc;

// 충전 규식 설정 작성 구간
export const RuleEditDesc = () => {
  return (
    <Descriptions columns={1} bordered>
      <DescriptionItem label="충전 규칙 설정">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="min-w-[100px]">기준 ROAS가</span>
            <Input className="w-[100px]" />
            <span>%</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="min-w-[100px]">
                <strong>이상</strong>이면 충전 금액을
              </span>
              <RadioGroup
                defaultValue="percent"
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="percent" id="above-percent" />
                  <Label htmlFor="above-percent">정률로</Label>
                </div>
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="fixed" id="above-fixed" />
                  <Label htmlFor="above-fixed">정액으로</Label>
                </div>
              </RadioGroup>
              <Input className="w-[100px]" />
              <span>%씩</span>
              <span className="text-blue-600">증액하고</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="min-w-[100px]">
                <strong>미만</strong>이면 충전 금액을
              </span>
              <RadioGroup
                defaultValue="percent"
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="percent" id="below-percent" />
                  <Label htmlFor="below-percent">정률로</Label>
                </div>
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="fixed" id="below-fixed" />
                  <Label htmlFor="below-fixed">정액으로</Label>
                </div>
              </RadioGroup>
              <Input className="w-[100px]" />
              <span>%씩</span>
              <span className="text-red-600">감액합니다.</span>
            </div>
          </div>
        </div>
      </DescriptionItem>

      <DescriptionItem label="설정 결과">
        <div className="text-sm flex flex-col gap-2">
          <p>
            기준 ROAS가 <span className="font-medium">400% 이상</span>이면 충전
            금액을 <span className="text-blue-600">정률로 3%씩 증액</span>하고
          </p>
          <p>
            기준 ROAS가 <span className="font-medium">400% 미만</span>이면 충전
            금액을 <span className="text-red-600">정률로 5%씩 감액</span>합니다.
          </p>
        </div>
      </DescriptionItem>
    </Descriptions>
  );
};
