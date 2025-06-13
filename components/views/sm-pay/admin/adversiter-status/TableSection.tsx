import { useState } from "react";
import { useRouter } from "next/navigation";

import { SelectSearch } from "@/components/composite/select-search";
import { Button } from "@/components/ui/button";
import Table from "@/components/composite/table";

import { LinkTextButton } from "@/components/composite/button-components";
import FilterItem from "@/components/common/FilterItem";

import { useSmPayStatus } from "@/hooks/queries/sm-pay";

import { formatDate } from "@/utils/format";

import { STATUS_ACTION_BUTTONS, STATUS_LABELS } from "@/constants/status";
import { ColumnTooltip } from "@/constants/table";
import { advertiser, optionAgency } from "./constants";

import type { TableParams } from "@/types/table";
import type { ActionButton, SmPayData, SmPayStatus } from "@/types/sm-pay";
import type { TableProps } from "antd";
import type { FilterValue } from "antd/es/table/interface";

interface TableSectionProps {
  tableParams: TableParams;
  setTableParams: (params: TableParams) => void;
  total: number;
  loadingData: boolean;
  smpayList: SmPayData[];
  handleStatusChange: (status: string) => void;
  selectedStatus: string;
}

const TableSection = ({
  tableParams,
  setTableParams,
  total,
  loadingData,
  smpayList,
  handleStatusChange,
  selectedStatus,
}: TableSectionProps) => {
  const router = useRouter();
  const { data: statusData } = useSmPayStatus();

  const [selectedAgencyValue, setSelectedAgencyValue] = useState<string>();
  const [selectedAdvertiserValue, setSelectedAdvertiserValue] =
    useState<string>();

  const [openDialog, setOpenDialog] = useState<ActionButton | null>(null);
  const [applySubmitId, setApplySubmitId] = useState<number | null>(null);
  const [rejectModalId, setRejectModalId] = useState<number | null>(null);
  const [stopModalId, setStopModalId] = useState<number | null>(null);

  const handleTableChange: TableProps<SmPayData>["onChange"] = (
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

  const handleMoveDetailPage = (id: number) => {
    router.push(`/sm-pay/admin/adversiter-status/${id}`);
  };

  const columns: TableProps<SmPayData>["columns"] = [
    {
      title: "No",
      dataIndex: "no",
      align: "center",
      sorter: true,
    },
    {
      title: "담당자",
      dataIndex: "manager",
      align: "center",
      sorter: true,
    },
    {
      title: "CUSTOMER ID",
      dataIndex: "customerId",
      align: "center",
      sorter: true,
    },
    {
      title: "로그인 ID",
      dataIndex: "loginId",
      align: "center",
      sorter: true,
      render: (text: string, record: SmPayData) => (
        <LinkTextButton
          onClick={() => {
            router.push(`/sm-pay/admin/adversiter-status/${record.no}`);
          }}
        >
          {text}
        </LinkTextButton>
      ),
    },
    {
      title: ColumnTooltip.advertiserName,
      dataIndex: "advertiserName",
      align: "center",
      sorter: true,
    },
    {
      title: ColumnTooltip.status,
      width: 120,
      dataIndex: "status",
      align: "center",
      sorter: true,
      render: (value: SmPayStatus, record: SmPayData) => {
        if (value === "REVIEW_REJECTED") {
          return (
            <LinkTextButton onClick={() => setRejectModalId(record.no)}>
              {STATUS_LABELS[value]}
            </LinkTextButton>
          );
        }

        if (value === "OPERATION_REVIEW_REJECTED") {
          return (
            <LinkTextButton onClick={() => setRejectModalId(record.no)}>
              {STATUS_LABELS[value]}
            </LinkTextButton>
          );
        }

        if (value === "SUSPENDED") {
          return (
            <LinkTextButton onClick={() => setStopModalId(record.no)}>
              {STATUS_LABELS[value]}
            </LinkTextButton>
          );
        }

        return <span>{STATUS_LABELS[value]}</span>;
      },
    },

    {
      title: "기능",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        const availableActions = STATUS_ACTION_BUTTONS[record.status];

        return (
          <div className="flex items-center gap-2">
            {availableActions.includes("view") && (
              <Button
                variant="greenOutline"
                onClick={() => handleMoveDetailPage(record.no)}
              >
                조회
              </Button>
            )}

            {availableActions.includes("resend") && (
              <Button
                variant="blueOutline"
                onClick={() => setOpenDialog("resend")}
              >
                재발송
              </Button>
            )}

            {availableActions.includes("suspend") && (
              <Button
                variant="redOutline"
                onClick={() => setOpenDialog("suspend")}
              >
                일시 중지
              </Button>
            )}

            {availableActions.includes("termination_request") && (
              <Button
                variant="redOutline"
                onClick={() => setOpenDialog("termination_request")}
              >
                해지 신청
              </Button>
            )}

            {availableActions.includes("resume") && (
              <Button
                variant="blueOutline"
                onClick={() => setOpenDialog("resume")}
              >
                재개
              </Button>
            )}

            {availableActions.includes("advertiser_agreement_send") && (
              <Button
                variant="blueOutline"
                onClick={() => {
                  setApplySubmitId(record.no);
                  setOpenDialog("advertiser_agreement_send");
                }}
              >
                광고주 등의 전송
              </Button>
            )}

            {availableActions.includes("reapply") && (
              <Button
                variant="blueOutline"
                onClick={() => console.log(record.no)}
              >
                재신청
              </Button>
            )}

            {availableActions.includes("application_cancel") && (
              <Button
                variant="redOutline"
                onClick={() => setOpenDialog("application_cancel")}
              >
                신청 취소
              </Button>
            )}
          </div>
        );
      },
    },
    {
      title: "최종 수정일시",
      dataIndex: "lastModifiedAt",
      width: 200,
      align: "center",
      sorter: true,
      render: (date: string) => formatDate(date),
    },
  ];

  return (
    <section className="pt-4">
      <div className="flex gap-2 border-1 border-b border-dashed border-gray-300 pb-4">
        <SelectSearch
          options={optionAgency}
          value={selectedAgencyValue}
          onValueChange={setSelectedAgencyValue}
          placeholder="대행사를 선택하세요."
        />

        <SelectSearch
          options={advertiser}
          value={selectedAdvertiserValue}
          onValueChange={setSelectedAdvertiserValue}
          placeholder="광고주를 선택하세요."
        />

        <Button variant="outline">초기화</Button>
      </div>

      <div className="p-4 flex flex-wrap items-center gap-x-6 gap-y-4">
        {statusData?.data.map((filter) => (
          <FilterItem
            key={filter.name}
            value={filter.status}
            label={filter.name}
            count={filter.count}
            fixedColor={filter.status === "ALL" ? "#363C45" : undefined}
            selectedFilter={selectedStatus}
            handleFilterChange={handleStatusChange}
          />
        ))}
      </div>

      <Table<SmPayData>
        columns={columns}
        rowKey="id"
        dataSource={smpayList}
        pagination={{
          ...tableParams.pagination,
          total,
          position: ["bottomCenter"],
          showSizeChanger: true,
        }}
        loading={loadingData}
        onChange={handleTableChange}
      />
    </section>
  );
};

export default TableSection;
