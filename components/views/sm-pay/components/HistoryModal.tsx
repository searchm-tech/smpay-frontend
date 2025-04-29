import dayjs from "dayjs";
import { Table } from "antd";

import { Modal } from "@/components/composite/modal-components";

import { useSmPayRuleHistory } from "@/hooks/queries/sm-pay";
import { RuleHistory } from "@/types/sm-pay";
import type { ColumnsType } from "antd/es/table";

const columns: ColumnsType<RuleHistory> = [
  {
    title: "변경 일시",
    dataIndex: "date",
    key: "date",
    width: 180,
    render: (value: string) => {
      const date = new Date(value);
      return dayjs(date).format("YYYY-MM-DD HH:mm");
    },
  },
  {
    title: "충전 규칙",
    dataIndex: "rule",
    key: "rule",
    render: (value: string, record: RuleHistory) => (
      <div className="text-sm flex flex-col gap-2">
        <div>
          기준 ROAS가 <span className="font-bold">{record.roas}% 이상</span>
          이면 충전 금액을{" "}
          <span className="text-blue-600">
            {record.increaseType === "flat" ? "정액으로" : "정률로"}
            {record.increase}%씩 증액
          </span>
          하고
        </div>
        <div>
          기준 ROAS가 <span className="font-bold">{record.roas}% 미만</span>
          이면 충전 금액을{" "}
          <span className="text-red-600">
            {record.decreaseType === "flat" ? "정액으로" : "정률로"}
            {record.decrease}%씩 감액
          </span>
          합니다.
        </div>
      </div>
    ),
  },
];

const HistoryModal = ({
  open,
  onClose,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
}) => {
  const { data } = useSmPayRuleHistory(id);

  return (
    <Modal
      open={open}
      onClose={onClose}
      contentClassName="py-0"
      title="충전 규칙 변경 이력"
    >
      <div className="max-h-[500px] overflow-y-auto">
        <Table
          columns={columns}
          dataSource={data?.data}
          pagination={false}
          rowKey={(record) => record.id.toString()}
        />
      </div>
    </Modal>
  );
};

export default HistoryModal;
