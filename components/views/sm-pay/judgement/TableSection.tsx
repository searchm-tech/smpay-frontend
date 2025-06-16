"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { LinkTextButton } from "@/components/composite/button-components";
import Table from "@/components/composite/table";

import { formatDate } from "@/utils/format";

import type { ColumnsType } from "antd/es/table";
import type { SmPayJudgementData } from "@/types/sm-pay";
import type { TableProps } from "antd";

import { StopInfoModal } from "../manangement/dialog";

type PropsTableSection = {
  dataSource: SmPayJudgementData[];
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  onTableChange: TableProps<SmPayJudgementData & { id: number }>["onChange"];
};

const TableSection = ({
  dataSource,
  loading,
  pagination,
  onTableChange,
}: PropsTableSection) => {
  const router = useRouter();

  const [stopModalId, setStopModalId] = useState<string>("");

  const columns: ColumnsType<SmPayJudgementData & { id: number }> = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 70,
      sorter: true,
    },
    {
      title: "대행사명",
      dataIndex: "agencyName",
      key: "agencyName",
      sorter: true,
      align: "center",
    },
    {
      title: "담당자명",
      dataIndex: "departmentName",
      key: "departmentName",
      sorter: true,
      align: "center",
    },
    {
      title: "CUSTOMER ID",
      dataIndex: "customerId",
      key: "customerId",
      sorter: true,
      align: "center",
    },
    {
      title: "광고주 로그인 ID",
      dataIndex: "advertiserId",
      key: "advertiserId",
      align: "center",
      sorter: true,
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <LinkTextButton
            onClick={() => router.push(`/sm-pay/judgement/${record.id}`)}
          >
            {text}
          </LinkTextButton>
          {record.advertiserStatus === "new" && <Badge label="new" />}
        </div>
      ),
    },
    {
      title: "사업자명",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      sorter: true,
    },
    {
      title: "광고주 닉네임",
      dataIndex: "nickname",
      key: "nickname",
      align: "center",
      sorter: true,
    },
    {
      title: "상태",
      dataIndex: "status",
      key: "status",
      align: "center",
      sorter: true,
      render: (status: string, record: SmPayJudgementData) => {
        return <span>{status}</span>;
      },
    },
    {
      title: "최종 수정 일시",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      sorter: true,
      render: (date) => {
        return <span>{formatDate(date)}</span>;
      },
    },
  ];

  return (
    <section>
      {stopModalId && (
        <StopInfoModal
          open
          id={stopModalId}
          onClose={() => setStopModalId("")}
          onConfirm={() => router.push(`/sm-pay/judgement/${stopModalId}`)}
        />
      )}
      <Table<SmPayJudgementData & { id: number }>
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={pagination}
        onChange={onTableChange}
      />
    </section>
  );
};

export default TableSection;
