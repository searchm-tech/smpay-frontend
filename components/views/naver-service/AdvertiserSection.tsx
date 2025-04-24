import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

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

const AdvertiserSection = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

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

      <div className="mx-auto px-4 py-8 mb-8">
        <h1 className="text-lg font-semibold mb-8 text-center">
          서비스 신청 방법
        </h1>

        <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-16">
          <div className="flex flex-col items-center h-[250px] w-[280px] lg:w-[320px]">
            <div className="relative mb-6">
              <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gray-100 flex items-center justify-center">
                <Image
                  src="/images/customer-id.svg"
                  alt="고객 ID 등록"
                  width={40}
                  height={40}
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                광고주 CUSTOMER ID 등록
              </h3>
              <p className="text-xs md:text-sm text-gray-600 max-w-[280px] md:max-w-[320px] lg:max-w-[360px]">
                CUSTOMER ID는 수치로 이루어진 고유 ID로
                <br />
                <span className="text-blue-600">
                  네이버 검색광고 홈페이지 {">"} 내 정보 {">"} 기본정보 {">"}{" "}
                  정보조회
                </span>
                에서 확인하실 수 있습니다.
              </p>
            </div>
          </div>

          <ArrowRight className="w-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-gray-400 flex-shrink-0" />

          <div className="flex flex-col items-center h-[250px]">
            <div className="mb-6">
              <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gray-100 flex items-center justify-center">
                <Image
                  src="/images/registration.svg"
                  alt="광고주 등록"
                  width={40}
                  height={40}
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                광고주 광고계정 등기화
              </h3>
              <p className="text-xs md:text-sm text-gray-600 max-w-[280px] md:max-w-[320px] lg:max-w-[360px]">
                광고주 등록 후 30분 이내에 광고주 등기화가 완료됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvertiserSection;
