import { useState } from "react";
import { CircleCheckBig, X } from "lucide-react";
import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { HelpIcon } from "@/components/composite/icon-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { TooltipHover } from "@/components/composite/tooltip-components";
import { TOOLTIP_CONTENT } from "@/constants/hover";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/composite/modal-components";
import Table from "@/components/composite/table";
import type { TableProps } from "antd";
import { useSmPayAdvertiserStatIndicator } from "@/hooks/queries/sm-pay";

type StatusInfo = {
  status: string;
  statusLabel: string;
};

type Props = {
  statusInfo?: StatusInfo;
  advertiserId: number;
};

const IndicatorsJudementSection = ({ advertiserId }: Props) => {
  console.log(advertiserId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: advertiserStatIndicator } =
    useSmPayAdvertiserStatIndicator(advertiserId);

  console.log(advertiserStatIndicator);

  return (
    <section>
      {isModalOpen && <IndicatorModal onClose={() => setIsModalOpen(false)} />}
      <div className="flex items-center gap-4 py-4">
        <LabelBullet labelClassName="text-base font-bold">
          광고 성과 기반 참고용 심사 지표
        </LabelBullet>
        <TooltipHover
          triggerContent={<HelpIcon />}
          content={TOOLTIP_CONTENT["advertiser_performance"]}
        />

        <Button onClick={() => setIsModalOpen(true)}>일별 성과 조회</Button>
      </div>
      <Descriptions bordered columns={2}>
        <DescriptionItem
          label={<span className="font-bold">심사 항목</span>}
          styles={descriptionStyle}
        >
          <span className="font-bold">권장 기준</span>
        </DescriptionItem>
        <DescriptionItem
          label={<span className="font-bold">광고주 데이터</span>}
          styles={descriptionStyle}
        >
          <span className="font-bold">적합 여부</span>
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
          label={
            <span className="font-bold">
              {advertiserStatIndicator?.operationPeriod || 0}개월
            </span>
          }
        >
          {advertiserStatIndicator?.operationPeriod &&
          advertiserStatIndicator?.operationPeriod >= 3 ? (
            <CircleCheckBig color="#34C759" />
          ) : (
            <X color="#FF3B30" />
          )}
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
          label={
            <span className="font-bold">
              {advertiserStatIndicator?.dailyAverageRoas || 0}%
            </span>
          }
        >
          {advertiserStatIndicator?.dailyAverageRoas &&
          advertiserStatIndicator?.dailyAverageRoas >= 400 ? (
            <CircleCheckBig color="#34C759" />
          ) : (
            <X color="#FF3B30" />
          )}
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
              {Number(
                advertiserStatIndicator?.monthlyConvAmt || 0
              ).toLocaleString()}
              원
            </span>
          }
        >
          {advertiserStatIndicator?.monthlyConvAmt &&
          advertiserStatIndicator?.monthlyConvAmt >= 3000000 ? (
            <CircleCheckBig color="#34C759" />
          ) : (
            <X color="#FF3B30" />
          )}
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
              {Number(
                advertiserStatIndicator?.dailySalesAmt || 0
              ).toLocaleString()}
              원
            </span>
          }
        >
          {advertiserStatIndicator?.dailySalesAmt &&
          advertiserStatIndicator?.dailySalesAmt >= 100000 ? (
            <CircleCheckBig color="#34C759" />
          ) : (
            <X color="#FF3B30" />
          )}
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

type ModalProps = {
  onClose: () => void;
};

const IndicatorModal = ({ onClose }: ModalProps) => {
  // TODO : 데이터 관련 api 호출
  return (
    <Modal
      open
      title="일별 성과 조회"
      cancelDisabled
      onClose={onClose}
      onConfirm={onClose}
    >
      <div className="w-[90vw] max-h-[70vh] overflow-y-auto">
        <Table<DataType & { id: number }>
          dataSource={data.map((item, index) => ({ ...item, id: index + 1 }))}
          columns={columns}
          pagination={false}
        />
      </div>
    </Modal>
  );
};

const columns: TableProps<DataType & { id: number }>["columns"] = [
  {
    title: "NO",
    dataIndex: "id",
    key: "id",
    width: 50,
  },
  {
    title: "광고주명",
    dataIndex: "advertiserName",
    key: "advertiserName",
    width: 120,
    fixed: "left",
  },
  {
    title: "날짜",
    dataIndex: "date",
    key: "date",
    width: 120,
  },
  {
    title: "노출수",
    dataIndex: "impressions",
    key: "impressions",
    align: "right",
    render: (value: number) => value.toLocaleString(),
    sorter: (a, b) => a.impressions - b.impressions,
    width: 100,
  },
  {
    title: "클릭수",
    dataIndex: "clicks",
    key: "clicks",
    align: "right",
    render: (value: number) => value.toLocaleString(),
    sorter: (a, b) => a.clicks - b.clicks,
    width: 100,
  },
  {
    title: "클릭단가",
    dataIndex: "cpc",
    key: "cpc",
    align: "right",
    render: (value: number) => value.toLocaleString(),
    sorter: (a, b) => a.cpc - b.cpc,
    width: 100,
  },
  {
    title: "광고비",
    dataIndex: "adCost",
    key: "adCost",
    align: "right",
    render: (value: number) => value.toLocaleString() + "원",
    sorter: (a, b) => a.adCost - b.adCost,
    width: 120,
  },
  {
    title: "전환수",
    dataIndex: "conversions",
    key: "conversions",
    align: "right",
    render: (value: number) => value.toLocaleString(),
    sorter: (a, b) => a.conversions - b.conversions,
    width: 100,
  },
  {
    title: "전환율",
    dataIndex: "conversionRate",
    key: "conversionRate",
    align: "right",
    render: (value: number) => (value * 100).toFixed(2) + "%",
    sorter: (a, b) => a.conversionRate - b.conversionRate,
    width: 100,
  },
  {
    title: "전환단가",
    dataIndex: "cpa",
    key: "cpa",
    align: "right",
    render: (value: number) => value.toLocaleString(),
    sorter: (a, b) => a.cpa - b.cpa,
    width: 100,
  },
  {
    title: "매출액",
    dataIndex: "revenue",
    key: "revenue",
    align: "right",
    render: (value: number) => value.toLocaleString() + "원",
    sorter: (a, b) => a.revenue - b.revenue,
    width: 120,
  },
  {
    title: "ROAS",
    dataIndex: "roas",
    key: "roas",
    align: "right",
    render: (value: number) => (value * 100).toFixed(0) + "%",
    sorter: (a, b) => a.roas - b.roas,
    width: 80,
  },
];

type DataType = {
  advertiserName: string; // 광고주명
  date: string; // 날짜
  impressions: number; // 노출수
  clicks: number; // 클릭수
  cpc: number; // 클릭단가
  adCost: number; // 광고비
  conversions: number; // 전환수
  conversionRate: number; // 전환율 (예: 0.1 -> 0.10%)
  cpa: number; // 전환단가
  revenue: number; // 매출액
  roas: number; // ROAS (예: 3.21 -> 321%)
};

const data: DataType[] = Array.from({ length: 100 }, (_, i) => ({
  advertiserName: `cartamin` + (i % 5 === 0 ? " (합계)" : ""),
  date: i % 5 === 0 ? "-" : `2025-04-12`,
  impressions: i % 5 === 0 ? 123456 : 456,
  clicks: i % 5 === 0 ? 12345 : 234,
  cpc: i % 5 === 0 ? 1234 : 1234,
  adCost: i % 5 === 0 ? 123456 : 1500,
  conversions: i % 5 === 0 ? 456 : 3,
  conversionRate: i % 5 === 0 ? 0.001 : 0.001,
  cpa: i % 5 === 0 ? 12345 : 12325,
  revenue: i % 5 === 0 ? 120123 : 20123,
  roas: i % 5 === 0 ? 3.21 : 3.21,
}));
