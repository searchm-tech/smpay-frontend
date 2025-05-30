"use client";

import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

import { SquarePen } from "lucide-react";

import Select from "@/components/composite/select-components";
import Table from "@/components/composite/table";
import { ConfirmDialog } from "@/components/composite/modal-components";

import { ACTIVE_STATUS } from "@/constants/table";

import type { TableProps } from "antd";
import type { TableParams } from "@/types/table";
import type { FilterValue } from "antd/es/table/interface";
import type { TAgency2 } from "@/types/agency";
import type { TAgencyOrder } from "@/types/api/agency";

export interface TableParamsAgency extends TableParams {
  keyword: string;
  sortField?: TAgencyOrder;
}

const TableSection = ({
  dataSource,
  isLoading,
  tableParams,
  setTableParams,
  total,
}: {
  dataSource: TAgency2[];
  isLoading: boolean;
  tableParams: TableParamsAgency;
  setTableParams: (params: TableParamsAgency) => void;
  total: number;
}) => {
  const router = useRouter();
  const [statusModal, setStatusModal] = useState<TAgency2 | null>(null);

  const handleTableChange: TableProps<TAgency2>["onChange"] = (
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

  const handleActiveChange = () => {
    if (!statusModal) return;
    setStatusModal(null);
  };

  const columns: TableProps<TAgency2>["columns"] = [
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
      dataIndex: "registerDt",
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
      <Table<TAgency2>
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
    </Fragment>
  );
};

export default TableSection;
