import { Volume2 } from "lucide-react";
import { GuideBox } from "@/components/common/Box";
import { Modal } from "@/components/composite/modal-components";
import Table from "@/components/composite/table";
import type { TableProps } from "antd";

type Props = {
  open: boolean;
  onClose: () => void;
};

const AdvertiserSimulationModal = ({ open, onClose }: Props) => {
  return (
    <Modal
      contentClassName="py-0"
      title="광고 성과 예측 시뮬레이션"
      open={open}
      onClose={onClose}
      onConfirm={onClose}
      cancelDisabled
    >
      <div className="w-[85vw] h-[70vh] overflow-y-auto">
        <GuideBox className="mb-2 !flex !flex-col !items-start !justify-start text-left !font-normal !text-sm">
          <div className="flex items-center gap-2">
            <Volume2 />
            <p className="text-lg font-bold">주요 인사이트</p>
          </div>

          <p>
            이 전략으로 28일간 운용 시 전환매출액이{" "}
            <strong className="text-lg">평균 + 12.4% 상승할 것으로 예상</strong>
            됩니다.
          </p>
          <p className="mb-3">
            설정 기준 : 기준 ROAS 320% 이상이면 충전 금액을 정액으로 2,000원씩
            증가하고 320%의 미만이면 충전 금액을 정액으로 2,000원 씩 감액
          </p>

          <p>
            예상 성과는 입력된 기준 ROAS와 증액 조건을 기반으로 28일간 매일의
            광고비와 전환매출액을 예측합니다.
          </p>
          <p>
            자동 증액은 최대 한도 도달 시 중단되며, ROAS는 고정값으로
            계산됩니다.
          </p>
        </GuideBox>
        <div className="flex justify-around gap-8">
          <div className="w-[50%]">
            <p className="flex flex-col text-center sm:text-left px-4 py-2 bg-[#EB680E] text-white mb-2 text-sm ">
              SM Pay 적용 전
            </p>
            <Table<SimulationTableRow>
              dataSource={data}
              columns={columns}
              pagination={false}
            />
          </div>
          <div className="w-[50%]">
            <p className="flex flex-col text-center sm:text-left px-4 py-2 bg-[#EB680E] text-white mb-2 text-sm">
              SM Pay 적용 후
            </p>
            <Table<SimulationTableRow>
              dataSource={data}
              columns={columns}
              pagination={false}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdvertiserSimulationModal;

type SimulationTableRow = {
  id: number;
  date: string;
  adCost: number;
  conversionRevenue: number;
  roas: number;
};

const data: SimulationTableRow[] = [
  {
    id: 0,
    date: "합계",
    adCost: 280000,
    conversionRevenue: 1120000,
    roas: 4,
  },
  ...Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    date: `${i + 1}일차`,
    adCost: 10000,
    conversionRevenue: 40000,
    roas: 4,
  })),
];

const columns: TableProps<SimulationTableRow>["columns"] = [
  {
    title: "날짜",
    dataIndex: "date",
    key: "date",
    align: "center",
    width: 100,
  },
  {
    title: "광고비",
    dataIndex: "adCost",
    key: "adCost",
    align: "right",
    render: (value: number) => value.toLocaleString() + "원",
    width: 120,
  },
  {
    title: "전환매출액",
    dataIndex: "conversionRevenue",
    key: "conversionRevenue",
    align: "right",
    render: (value: number) => value.toLocaleString() + "원",
    width: 140,
  },
  {
    title: "ROAS",
    dataIndex: "roas",
    key: "roas",
    align: "right",
    render: (value: number) => (value * 100).toFixed(0) + "%",
    width: 80,
  },
];
