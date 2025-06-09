"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SquarePen } from "lucide-react";

import Select from "@/components/composite/select-components";
import Table from "@/components/composite/table";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { StatusDialog } from "./dialog";

import { formatBusinessNumber, formatDate } from "@/utils/format";

import type { TableProps } from "antd";
import type { TableParams } from "@/types/table";
import type { FilterValue } from "antd/es/table/interface";
import type { TAgencyData, TAgencyStatus } from "@/types/agency";
import type {
  TAgencyOrder,
  RequestAgencyStatus as TAgencyStatusParams,
} from "@/types/api/agency";

import {
  AGENCY_STATUS_OPTS,
  dialogContent,
  type DialogTypes,
} from "./constants";

export interface TableParamsAgency extends TableParams {
  keyword: string;
  sortField?: TAgencyOrder;
}

type TableSectionProps = {
  dataSource: TAgencyData[];
  isLoading: boolean;
  tableParams: TableParamsAgency;
  setTableParams: (params: TableParamsAgency) => void;
  total: number;
  refetch: () => void;
};

const TableSection = ({
  dataSource,
  isLoading,
  tableParams,
  setTableParams,
  total,
  refetch,
}: TableSectionProps) => {
  const router = useRouter();
  const [statusDialog, setStatusDialog] = useState<TAgencyStatusParams | null>(
    null
  );
  const [dialog, setDialog] = useState<DialogTypes | null>(null);

  const handleTableChange: TableProps<TAgencyData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    // sorter에서 field와 order 추출하여 올바른 정렬 값 생성
    let sortField: TAgencyOrder = "REGISTER_DT_DESC"; // 기본값

    if (sorter && !Array.isArray(sorter) && sorter.field && sorter.order) {
      const field = sorter.field as string;
      const order = sorter.order === "ascend" ? "ASC" : "DESC";

      // field 이름을 API에서 요구하는 형식으로 변환
      const fieldMap: Record<string, string> = {
        rowNumber: "NO",
        agentName: "AGENT",
        status: "STATUS",
        registerDt: "REGISTER_DT",
      };

      const mappedField = fieldMap[field];

      if (mappedField) {
        sortField = `${mappedField}_${order}` as TAgencyOrder;
      }
    }

    setTableParams({
      pagination: {
        current: pagination.current ?? 1,
        pageSize: pagination.pageSize ?? 10,
      },
      filters: filters as Record<string, FilterValue>,
      sortField: sortField,
      sortOrder: undefined, // TAgencyOrder를 사용하므로 불필요
      keyword: tableParams.keyword, // 기존 keyword 유지
    });
  };

  const columns: TableProps<TAgencyData>["columns"] = [
    {
      title: "No",
      dataIndex: "agentId",
      align: "center",
    },
    {
      title: "대행사명",
      dataIndex: "agentName",
      sorter: true,
      align: "center",
    },
    {
      title: "대표자명",
      dataIndex: "agentRepresentativeName",
      sorter: true,
      align: "center",
    },
    {
      title: "사업자 등록 번호",
      dataIndex: "businessRegistrationNumber",
      sorter: true,
      align: "center",
      render: (value: string) => {
        return <span>{formatBusinessNumber(value)}</span>;
      },
    },
    {
      title: "관리",
      dataIndex: "action",
      align: "center",
      width: 100,
      render: (_, record) => (
        <div className="flex justify-center items-center w-full">
          <SquarePen
            className="w-4 h-4 text-blue-500 cursor-pointer text-center"
            onClick={() => {
              router.push(`/account/agency-management/${record.agentId}`);
            }}
          />
        </div>
      ),
    },
    {
      title: "상태",
      dataIndex: "status",
      sorter: true,
      align: "center",
      width: 150,
      render: (value, record) => {
        return (
          <Select
            options={AGENCY_STATUS_OPTS}
            value={value}
            onChange={(value) =>
              setStatusDialog({
                agentId: record.agentId,
                status: value as TAgencyStatus,
              })
            }
          />
        );
      },
    },
    {
      title: "가입일",
      dataIndex: "registerDt",
      sorter: true,
      align: "center",
      render: (value: string) => {
        return <span>{formatDate(value)}</span>;
      },
    },
  ];

  const handleSuccessModal = () => {
    setDialog(null);
    refetch();
  };

  return (
    <section>
      <Table<TAgencyData>
        columns={columns}
        rowKey={(record) => record.agentId.toString()}
        dataSource={dataSource ?? []}
        pagination={{
          ...tableParams.pagination,
          total,
        }}
        loading={isLoading}
        onChange={handleTableChange}
      />

      {statusDialog && (
        <StatusDialog
          params={statusDialog}
          onClose={() => setStatusDialog(null)}
          onConfirm={() => setDialog("update-status")}
        />
      )}

      {dialog && (
        <ConfirmDialog
          open
          cancelDisabled
          onConfirm={handleSuccessModal}
          content={<div className="text-center">{dialogContent[dialog]}</div>}
        />
      )}
    </section>
  );
};

export default TableSection;
