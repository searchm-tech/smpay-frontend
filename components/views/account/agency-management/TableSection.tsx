"use client";

import { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SquarePen } from "lucide-react";

import Select from "@/components/composite/select-components";
import Table from "@/components/composite/table";

import { getAgencies, type AgencyData } from "@/services/agency";
import { ACTIVE_STATUS, defaultTableParams } from "@/constants/table";

import type { FilterParams, TableParams } from "@/services/types";
import type { TableProps } from "antd";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { useRouter } from "next/navigation";

const TableSection = () => {
  const router = useRouter();
  const [statusModal, setStatusModal] = useState<AgencyData | null>(null);
  const [tableParams, setTableParams] =
    useState<TableParams>(defaultTableParams);

  const { data, isLoading, error } = useQuery<{
    data: AgencyData[];
    total: number;
  }>({
    queryKey: ["agencies", tableParams],
    queryFn: () => getAgencies(tableParams),
    placeholderData: (previousData) => previousData,
  });

  const handleTableChange: TableProps<AgencyData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination: {
        current: pagination.current ?? 1,
        pageSize: pagination.pageSize ?? 10,
      },
      filters: filters as FilterParams,
      sort: !Array.isArray(sorter)
        ? {
            field: String(sorter.field),
            order: sorter.order as "ascend" | "descend" | undefined,
          }
        : undefined,
    });
  };
  const handleActiveChange = () => {
    if (!statusModal) return;
    setStatusModal(null);
  };

  const columns: TableProps<AgencyData>["columns"] = [
    {
      title: "No",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "대행사명",
      dataIndex: "agency",
      sorter: true,
      align: "center",
    },
    {
      title: "대표자명",
      dataIndex: "owner",
      sorter: true,
      align: "center",
    },
    {
      title: "사업자 등록 번호",
      dataIndex: "bussiness_num",
      sorter: true,
      align: "center",
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
              router.push(`/account/agency-management/${record.id}`);
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
      render: (value: boolean, record) => {
        const selectedValue = value ? "active" : "inactive";

        return (
          <Select
            options={ACTIVE_STATUS}
            value={selectedValue}
            onChange={() => setStatusModal(record)}
          />
        );
      },
    },
    {
      title: "가입일",
      dataIndex: "date",
      sorter: true,
      align: "center",
    },
  ];

  return (
    <Fragment>
      {statusModal && (
        <ConfirmDialog
          open
          onClose={() => setStatusModal(null)}
          onConfirm={handleActiveChange}
          content={
            statusModal.status ? (
              <div className="text-center">
                <p>대행사를 비활성하면 로그인 및 서비스 이용이 제한됩니다.</p>
                <p>진행하시겠습니까?</p>
              </div>
            ) : (
              <div className="text-center">
                <p>대행사를 활성화하면 다시 서비스 이용이 가능해집니다.</p>
                <p>진행하시겠습니까?</p>
              </div>
            )
          }
        />
      )}
      <Table<AgencyData>
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data?.data ?? []}
        pagination={{
          ...tableParams.pagination,
          total: data?.total,
        }}
        loading={isLoading}
        onChange={handleTableChange}
      />
    </Fragment>
  );
};

export default TableSection;
