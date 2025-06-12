import { CircleCheckBig, X } from "lucide-react";
import {
  DescriptionItem,
  Descriptions,
  SubDescItem,
} from "@/components/composite/description-components";
import { HelpIcon } from "@/components/composite/icon-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { TooltipHover } from "@/components/composite/tooltip-components";
import { HOVER_SMPAY } from "@/constants/hover";
import { Button } from "@/components/ui/button";

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

      <Descriptions bordered columns={1} styles={{ label: { width: 200 } }}>
        <DescriptionItem
          label={<span className="font-bold">심사 기준 항목</span>}
          styles={{ content: { backgroundColor: "#EFF9F3" } }}
        >
          <div className="flex gap-2">
            <div className="flex items-center gap-4 font-bold w-1/2">
              광고주 운영 데이터 적합 여부
            </div>
            <SubDescItem>심사 지표 기준</SubDescItem>
          </div>
        </DescriptionItem>
        <DescriptionItem
          label={<span className="font-bold">광고 운영 기간</span>}
          styles={{ content: { backgroundColor: "#EFF9F3" } }}
        >
          <div className="flex gap-2">
            <div className="flex items-center gap-4 font-bold w-1/2">
              1개월 24일 <CircleCheckBig color="#34C759" />
            </div>
            <SubDescItem>(3개월 이상)</SubDescItem>
          </div>
        </DescriptionItem>
        <DescriptionItem
          label={<span className="font-bold">일 평균 ROAS</span>}
          styles={{ content: { backgroundColor: "#FCECEC" } }}
        >
          <div className="flex gap-2">
            <div className="flex items-center gap-4 font-bold w-1/2">
              425% <X color="#FF3B30" />
            </div>
            <SubDescItem>(400% 이상)</SubDescItem>
          </div>
        </DescriptionItem>
        <DescriptionItem
          styles={{ content: { backgroundColor: "#EFF9F3" } }}
          label={<span className="font-bold">일 평균 전환매출</span>}
        >
          <div className="flex gap-2">
            <div className="flex items-center gap-4 font-bold w-1/2">
              {Number("9200000").toLocaleString()}원{" "}
              <CircleCheckBig color="#34C759" />
            </div>
            <SubDescItem>(300만원 이상)</SubDescItem>
          </div>
        </DescriptionItem>
        <DescriptionItem
          styles={{ content: { backgroundColor: "#EFF9F3" } }}
          label={<span className="font-bold">일 평균 소진 광고비</span>}
        >
          <div className="flex gap-2">
            <div className="flex items-center gap-4 font-bold w-1/2">
              1,200,000원 <X color="#FF3B30" />
            </div>
            <SubDescItem>(10만원 이상)</SubDescItem>
          </div>
        </DescriptionItem>
      </Descriptions>
    </section>
  );
};

export default IndicatorsJudementSection;
