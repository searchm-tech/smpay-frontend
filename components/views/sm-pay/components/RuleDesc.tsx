import { NumberInput } from "@/components/composite/input-components";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";

import type { RuleInfo } from "@/types/sm-pay";

type RuleDescProps = {
  ruleInfo?: RuleInfo | null;
};

const RuleDesc = ({ ruleInfo }: RuleDescProps) => {
  if (!ruleInfo) return null;

  return (
    <Descriptions columns={1}>
      <DescriptionItem label="충전 규칙 설정">
        <div className="text-sm flex flex-col gap-2">
          <div>
            기준 ROAS가 <span className="font-bold">{ruleInfo.roas}% 이상</span>
            이면 충전 금액을{" "}
            <span className="text-blue-600">
              {ruleInfo.increaseType === "flat" ? "정액으로" : "정률로"}
              {ruleInfo.increase}%씩 증액
            </span>
            하고
          </div>
          <div>
            기준 ROAS가 <span className="font-bold">{ruleInfo.roas}% 미만</span>
            이면 충전 금액을{" "}
            <span className="text-red-600">
              {ruleInfo.decreaseType === "flat" ? "정액으로" : "정률로"}
              {ruleInfo.decrease}%씩 감액
            </span>
            합니다.
          </div>
        </div>
      </DescriptionItem>
    </Descriptions>
  );
};

export default RuleDesc;

// 충전 규식 설정 작성 구간

type RuleEditDescProps = {
  ruleInfo: RuleInfo;

  handleRuleInfoChange: (ruleInfo: RuleInfo) => void;
};

export const RuleEditDesc = ({
  ruleInfo,
  handleRuleInfoChange,
}: RuleEditDescProps) => {
  return (
    <Descriptions columns={1}>
      <DescriptionItem label="충전 규칙 설정">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="min-w-[100px]">기준 ROAS가</span>
            <NumberInput
              className="w-[100px]"
              value={ruleInfo.roas}
              onChange={(e) =>
                handleRuleInfoChange({
                  ...ruleInfo,
                  roas: Number(e),
                })
              }
            />
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
                  <RadioGroupItem
                    value="flat"
                    id="above-flat"
                    checked={ruleInfo.increaseType === "flat"}
                    onClick={() =>
                      handleRuleInfoChange({
                        ...ruleInfo,
                        increaseType: "flat",
                      })
                    }
                  />
                  <Label htmlFor="above-flat">정액으로</Label>
                </div>
                <div className="flex items-center gap-1">
                  <RadioGroupItem
                    value="rate"
                    id="above-rate"
                    checked={ruleInfo.increaseType === "rate"}
                    onClick={() =>
                      handleRuleInfoChange({
                        ...ruleInfo,
                        increaseType: "rate",
                      })
                    }
                  />
                  <Label htmlFor="above-fixed">정액으로</Label>
                </div>
              </RadioGroup>
              <NumberInput
                className="w-[100px]"
                value={ruleInfo.increase}
                onChange={(e) =>
                  handleRuleInfoChange({ ...ruleInfo, increase: Number(e) })
                }
              />
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
                defaultValue="flat"
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-1">
                  <RadioGroupItem
                    value="flat"
                    id="below-flat"
                    checked={ruleInfo.decreaseType === "flat"}
                    onClick={() =>
                      handleRuleInfoChange({
                        ...ruleInfo,
                        decreaseType: "flat",
                      })
                    }
                  />
                  <Label htmlFor="below-flat">정액으로</Label>
                </div>
                <div className="flex items-center gap-1">
                  <RadioGroupItem
                    value="rate"
                    id="below-rate"
                    checked={ruleInfo.decreaseType === "rate"}
                    onClick={() =>
                      handleRuleInfoChange({
                        ...ruleInfo,
                        decreaseType: "rate",
                      })
                    }
                  />
                  <Label htmlFor="below-rate">정액으로</Label>
                </div>
              </RadioGroup>
              <NumberInput
                className="w-[100px]"
                value={ruleInfo.decrease}
                onChange={(e) =>
                  handleRuleInfoChange({ ...ruleInfo, decrease: Number(e) })
                }
              />
              <span>%씩</span>
              <span className="text-red-600">감액합니다.</span>
            </div>
          </div>
        </div>
      </DescriptionItem>

      <DescriptionItem label="설정 결과">
        <div className="text-sm flex flex-col gap-2">
          <p>
            기준 ROAS가 <span className="font-bold">{ruleInfo.roas}% 이상</span>
            이면 충전 금액을{" "}
            <span className="text-blue-600">
              {ruleInfo.increaseType === "flat" ? "정액으로" : "정률로"}
              {ruleInfo.increase}%씩 증액
            </span>
            하고
          </p>
          <p>
            기준 ROAS가 <span className="font-bold">{ruleInfo.roas}% 미만</span>
            이면 충전 금액을{" "}
            <span className="text-red-600">
              {" "}
              {ruleInfo.decreaseType === "flat" ? "정액으로" : "정률로"}{" "}
              {ruleInfo.decrease}%씩 감액
            </span>
            합니다.
          </p>
        </div>
      </DescriptionItem>
    </Descriptions>
  );
};
