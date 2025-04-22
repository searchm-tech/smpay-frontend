"use client";

import { useEffect, useState } from "react";
import type { SortOrder, FilterValue } from "antd/es/table/interface";

import { Button } from "@/components/ui/button";
import Select from "@/components/composite/select-components";
import Table from "@/components/composite/table";

import { type TableProps } from "antd";

interface AgencyData {
  id: string;
  agency: string;
  owner: string;
  bussiness_num: number;
  status: boolean;
  date: string;
}

interface TableParams {
  pagination?: {
    current: number;
    pageSize: number;
  };
  sortField?: string;
  sortOrder?: SortOrder;
  filters?: Record<string, FilterValue | null>;
}

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

function toSearchParams(params: Record<string, unknown>) {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  }
  return searchParams;
}

function getApiParams(params: TableParams) {
  const { pagination, sortField, sortOrder } = params;
  return {
    page: pagination?.current,
    limit: pagination?.pageSize,
    sortBy: sortField,
    order:
      sortOrder === "ascend"
        ? "asc"
        : sortOrder === "descend"
        ? "desc"
        : undefined,
  };
}

const TableSection = () => {
  const [data, setData] = useState<AgencyData[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  console.log("data", data);

  const fetchData = async () => {
    setLoading(true);

    try {
      const apiParams = getApiParams(tableParams);
      const searchParams = toSearchParams(apiParams);

      const res = await fetch(
        `https://67ecd18d4387d9117bbb1051.mockapi.io/api/v1/agency?${searchParams.toString()}`
      );

      if (res.status === 200) {
        const result = (await res.json()) as AgencyData[];
        setData(result);
        // MockAPI에서는 total count를 헤더에서 제공하지 않음 → 대략 50으로 고정
        setTableParams((prev) => ({
          ...prev,
          pagination: {
            current: prev.pagination?.current ?? 1,
            pageSize: prev.pagination?.pageSize ?? 10,
            total: 50,
          },
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams.sortField,
    tableParams.sortOrder,
  ]);

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

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Table<AgencyData>
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default TableSection;
