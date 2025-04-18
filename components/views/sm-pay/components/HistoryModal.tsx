import { Modal } from "@/components/composite/modal-components";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface RuleData {
  id: number;
  date: string;
  rule: string;
}

const data: RuleData[] = [
  {
    id: 1,
    date: "2024-01-15 05:12",
    rule: `기존 ROAS가 **400% 이상**이면 충전 금액을 **정률로 3%**씩 <span class="text-blue-600">증액</span>하고<br />
            기존 ROAS가 **400% 미만**이면 충전 금액을 **정률로 5%**씩 <span class="text-red-500">감액</span>합니다.`,
  },
  {
    id: 2,
    date: "2024-01-15 05:12",
    rule: `기존 ROAS가 **400% 이상**이면 충전 금액을 **정률로 3%**씩 <span class="text-blue-600">증액</span>하고<br />
            기존 ROAS가 **400% 미만**이면 충전 금액을 **정률로 5%**씩 <span class="text-red-500">감액</span>합니다.`,
  },
  // 추가 데이터...
];

const columns: ColumnsType<RuleData> = [
  {
    title: "변경 일시",
    dataIndex: "date",
    key: "date",
    width: 180,
  },
  {
    title: "충전 규칙",
    dataIndex: "rule",
    key: "rule",
    render: (value: string) => (
      <div
        className="whitespace-pre-line leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: value.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
        }}
      />
    ),
  },
];

const HistoryModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal open={open} onClose={onClose} contentClassName="py-0">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.id.toString()}
      />
    </Modal>
  );
};

export default HistoryModal;
