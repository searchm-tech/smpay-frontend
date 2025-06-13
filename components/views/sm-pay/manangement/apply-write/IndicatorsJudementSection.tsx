import { CircleCheckBig, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { HelpIcon } from "@/components/composite/icon-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { TooltipHover } from "@/components/composite/tooltip-components";
import { HOVER_SMPAY } from "@/constants/hover";

type StatusInfo = {
  status: string;
  statusLabel: string;
};

type Props = {
  statusInfo?: StatusInfo;
};

const IndicatorsJudementSection = ({ statusInfo }: Props) => {
  return (
    <section>
      <div className="flex items-center gap-4 py-2">
        <LabelBullet labelClassName="text-base font-bold">
          광고 성과 기반 참고용 심사 지표
        </LabelBullet>
        <TooltipHover
          triggerContent={<HelpIcon />}
          content={HOVER_SMPAY["rule"]}
        />

        <Button>일별 성과 조회</Button>
      </div>
      <Descriptions bordered columns={2}>
        <DescriptionItem
          label={<span className="font-bold">심사 항목</span>}
          styles={descriptionStyle}
        >
          권장 기준
        </DescriptionItem>
        <DescriptionItem
          label={<span className="font-bold">광고주 데이터</span>}
          styles={descriptionStyle}
        >
          적합 여부
        </DescriptionItem>
        <DescriptionItem
          styles={descriptionStyle}
          label={
            <div className="font-normal">
              <p className="font-bold">광고 운영 기간</p>
            </div>
          }
        >
          <div className="flex items-center gap-2">
            <p>3개월 이상</p>
            <p
              className="text-xs text-gray-500 w-auto whitespace-nowrap"
              style={{ width: 5 }}
            >
              (1개월 단위로 계산되며, 일 수는 제외하고 1개월은 28일로
              간주합니다.)
            </p>
          </div>
        </DescriptionItem>
        <DescriptionItem
          // TODO :  적합 여부에 따라 색상 변경
          styles={incongruityStyle}
          label={<span className="font-bold">1개월</span>}
        >
          <X color="#FF3B30" />
        </DescriptionItem>
        <DescriptionItem
          styles={descriptionStyle}
          label={<span className="font-bold">일 평균 ROAS</span>}
        >
          400% 이상
        </DescriptionItem>

        <DescriptionItem
          // TODO :  적합 여부에 따라 색상 변경
          styles={conformityStyle}
          label={<span className="font-bold">425%</span>}
        >
          <CircleCheckBig color="#34C759" />
        </DescriptionItem>

        <DescriptionItem
          styles={descriptionStyle}
          label={<span className="font-bold">월 평균 전환 매출</span>}
        >
          300만원 이상
        </DescriptionItem>

        <DescriptionItem
          styles={conformityStyle}
          label={
            <span className="font-bold">
              {Number("9245000").toLocaleString()}원
            </span>
          }
        >
          <CircleCheckBig color="#34C759" />
        </DescriptionItem>

        <DescriptionItem
          styles={descriptionStyle}
          label={<span className="font-bold">일 평균 소진 광고비</span>}
        >
          10만원 이상
        </DescriptionItem>
        <DescriptionItem
          styles={conformityStyle}
          label={
            <span className="font-bold">
              {Number("1200000").toLocaleString()}원
            </span>
          }
        >
          <CircleCheckBig color="#34C759" />
        </DescriptionItem>
      </Descriptions>
    </section>
  );
};

export default IndicatorsJudementSection;

const incongruityStyle = {
  content: { backgroundColor: "#FCECEC" },
  label: { backgroundColor: "#FCECEC" },
};

const conformityStyle = {
  content: { backgroundColor: "#EFF9F3" },
  label: { backgroundColor: "#EFF9F3" },
};

const descriptionStyle = {
  content: { backgroundColor: "rgba(0, 0, 0, 0.02)" },
};
