import { useMemo, useState } from "react";
import { SquareCheckBig, SquareX } from "lucide-react";
import { format } from "date-fns";

import Table from "@/components/composite/table";
import CheckboxLabel from "@/components/composite/checkbox-label";
import { LinkTextButton } from "@/components/composite/button-components";
import { useSidebar } from "@/components/ui/sidebar";

import { useWindowSize } from "@/hooks/useWindowSize";

import { cn } from "@/lib/utils";

import { MOCK_DATA, type TransactionData } from "./constants";
import type { ColumnsType } from "antd/es/table";

const columns: ColumnsType<TransactionData> = [
  {
    key: "agency",
    title: "대행사",
    align: "center",
    dataIndex: "agency",
    onCell: (_, index) => {
      if (index !== undefined && index % 4 === 0) return { rowSpan: 4 };
      return { rowSpan: 0 };
    },
  },
  {
    key: "group",
    title: "그룹원",
    dataIndex: "group",
    align: "center",
    onCell: (_, index) => {
      if (index !== undefined && index % 2 === 0) return { rowSpan: 2 };
      return { rowSpan: 0 };
    },
  },
  {
    key: "advertiser",
    title: "광고주",
    dataIndex: "advertiser",
    align: "center",
    onCell: (_, index) => {
      if (index !== undefined && index % 2 === 0) return { rowSpan: 2 };
      return { rowSpan: 0 };
    },
  },
  {
    key: "date",
    title: "거래일자",
    width: 200,
    dataIndex: "date",
    align: "center",
  },
  {
    key: "txId",
    title: "거래번호",
    dataIndex: "txId",
    align: "center",
    render: (value) => <LinkTextButton>{value}</LinkTextButton>,
  },
  {
    key: "txType",
    title: "거래유형",
    dataIndex: "txType",
    align: "center",
    render: (value) => (
      <span className={value === "충전" ? "text-blue-600" : "text-green-600"}>
        {value}
      </span>
    ),
  },
  {
    key: "bank",
    title: "은행",
    dataIndex: "bank",
    align: "center",
  },
  {
    key: "account",
    title: "계좌번호",
    width: 150,
    dataIndex: "account",
    align: "center",
  },
  {
    key: "depositor",
    title: "예금주",
    dataIndex: "depositor",
    align: "center",
  },
  {
    key: "amount",
    title: "금액",
    dataIndex: "amount",
    align: "center",
    render: (value) => value.toLocaleString(),
  },
  {
    key: "diffAmount",
    title: "이전대비 변화액",
    dataIndex: "diffAmount",
    width: 150,
    align: "center",
    render: (value) => (
      <span className={value < 0 ? "text-red-500" : "text-blue-500"}>
        {value > 0 ? "+" : ""}
        {value.toLocaleString()}
      </span>
    ),
  },
  {
    key: "diffRate",
    title: "이전대비 변화율",
    width: 150,
    dataIndex: "diffRate",
    align: "center",
    render: (value) => (
      <span className={value < 0 ? "text-red-500" : "text-blue-500"}>
        {value > 0 ? "+" : ""}
        {value}%
      </span>
    ),
  },
  {
    key: "repaymentDate",
    title: "상환일자",
    dataIndex: "repaymentDate",
    width: 200,
    align: "center",
    render: (value) => {
      if (value) {
        const date = new Date(value);
        return <span>{format(date, "yyyy-MM-dd")}</span>;
      }

      return <></>;
    },
  },
  {
    key: "repaymentStatus",
    title: "상환상태",
    dataIndex: "repaymentStatus",
    fixed: "right",
    align: "center",
    width: 85,
    render: (value) =>
      value === "success" ? (
        <SquareCheckBig className="text-[#34C759] mx-auto" />
      ) : (
        <SquareX className="text-red-500 mx-auto" />
      ),
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const TableSection: React.FC = () => {
  const { width } = useWindowSize();
  const { state } = useSidebar();

  const [checkedList, setCheckedList] = useState(defaultCheckedList || []);

  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key as string),
  }));

  const tableWidthClass = useMemo(() => {
    // expanded 1440 -> 1160px
    if (state === "expanded" && width <= 1440) {
      return "max-w-[1200px]";
    }

    // collapsed 1440 -> 1330px
    if (state === "collapsed" && width <= 1440) {
      return "max-w-[1330px]";
    }

    return "w-full";
  }, [width, state]);

  return (
    <section>
      <div className="flex flex-wrap gap-4 p-2 py-4 mb-2 border-b border-[#656565]">
        {columns
          .filter((col) => col.key !== "repaymentStatus")
          .map((item) => (
            <CheckboxLabel
              key={item.key}
              isChecked={checkedList.includes(item.key as string)}
              onChange={(checked) => {
                setCheckedList((prev) =>
                  checked
                    ? [...prev, item.key as string]
                    : prev.filter((key) => key !== item.key)
                );
              }}
              label={item.title as string}
            />
          ))}
      </div>

      <div className={cn(tableWidthClass, "")}>
        <Table<TransactionData>
          columns={newColumns}
          dataSource={MOCK_DATA}
          total={MOCK_DATA.length}
          scroll={{ x: 2000 }}
        />
      </div>
    </section>
  );
};

export default TableSection;
