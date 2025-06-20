"use client";

import { useState } from "react";

import { SearchBox } from "@/components/common/Box";
import { Button } from "@/components/ui/button";
import { Radio } from "@/components/composite/radio-component";
import Table from "@/components/composite/table";
import { SearchInput } from "@/components/composite/input-components";
import { LabelBullet } from "@/components/composite/label-bullet";

import EditModal from "./EditModal";
import CreateModal from "./CreateModal";

import { ColumnTooltip, defaultTableParams } from "@/constants/table";
import { useSmPayAdvertiserStatusList } from "@/hooks/queries/sm-pay";

import { cn } from "@/lib/utils";

import type { TableProps } from "antd";
import type { TableParams } from "@/types/table";
import type {
  SmPayAdvertiserStatusDto,
  SmPayAdvertiserStautsOrderType,
} from "@/types/sm-pay";

type ViewListProps = {
  onCancel: () => void;
  onSubmit: (id: number) => void;
};

const ViewList = ({ onCancel, onSubmit }: ViewListProps) => {
  const [search, setSearch] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tableParams, setTableParams] =
    useState<TableParams>(defaultTableParams);

  const { data: advertiserStatusRes } = useSmPayAdvertiserStatusList({
    page: tableParams.pagination?.current || 1,
    size: tableParams.pagination?.pageSize || 10,
    keyword: searchKeyword,
    orderType: tableParams.sortField as SmPayAdvertiserStautsOrderType,
  });

  const [selectedRowKey, setSelectedRowKey] = useState<string | number | null>(
    null
  );
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const columns: TableProps<SmPayAdvertiserStatusDto>["columns"] = [
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
    },
    {
      title: "광고주명",
      dataIndex: "advertiserName",
      align: "center",
      sorter: true,
    },
    {
      title: ColumnTooltip.info_change,
      dataIndex: "info_change",
      align: "center",
      sorter: true,
      render: (_, record) => {
        if (record.advertiserCustomerId % 2 === 0) {
          return (
            <Button onClick={() => setOpenCreateModal(true)}>정보 등록</Button>
          );
        }
        return (
          <Button variant="cancel" onClick={() => setOpenEditModal(true)}>
            정보 변경
          </Button>
        );
      },
    },
    {
      title: ColumnTooltip.status,
      dataIndex: "status",
      align: "center",
      // render: (status: AdvertiserStatus) => ADVERTISER_STATUS_MAP[status],
      sorter: true,
    },
    {
      title: "최종 수정 일시",
      dataIndex: "updatedAt",
      align: "center",
      sorter: true,
    },
  ];

  const handleSearch = () => {
    setSearchKeyword(search);
    setSelectedRowKey(null);
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
        pageSize: 10,
        total: 0,
      },
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="mt-4">
      {openEditModal && <EditModal onClose={() => setOpenEditModal(false)} />}
      {openCreateModal && (
        <CreateModal onClose={() => setOpenCreateModal(false)} />
      )}
      <div>
        <LabelBullet labelClassName="text-base font-bold">
          광고주 검색
        </LabelBullet>
        <SearchBox className="gap-2">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="광고주명, CUSTOMER ID, 로그인 ID로 검색"
            className="w-[425px]"
          />
          <Button onClick={handleSearch}>검색</Button>
        </SearchBox>
      </div>

      <div className="mt-4">
        <LabelBullet labelClassName="text-base font-bold">
          광고주 등록
        </LabelBullet>
        <Table<SmPayAdvertiserStatusDto>
          columns={columns}
          dataSource={advertiserStatusRes?.content ?? []}
          total={advertiserStatusRes?.totalCount ?? 0}
          loading={false}
          rowSelection={{
            type: "radio",
            onChange: (selectedRowKeys) =>
              setSelectedRowKey(selectedRowKeys[0] as number),
            getCheckboxProps: (record) => ({
              disabled: isRowDisabled(record),
            }),
            columnWidth: 50,
            columnTitle: "No",
            renderCell: (_, record) => {
              return (
                <Radio
                  checked={selectedRowKey === record.advertiserCustomerId}
                  disabled={isRowDisabled(record)}
                  onClick={() => setSelectedRowKey(record.advertiserCustomerId)}
                />
              );
            },
          }}
          rowClassName={(record) =>
            cn(isRowDisabled(record) && "opacity-50 cursor-not-allowed")
          }
        />
      </div>

      <div className="flex justify-center gap-4 py-5">
        <Button
          className="w-[150px]"
          onClick={() => onSubmit?.(selectedRowKey as number)}
          disabled={!selectedRowKey}
        >
          신청
        </Button>
        <Button variant="cancel" className="w-[150px]" onClick={onCancel}>
          취소
        </Button>
      </div>
    </section>
  );
};

export default ViewList;

const disabledStatuses: SmPayAdvertiserStautsOrderType[] = [
  "ADVERTISER_REGISTER_DESC",
  "ADVERTISER_REGISTER_ASC",
  "ADVERTISER_STATUS_DESC",
  "ADVERTISER_STATUS_ASC",
  "ADVERTISER_NAME_DESC",
  "ADVERTISER_NAME_ASC",
  "ADVERTISER_ID_DESC",
  "ADVERTISER_ID_ASC",
  "ADVERTISER_CUSTOMER_ID_DESC",
];

const isRowDisabled = (record: SmPayAdvertiserStatusDto) =>
  !disabledStatuses.includes(record.advertiserType);

// AVAILABLE: "신청 가능",
// AGREEMENT_REQUEST: "광고주 동의 요청",
// AGREEMENT_REJECTED: "광고주 미동의",
// AGREEMENT_EXPIRED: "광고주 동의 기한 만료",
// AGREEMENT_COMPLETED: "광고주 동의 완료",
// REVIEW_REQUEST: "심사 요청",
// REVIEW_PENDING: "심사 대기",
// REVIEW_APPROVED: "심사 승인",
// REVIEW_REJECTED: "심사 반려",

// export const getAdvertiserStatusLabel = (status: AdvertiserStatus): string => {
//   return ADVERTISER_STATUS_MAP[status] || status;
// };
