"use client";

import { useState, useEffect } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { NumberInput } from "@/components/composite/input-components";
import { TooltipHover } from "@/components/composite/tooltip-components";
import { LabelBullet } from "@/components/composite/label-bullet";

import { HelpIcon } from "@/components/composite/icon-components";

import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";

import { TOOLTIP_CONTENT } from "@/constants/hover";

import type { RuleInfo } from "@/types/sm-pay";

type RuleSectionProps = {
  id: string;
  type: "show" | "write";
  ruleInfo?: RuleInfo;
  handleRuleInfoChange?: (value: RuleInfo) => void;
};
const RuleSection = ({
  id,
  type,
  ruleInfo,
  handleRuleInfoChange,
}: RuleSectionProps) => {
  return (
    <section>
      <div className="flex items-center gap-2 py-4">
        <LabelBullet labelClassName="text-base font-bold">
          충전 규칙 설정
        </LabelBullet>

        <TooltipHover
          triggerContent={<HelpIcon />}
          content={TOOLTIP_CONTENT["charge_rule_setting"]}
        />
      </div>

      {type === "show" && (
        <Descriptions columns={1}>
          <DescriptionItem label="충전 규칙 설정">
            <div className="text-sm flex flex-col gap-2 py-4">
              <div>
                기준 ROAS가{" "}
                <span className="font-bold">{ruleInfo?.roas}% 이상</span>
                이면 충전 금액을{" "}
                <span className="text-blue-600">
                  {ruleInfo?.increaseType === "flat" ? "정액으로" : "정률로"}
                  {ruleInfo?.increase}%씩 증액
                </span>
                하고
              </div>
              <div>
                기준 ROAS가{" "}
                <span className="font-bold">{ruleInfo?.roas}% 미만</span>
                이면 충전 금액을{" "}
                <span className="text-red-600">
                  {ruleInfo?.decreaseType === "flat" ? "정액으로" : "정률로"}
                  {ruleInfo?.decrease}%씩 감액
                </span>
                합니다.
              </div>
            </div>
          </DescriptionItem>
        </Descriptions>
      )}

      {type === "write" && (
        <Descriptions columns={1}>
          <DescriptionItem label="충전 규칙 설정">
            <div className="flex flex-col gap-4 py-4">
              <div className="flex items-center gap-2">
                <span className="min-w-[100px]">기준 ROAS가</span>
                <NumberInput
                  className="w-[100px]"
                  value={ruleInfo?.roas}
                  onChange={(e) =>
                    handleRuleInfoChange &&
                    handleRuleInfoChange({
                      ...(ruleInfo || {}),
                      id: ruleInfo?.id || 0,
                      roas: Number(e) || 0,
                    } as RuleInfo)
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
                        checked={ruleInfo?.increaseType === "flat"}
                        onClick={() =>
                          handleRuleInfoChange &&
                          handleRuleInfoChange({
                            ...(ruleInfo || {}),
                            id: ruleInfo?.id || 0,
                            increaseType: "flat",
                          } as RuleInfo)
                        }
                      />
                      <Label htmlFor="above-flat">정액으로</Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <RadioGroupItem
                        value="rate"
                        id="above-rate"
                        checked={ruleInfo?.increaseType === "rate"}
                        onClick={() =>
                          handleRuleInfoChange &&
                          handleRuleInfoChange({
                            ...(ruleInfo || {}),
                            id: ruleInfo?.id || 0,
                            increaseType: "rate",
                          } as RuleInfo)
                        }
                      />
                      <Label htmlFor="above-rate">정률로</Label>
                    </div>
                  </RadioGroup>
                  <NumberInput
                    className="w-[100px]"
                    value={ruleInfo?.increase}
                    onChange={(e) =>
                      handleRuleInfoChange &&
                      handleRuleInfoChange({
                        ...(ruleInfo || {}),
                        id: ruleInfo?.id || 0,
                        increase: Number(e) || 0,
                      } as RuleInfo)
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
                        checked={ruleInfo?.decreaseType === "flat"}
                        onClick={() =>
                          handleRuleInfoChange &&
                          handleRuleInfoChange({
                            ...(ruleInfo || {}),
                            id: ruleInfo?.id || 0,
                            decreaseType: "flat",
                          } as RuleInfo)
                        }
                      />
                      <Label htmlFor="below-flat">정액으로</Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <RadioGroupItem
                        value="rate"
                        id="below-rate"
                        checked={ruleInfo?.decreaseType === "rate"}
                        onClick={() =>
                          handleRuleInfoChange &&
                          handleRuleInfoChange({
                            ...(ruleInfo || {}),
                            id: ruleInfo?.id || 0,
                            decreaseType: "rate",
                          } as RuleInfo)
                        }
                      />
                      <Label htmlFor="below-rate">정률로</Label>
                    </div>
                  </RadioGroup>
                  <NumberInput
                    className="w-[100px]"
                    value={ruleInfo?.decrease}
                    onChange={(e) =>
                      handleRuleInfoChange &&
                      handleRuleInfoChange({
                        ...(ruleInfo || {}),
                        id: ruleInfo?.id || 0,
                        decrease: Number(e) || 0,
                      } as RuleInfo)
                    }
                  />
                  <span>%씩</span>
                  <span className="text-red-600">감액합니다.</span>
                </div>
              </div>
            </div>
          </DescriptionItem>

          <DescriptionItem label="설정 결과">
            <div className="text-sm flex flex-col gap-2 py-4">
              <p>
                기준 ROAS가{" "}
                <span className="font-bold">{ruleInfo?.roas}% 이상</span>
                이면 충전 금액을{" "}
                <span className="text-blue-600">
                  {ruleInfo?.increaseType === "flat" ? "정액으로" : "정률로"}
                  {ruleInfo?.increase}%씩 증액
                </span>
                하고
              </p>
              <p>
                기준 ROAS가{" "}
                <span className="font-bold">{ruleInfo?.roas}% 미만</span>
                이면 충전 금액을{" "}
                <span className="text-red-600">
                  {" "}
                  {ruleInfo?.decreaseType === "flat"
                    ? "정액으로"
                    : "정률로"}{" "}
                  {ruleInfo?.decrease}%씩 감액
                </span>
                합니다.
              </p>
            </div>
          </DescriptionItem>
        </Descriptions>
      )}
    </section>
  );
};

export default RuleSection;
