"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import Table from "@/components/composite/table";
import Select from "@/components/composite/select-components";

import { type MemberData, mockMemberData } from "./constant";
import type { TableProps } from "antd";
import type { TableRowSelection } from "antd/es/table/interface";
import type { TableParams } from "@/types";

const optsStatus = [
  { label: "정상", value: "active" },
  { label: "비활성", value: "inactive" },
];

/**
 *  관리자 일 경우 테이블
 */
const AdminTableSection = () => {
  const [data, setData] = useState<MemberData[]>(mockMemberData);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: TableProps<MemberData>["columns"] = [
    {
      title: "No",
      dataIndex: "no",
      align: "center",
      sorter: true,
    },
    {
      title: "계정유형",
      dataIndex: "accountType",
      sorter: true,
      align: "center",
    },
    {
      title: "대행사명",
      dataIndex: "companyName",
      sorter: true,
      align: "center",
    },
    {
      title: "대표자명",
      dataIndex: "name",
      sorter: true,
      align: "center",
    },
    {
      title: "이메일(ID)",
      dataIndex: "email",
      sorter: true,
      align: "center",
    },
    {
      title: "정보 수정",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        return (
          <Button
            variant="cancel"
            onClick={() => {
              console.log("record", record);
            }}
          >
            정보 수정
          </Button>
        );
      },
    },
    {
      title: "활성여부",
      dataIndex: "status",
      sorter: true,
      align: "center",
      render: (value, record) => {
        const selectedValue = value === "정상" ? "active" : "inactive";

        return (
          <Select
            options={optsStatus}
            value={selectedValue}
            onChange={(newValue) =>
              console.log(`id: ${record.no}, 변경된 값: ${newValue}`)
            }
          />
        );
      },
    },
    {
      title: "가입일",
      dataIndex: "createdAt",
      sorter: true,
      align: "center",
    },
  ];

  const handleTableChange: TableProps<MemberData>["onChange"] = (
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
    <Table<MemberData>
      columns={columns}
      rowKey={(record) => record.no}
      dataSource={data}
      pagination={tableParams.pagination}
      onChange={handleTableChange}
    />
  );
};

/**
 *  대행사 일 경우 테이블
 */
const AgencyTableSection = () => {
  const [data, setData] = useState<MemberData[]>(mockMemberData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const MemberShipColumns: TableProps<MemberData>["columns"] = [
    {
      title: "No",
      dataIndex: "no",
      align: "center",
      sorter: true,
    },
    {
      title: "계정유형",
      dataIndex: "accountType",
      sorter: true,
      align: "center",
    },
    {
      title: "대행사명",
      dataIndex: "companyName",
      sorter: true,
      align: "center",
    },
    {
      title: "대표자명",
      dataIndex: "name",
      sorter: true,
      align: "center",
    },
    {
      title: "이메일(ID)",
      dataIndex: "email",
      sorter: true,
      align: "center",
    },
    {
      title: "활성여부",
      dataIndex: "status",
      sorter: true,
      align: "center",
      render: (value, record) => {
        const selectedValue = value === "정상" ? "active" : "inactive";
        return (
          <Select
            options={optsStatus}
            value={selectedValue}
            onChange={(newValue) =>
              console.log(`id: ${record.no}, 변경된 값: ${newValue}`)
            }
          />
        );
      },
    },
    {
      title: "가입일",
      dataIndex: "createdAt",
      sorter: true,
      align: "center",
    },
  ];

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection: TableRowSelection<MemberData> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleTableChange: TableProps<MemberData>["onChange"] = (
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

  console.log("selectedRowKeys", selectedRowKeys);

  console.log("data", data);

  return (
    <Table<MemberData>
      columns={MemberShipColumns}
      dataSource={data}
      rowSelection={rowSelection}
      rowKey={(record) => record.no}
      onChange={handleTableChange}
    />
  );
};

export { AdminTableSection, AgencyTableSection };
