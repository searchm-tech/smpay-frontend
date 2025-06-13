import { useMemo, useState } from "react";
import { SquareCheckBig, SquareX, TriangleAlert } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import Table from "@/components/composite/table";
import CheckboxLabel from "@/components/composite/checkbox-label";

import { useSidebar } from "@/components/ui/sidebar";
import { useWindowSize } from "@/hooks/useWindowSize";
import { cn } from "@/lib/utils";

import {
  calcRowSpan,
  chargeTableMockData,
  type ChargeTableRow,
} from "./constants";
import type { ColumnsType } from "antd/es/table";

export const columns: ColumnsType<ChargeTableRow> = [
  // {
  //   key: "id",
  //   title: "ID",
  //   dataIndex: "id",
  //   align: "center",
  //   width: 60,
  // },
  {
    key: "manager",
    title: "담당자",
    dataIndex: "manager",
    align: "center",
  },
  {
    key: "customerId",
    title: "CUSTOMER ID",
    dataIndex: "customerId",
    align: "center",
    width: 150,
  },
  {
    key: "advertiser",
    title: "광고주",
    dataIndex: "advertiser",
    align: "center",
  },
  {
    key: "date",
    title: "거래일자",
    dataIndex: "date",
    align: "center",
    width: 180,
    render: (value) => format(value, "yyyy-MM-dd HH:mm:ss"),
  },
  {
    key: "dealNo",
    title: "거래번호",
    dataIndex: "dealNo",
    align: "center",
    width: 150,
  },
  {
    key: "dealType",
    title: "거래유형",
    dataIndex: "dealType",
    align: "center",
    width: 90,
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
    key: "accountNumber",
    title: "계좌번호",
    dataIndex: "accountNumber",
    align: "center",
    width: 180,
  },
  {
    key: "accountHolder",
    title: "예금주",
    dataIndex: "accountHolder",
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
    key: "prevAmount",
    title: "이전대비 변화액",
    dataIndex: "prevAmount",
    align: "center",
    render: (value) => (
      <span className={value < 0 ? "text-red-500" : "text-blue-500"}>
        {value > 0 ? "+" : ""}
        {value.toLocaleString()}
      </span>
    ),
  },
  {
    key: "prevRate",
    title: "이전대비 변화율",
    dataIndex: "prevRate",
    align: "center",
    render: (value) => (
      <span className={value < 0 ? "text-red-500" : "text-blue-500"}>
        {value > 0 ? "+" : ""}
        {value}%
      </span>
    ),
  },
  {
    key: "statusDate",
    title: "상황일",
    dataIndex: "statusDate",
    align: "center",
  },
  {
    key: "situation",
    title: "상황여부",
    dataIndex: "situation",
    align: "center",
    render: (value) => {
      if (value === "실패") {
        return <TriangleAlert className="text-red-500 mx-auto" />;
      }

      if (value === "미회수") {
        return <SquareX className="text-red-500 mx-auto" />;
      }

      if (value === "정상") {
        return <SquareCheckBig className="text-[#34C759] mx-auto" />;
      }
    },
  },
  {
    key: "action",
    title: "이력보기",
    dataIndex: "action",
    align: "center",
    fixed: "right",
    width: 90,
    render: (_, row) => <Button variant="outline">조회</Button>,
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const TableSection = () => {
  const { width } = useWindowSize();
  const { state } = useSidebar();

  const [checkedList, setCheckedList] = useState(defaultCheckedList || []);

  const dataSource = chargeTableMockData;
  const rowSpanArr = useMemo(
    () => calcRowSpan<ChargeTableRow>(dataSource, "manager"),
    [dataSource]
  );

  const newColumns = useMemo(
    () =>
      columns.map((item) => {
        if (item.key === "manager") {
          return {
            ...item,
            hidden: !checkedList.includes(item.key as string),
            onCell: (_: ChargeTableRow, index?: number) => ({
              rowSpan: typeof index === "number" ? rowSpanArr[index] : 1,
            }),
          };
        }
        return {
          ...item,
          hidden: !checkedList.includes(item.key as string),
        };
      }),
    [checkedList, rowSpanArr]
  );

  const tableWidthClass = useMemo(() => {
    // expanded 1440 -> 1160px
    if (state === "expanded" && width <= 1440) {
      return "max-w-[1200px]";
    }

    // collapsed 1440 -> 1330px
    if (state === "collapsed" && width <= 1440) {
      return "max-w-[1360px]";
    }

    return "w-full";
  }, [width, state]);

  return (
    <section>
      <div className="w-full flex flex-wrap gap-4  py-4 mb-2 border-b border-[#656565]">
        {columns
          .filter((col) => col.key !== "situation")
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

      <div className={cn(tableWidthClass, "overflow-x-auto ")}>
        <Table<ChargeTableRow>
          columns={newColumns}
          dataSource={dataSource}
          total={dataSource.length}
          scroll={{ x: 2000 }}
        />
      </div>
    </section>
  );
};

export default TableSection;
