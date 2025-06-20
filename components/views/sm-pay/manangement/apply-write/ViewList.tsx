"use client";

import { useState } from "react";

import { SearchBox } from "@/components/common/Box";
import { Button } from "@/components/ui/button";
import { Radio } from "@/components/composite/radio-component";
import Table from "@/components/composite/table";
import { SearchInput } from "@/components/composite/input-components";
import { LabelBullet } from "@/components/composite/label-bullet";

import EditModal from "./EditModal";
import CreateModal from "./RegisterModal";

import { ColumnTooltip } from "@/constants/table";
import { useSmPayAdvertiserApplyList } from "@/hooks/queries/sm-pay";

import { cn } from "@/lib/utils";

import type { TableProps } from "antd";
import type { TableParams } from "@/types/table";
import type {
  SmPayAdvertiserApplyStatus,
  SmPayAdvertiserApplyDto as TAdvertiser,
} from "@/types/smpay";

type ViewListProps = {
  onCancel: () => void;
  onSubmit: (id: number) => void;
};

const defaultTableParams = {
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  sortField: "ADVERTISER_REGISTER_DESC",
};

const ViewList = ({ onCancel, onSubmit }: ViewListProps) => {
  const [search, setSearch] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tableParams, setTableParams] =
    useState<TableParams>(defaultTableParams);

  const { data: advertiserApplyRes } = useSmPayAdvertiserApplyList({
    page: tableParams.pagination?.current || 1,
    size: tableParams.pagination?.pageSize || 10,
    keyword: searchKeyword,
    orderType: tableParams.sortField as SmPayAdvertiserApplyStatus,
  });

  const [selectedRowKey, setSelectedRowKey] = useState<string | number | null>(
    null
  );
  const [editData, setEditData] = useState<TAdvertiser | null>(null);
  const [registData, setRegistData] = useState<TAdvertiser | null>(null);

  const columns: TableProps<TAdvertiser>["columns"] = [
    {
      title: "CUSTOMER ID",
      dataIndex: "advertiserCustomerId",
      align: "center",
      sorter: true,
    },
    {
      title: "로그인 ID",
      dataIndex: "advertiserLoginId",
      align: "center",
      sorter: true,
    },
    {
      title: "광고주명",
      dataIndex: "advertiserNickName",
      align: "center",
      sorter: true,
    },
    {
      title: ColumnTooltip.info_change,
      dataIndex: "info_change",
      align: "center",
      sorter: true,
      render: (_, record) => {
        if (!record.advertiserName) {
          return (
            <Button onClick={() => setRegistData(record)}>정보 등록</Button>
          );
        }
        return (
          <Button variant="cancel" onClick={() => setEditData(record)}>
            정보 변경
          </Button>
        );
      },
    },
    {
      title: ColumnTooltip.status,
      dataIndex: "advertiserType",
      align: "center",
      render: (type: SmPayAdvertiserApplyStatus) => {
        return ADVERTISER_STATUS_MAP[type as SmPayAdvertiserApplyStatus];
      },
      sorter: true,
    },
    {
      title: "최종 수정 일시",
      dataIndex: "registerOrUpdateDt",
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
      {editData && (
        <EditModal
          onClose={() => setEditData(null)}
          advertiserId={editData.advertiserCustomerId}
        />
      )}
      {registData && (
        <CreateModal
          onClose={() => setRegistData(null)}
          onConfirm={() => {
            setRegistData(null);
            handleSearch();
          }}
          advertiserId={registData.advertiserCustomerId}
        />
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
        <Table<TAdvertiser>
          rowKey={(record) => record.advertiserCustomerId}
          columns={columns}
          dataSource={advertiserApplyRes?.content ?? []}
          total={advertiserApplyRes?.totalCount ?? 0}
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

const isRowDisabled = (record: TAdvertiser) => {
  return record.advertiserType !== "APPLICABLE";
};

export const ADVERTISER_STATUS_MAP = {
  UNSYNC_ADVERTISER: "광고주 비동기화",
  APPLICABLE: "신청 가능",
  WAIT_REVIEW: "심사 대기",
  REJECT: "심사 반려",
  OPERATION_REVIEW: "운영 검토 대기",
  OPERATION_REJECT: "운영 검토 거절",
  OPERATION_REVIEW_SUCCESS: "운영 검토 완료",
  ADVERTISER_AGREE_WAIT: "광고주 동의 대기",
  ADVERTISER_AGREE_TIME_EXPIRE: "광고주 동의 기한 만료",
  CANCEL: "신청 취소",
  REGISTER_WITHDRAW_ACCOUNT_FAIL: "출금 계좌 등록 실패",
  OPERATION: "운영중",
  PAUSE: "일시중지",
  TERMINATE_WAIT: "해지 대기",
  TERMINATE: "해지",
};
