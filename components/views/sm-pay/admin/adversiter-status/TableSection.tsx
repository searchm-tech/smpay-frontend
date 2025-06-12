import { useState } from "react";

import { SelectSearch } from "@/components/composite/select-search";
import { Button } from "@/components/ui/button";
import Table from "@/components/composite/table";
import { TableProps } from "antd";
import { formatDate } from "@/utils/format";
import { SmPayData, SmPayStatus } from "@/types/sm-pay";
import { LinkTextButton } from "@/components/composite/button-components";
import { useRouter } from "next/navigation";
import { SMPayManageStatus } from "@/constants/dialog";
import { STATUS_ACTIONS, STATUS_LABELS } from "@/constants/status";

import type { TableParams } from "@/types/table";
import type { FilterValue } from "antd/es/table/interface";
import { useSmPayStatus } from "@/hooks/queries/sm-pay";
import FilterItem from "@/components/common/FilterItem";

const optionAgency = [
  { label: "주식회사 써치엠 | 홍길동", value: "1" },
  { label: "주식회사 써치엠 | 김철수", value: "2" },
  { label: "주식회사 써치엠 | 이영희", value: "3" },
  { label: "주식회사 써치엠 | 이영희", value: "4" },
  { label: "주식회사 써치엠 | 이영희", value: "5" },
  { label: "주식회사 써치엠 | 이영희", value: "6" },
  { label: "주식회사 써치엠 | 이영희", value: "7" },
  { label: "주식회사 써치엠 | 이영희", value: "8" },
  { label: "주식회사 써치엠 | 이영희", value: "9" },
  { label: "주식회사 써치엠 | 이영희", value: "10" },
  { label: "주식회사 써치엠 | 이영희", value: "11" },
  { label: "주식회사 써치엠 | 이영희", value: "12" },
  { label: "주식회사 써치엠 | 이영희", value: "13" },
  { label: "주식회사 써치엠 | 이영희", value: "14" },
  { label: "주식회사 써치엠 | 이영희", value: "15" },
  { label: "주식회사 써치엠 | 이영희", value: "16" },
  { label: "주식회사 써치엠 | 이영희", value: "17" },
  { label: "주식회사 써치엠 | 이영희", value: "18" },
  { label: "주식회사 써치엠 | 이영희", value: "19" },
  { label: "주식회사 써치엠 | 이영희", value: "20" },
];

const advertiser = [
  { label: "1234567890 | 카타민 (광고주명)", value: "1234567890" },
  { label: "1234567891 | 카타민 (광고주명)", value: "1234567891" },
  { label: "1234567892 | 카타민 (광고주명)", value: "1234567892" },
];

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

  const [openDialog, setOpenDialog] = useState<SMPayManageStatus | null>(null);
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
      title: "광고주명",
      dataIndex: "advertiserName",
      align: "center",
      sorter: true,
    },
    {
      title: "상태",
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
        const availableActions = STATUS_ACTIONS[record.status];

        console.log(availableActions);
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

            {availableActions.includes("resume") && (
              <Button
                variant="blueOutline"
                onClick={() => setOpenDialog("resumption")}
              >
                재개
              </Button>
            )}

            {availableActions.includes("request") && (
              <Button
                variant="blueOutline"
                onClick={() => {
                  setApplySubmitId(record.no);
                  setOpenDialog("request");
                }}
              >
                심사 요청
              </Button>
            )}

            {availableActions.includes("terminate") && (
              <Button
                variant="redOutline"
                onClick={() => setOpenDialog("terminate")}
              >
                해지
              </Button>
            )}

            {availableActions.includes("stop") && (
              <Button
                variant="redOutline"
                onClick={() => setOpenDialog("stop")}
              >
                일시 중지
              </Button>
            )}

            {availableActions.includes("cancel") && (
              <Button
                variant="redOutline"
                onClick={() => setOpenDialog("cancel")}
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
