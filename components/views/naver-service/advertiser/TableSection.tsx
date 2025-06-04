import { useState } from "react";

import { LabelBullet } from "@/components/composite/label-bullet";
import Table from "@/components/composite/table";

import { formatDate } from "@/utils/format";
import { syncTypeMap } from "../constants";

import type { TableProps } from "antd";
import type { FilterValue } from "antd/es/table/interface";
import type { TAdvertiser, TSyncType } from "@/types/adveriser";
import type { AdvertiserOrderType } from "@/types/adveriser";
import type { TableParamsAdvertiser } from ".";

type TableSectionProps = {
  dataSource: TAdvertiser[];
  isLoading: boolean;
  tableParams: TableParamsAdvertiser;
  setTableParams: (params: TableParamsAdvertiser) => void;
  total: number;
};

const TableSection = ({
  dataSource,
  isLoading,
  tableParams,
  setTableParams,
  total,
}: TableSectionProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const columns: TableProps<TAdvertiser>["columns"] = [
    {
      title: "",
      dataIndex: "customerId",
      align: "center",
      sorter: true,
    },
    {
      title: "광고주 로그인 ID",
      dataIndex: "advertiserId",
      sorter: true,
      align: "center",
    },
    {
      title: "광고주 닉네임",
      dataIndex: "nickname",
      sorter: true,
      align: "center",
    },
    {
      title: "광고주명",
      dataIndex: "name", // TODO : SM Pay 신청에서 광고주명 등록해야함.
      sorter: true,
      align: "center",
    },
    {
      title: "광고주 등록 여부",
      dataIndex: "isAdvertiserRegister",
      sorter: true,
      align: "center",
      render: (value: boolean) => {
        return value ? "등록" : "미등록";
      },
    },
    {
      title: "광고 데이터 동기화 여부",
      dataIndex: "syncType",
      align: "center",
      render: (value: TSyncType) => {
        if (value === "FAIL") {
          return <p className="text-[#007AFF] cursor-pointer">실패</p>;
        }
        return <p>{syncTypeMap[value]}</p>;
      },
    },

    {
      title: "최종 광고 데이터 동기화 시간",
      dataIndex: "registerOrUpdateDt",
      sorter: true,
      align: "center",
      render: (value) => {
        return <span>{formatDate(value)}</span>;
      },
    },
  ];

  const handleTableChange: TableProps<TAdvertiser>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    let sortField: AdvertiserOrderType = "ADVERTISER_REGISTER_TIME_DESC"; // 기본값

    if (sorter && !Array.isArray(sorter) && sorter.field && sorter.order) {
      const field = sorter.field as string;
      const order = sorter.order === "ascend" ? "ASC" : "DESC";

      // field 이름을 API에서 요구하는 형식으로 변환
      const fieldMap: Record<string, string> = {
        advertiserId: "ADVERTISER_ID",
        syncType: "ADVERTISER_SYNC",
        registerOrUpdateDt: "ADVERTISER_REGISTER_TIME",
      };

      const mappedField = fieldMap[field];

      if (mappedField) {
        sortField = `${mappedField}_${order}` as AdvertiserOrderType;
      }
    }

    console.log("sortField", sortField);

    setTableParams({
      pagination: {
        current: pagination.current ?? 1,
        pageSize: pagination.pageSize ?? 10,
      },
      filters: filters as Record<string, FilterValue>,
      keyword: tableParams.keyword, // 기존 keyword 유지
      sortOrder: undefined, // TAgencyOrder를 사용하므로 불필요
      sortField: sortField,
    });
  };

  return (
    <section className="mt-4">
      <LabelBullet className="text-base mb-2">광고주 등록</LabelBullet>
      <Table<TAdvertiser>
        rowSelection={rowSelection}
        columns={columns}
        rowKey={(record) => record.advertiserId}
        dataSource={dataSource}
        pagination={{
          current: tableParams.pagination?.current || 1,
          pageSize: tableParams.pagination?.pageSize || 10,
          total: total,
        }}
        onChange={handleTableChange}
        loading={isLoading}
      />
    </section>
  );
};

export default TableSection;
