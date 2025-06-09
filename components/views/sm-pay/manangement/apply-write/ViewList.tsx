"use client";

import { useEffect, useState } from "react";

import { SearchBox } from "@/components/common/Box";
import { Button } from "@/components/ui/button";
import { Radio } from "@/components/composite/radio-component";
import Table from "@/components/composite/table";
import { SearchInput } from "@/components/composite/input-components";
import { LabelBullet } from "@/components/composite/label-bullet";

import { useAdvertiserList } from "@/hooks/queries/advertiser";
import { useAdvertiserStore } from "@/store/useAdvertiserStore";

import { defaultTableParams } from "@/constants/table";
import { ADVERTISER_STATUS_MAP } from "@/constants/status";

import { cn } from "@/lib/utils";

import type { TableProps } from "antd";
import type { TableParams } from "@/types/table";
import type { AdvertiserData, AdvertiserStatus } from "@/types/adveriser";

type ViewListProps = {
  onCancel: () => void;
  onSubmit: (id: number) => void;
};

const ViewList = ({ onCancel, onSubmit }: ViewListProps) => {
  const { advertiserList, setAdvertiserList } = useAdvertiserStore();

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [tableParams, setTableParams] =
    useState<TableParams>(defaultTableParams);

  const [selectedRowKey, setSelectedRowKey] = useState<string | number | null>(
    null
  );

  // const { data: response, isLoading } = useAdvertiserList({
  //   ...tableParams,
  //   filters: {
  //     ...tableParams.filters,
  //     ...(searchKeyword ? { search: [searchKeyword] } : {}),
  //   },
  // });

  const columns: TableProps<AdvertiserData>["columns"] = [
    {
      title: "CUSTOMER ID",
      dataIndex: "customerId",
      align: "center",
      sorter: (a, b) => a.customerId.localeCompare(b.customerId),
    },
    {
      title: "로그인 ID",
      dataIndex: "loginId",
      align: "center",
      sorter: (a, b) => a.loginId.localeCompare(b.loginId),
    },

    {
      title: "광고주명",
      dataIndex: "advertiserName",
      align: "center",
      sorter: (a, b) => a.advertiserName.localeCompare(b.advertiserName),
    },
    {
      title: "상태",
      dataIndex: "status",
      align: "center",
      render: (status: AdvertiserStatus) => ADVERTISER_STATUS_MAP[status],
      sorter: (a, b) =>
        ADVERTISER_STATUS_MAP[a.status].localeCompare(
          ADVERTISER_STATUS_MAP[b.status]
        ),
    },
    {
      title: "최종 수정 일시",
      dataIndex: "updatedAt",
      align: "center",
      sorter: (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
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

  // useEffect(() => {
  //   if (response?.data) {
  //     setAdvertiserList(response.data);
  //   }
  // }, [response?.data]);

  return (
    <section className="mt-4">
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
          광고주 등록 내역
        </LabelBullet>
        <Table<AdvertiserData>
          columns={columns}
          dataSource={advertiserList}
          total={advertiserList.length}
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
                  checked={selectedRowKey === record.id}
                  disabled={isRowDisabled(record)}
                  onClick={() => setSelectedRowKey(record.id)}
                />
              );
            },
          }}
          rowClassName={(record) =>
            cn(isRowDisabled(record) && "opacity-50 cursor-not-allowed")
          }
        />
      </div>

      <div className="flex justify-center gap-4 pb-5">
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

const disabledStatuses: AdvertiserStatus[] = [
  "AVAILABLE",
  "AGREEMENT_REJECTED",
  "REVIEW_REJECTED",
];

const isRowDisabled = (record: AdvertiserData) =>
  !disabledStatuses.includes(record.status);
