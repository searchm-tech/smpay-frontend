"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { TableProps } from "antd";

import { Button } from "@/components/ui/button";
import Select from "@/components/composite/select-components";
import Table from "@/components/composite/table";
import { getAgencies, type AgencyData } from "@/services/agency";
import { type TableParams } from "@/types/table";

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
    render: () => <Button variant="cancel">정보 수정</Button>,
  },
  {
    title: "활성여부",
    dataIndex: "status",
    sorter: true,
    align: "center",
    render: (value: boolean, record) => {
      const selectedValue = value ? "active" : "inactive";

      return (
        <Select
          options={[
            { label: "활성", value: "active" },
            { label: "비활성", value: "inactive" },
          ]}
          value={selectedValue}
          onChange={(newValue) => {
            console.log(`id: ${record.id}, 변경된 값: ${newValue}`);
          }}
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

const TableSection = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const { data, isLoading, error } = useQuery<{
    data: AgencyData[];
    total: number;
  }>({
    queryKey: ["agencies", tableParams],
    queryFn: () => getAgencies(tableParams),
    placeholderData: (previousData) => previousData,
  });

  console.log("Query State:", { isLoading, error, tableParams, data });

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
      filters,
      sortField: !Array.isArray(sorter) ? String(sorter.field) : undefined,
      sortOrder: !Array.isArray(sorter) ? sorter.order : undefined,
    });
  };

  return (
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
  );
};

export default TableSection;
