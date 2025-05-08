"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import Table from "@/components/composite/table";
import Select from "@/components/composite/select-components";
import { ConfirmDialog } from "@/components/composite/modal-components";

import { ACTIVE_STATUS } from "@/constants/table";

import type { TableProps } from "antd";
import type { FilterValue } from "antd/es/table/interface";
import type { TableParams } from "@/types/table";
import type { MemberData } from "@/types/user";

/**
 *  관리자 일 경우 테이블
 */
type TableSectionProps = {
  role?: "admin" | "agency";
  dataSource: MemberData[];
  isLoading: boolean;
  setTableParams: (params: TableParams) => void;
};

const TableSection = ({
  role = "agency",
  dataSource,
  isLoading,
  setTableParams,
}: TableSectionProps) => {
  const [activeData, setActiveData] = useState<MemberData | null>(null);

  const companyNameColumn = {
    title: "대행사명",
    dataIndex: "companyName",
    sorter: true,
    align: "center",
  } as const;

  const columns: TableProps<MemberData>["columns"] = [
    {
      title: "No",
      dataIndex: "no",
      align: "center",
      sorter: true,
    },
    ...(role === "admin" ? [companyNameColumn] : []), // role === "admin" 일 경우 대행사명 컬럼 추가
    {
      title: "계정유형",
      dataIndex: "accountType",
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
          <Button variant="cancel" onClick={() => {}}>
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
            options={ACTIVE_STATUS}
            value={selectedValue}
            onChange={() => setActiveData(record)}
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
    const newParams: TableParams = {
      pagination: {
        current: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
        total: pagination.total || 0,
      },
      filters: filters as Record<string, FilterValue>,
      ...(!Array.isArray(sorter) && {
        sortField: sorter.field?.toString(),
        sortOrder: sorter.order,
      }),
    };
    setTableParams(newParams);
  };

  const handleActiveChange = () => {
    if (!activeData) return;
    setActiveData(null);
  };

  return (
    <section>
      <Table<MemberData>
        columns={columns}
        rowKey={(record) => record.no}
        dataSource={dataSource}
        total={dataSource.length}
        onChange={handleTableChange}
        loading={isLoading}
      />

      {activeData && (
        <ConfirmDialog
          open
          onClose={() => setActiveData(null)}
          onConfirm={handleActiveChange}
          content={
            <div className="text-center">
              <p>
                {activeData.status === "active"
                  ? "회원을 비활성화하면 로그인 및 서비스 이용이 제한됩니다."
                  : "회원을 활성화하면 다시 서비스 이용이 가능해집니다."}
              </p>
              <p>진행하시겠습니까?</p>
            </div>
          }
        />
      )}
    </section>
  );
};

export default TableSection;
