import { useState } from "react";

import { defaultTableParams } from "@/constants/table";
import { AdvertiserGuideSection } from "./GuideSection";

import { SearchBox } from "@/components/common/Box";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { SearchInput } from "@/components/composite/input-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import Table from "@/components/composite/table";

import { AdvertiserData, mockAdvertiserData } from "./constants";

import type { TableProps } from "antd";
import type { SortOrder, FilterValue } from "antd/es/table/interface";
import type { AlignType } from "rc-table/lib/interface";

interface TableParams {
  pagination?: {
    current: number;
    pageSize: number;
  };
  sortField?: string;
  sortOrder?: SortOrder;
  filters?: Record<string, FilterValue | null>;
}

const AdvertiserView = () => {
  const [tableParams, setTableParams] =
    useState<TableParams>(defaultTableParams);

  // 선택된 row keys 관리
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // rowSelection 객체 설정
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const columns = [
    {
      title: "CUSTOMER ID",
      dataIndex: "customerId",
      key: "customerId",
      align: "center" as AlignType,
    },
    {
      title: "광고주 로그인 ID",
      dataIndex: "advertiserId",
      key: "advertiserId",
      align: "center" as AlignType,
    },
    {
      title: "광고주 닉네임",
      dataIndex: "advertiserNickname",
      key: "advertiserNickname",
      align: "center" as AlignType,
    },
    {
      title: "사업자명",
      dataIndex: "userName",
      key: "userName",
      align: "center" as AlignType,
    },
    {
      title: "정보 변경",
      dataIndex: "infoStatus",
      key: "infoStatus",
      align: "center" as AlignType,
      render: (status: string) => {
        const result: Record<string, string> = {
          "정보 변경": "정보 변경",
          "정보 등록": "정보 등록",
        };
        return <Button variant="cancel">{result[status]}</Button>;
      },
    },
    {
      title: "광고주 등록 여부",
      dataIndex: "registrationStatus",
      key: "registrationStatus",
      align: "center" as AlignType,
    },
    {
      title: "네이버마스터 등기화 여부",
      dataIndex: "masterStatus",
      key: "masterStatus",
      align: "center" as AlignType,
    },
    {
      title: "최종 네이버마스터 등기화 시간",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center" as AlignType,
    },
  ];

  const handleTableChange: TableProps<
    AdvertiserData & { id: number }
  >["onChange"] = (pagination, filters, sorter) => {
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
    <section className="p-4">
      <div>
        <LabelBullet className="text-base mb-2">광고주 검색</LabelBullet>
        <SearchBox className="justify-between">
          <div className="flex items-center gap-2">
            <SearchInput className="w-[425px]" />
            <Button>검색</Button>
          </div>
        </SearchBox>
      </div>

      <div className="mt-4">
        <LabelBullet className="text-base mb-2">광고주 등록</LabelBullet>

        <Table<AdvertiserData & { id: number }>
          rowSelection={rowSelection}
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={mockAdvertiserData.map((item) => ({
            ...item,
            id: item.key,
          }))}
          pagination={tableParams.pagination}
          //   loading={loading}
          onChange={handleTableChange}
        />
      </div>

      <Separator className="my-4 mt-12 mx-auto" variant="dotted" />

      <AdvertiserGuideSection />
    </section>
  );
};

export default AdvertiserView;
