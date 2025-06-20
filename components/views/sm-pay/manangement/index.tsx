"use client";

import { useState } from "react";
import FilterSection from "./FilterSection";
import SearchSection from "./SearchSection";
import TableSection from "./TableSection";
import GuidSection from "../components/GuideSection";

import { useSmPayAdvertiserStatusList } from "@/hooks/queries/sm-pay";

import type { TableParams } from "@/types/table";
import { SmPayAdvertiserStautsOrderType } from "@/types/smpay";

const defaultTableParams = {
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  filters: {},
  sortField: "ADVERTISER_CUSTOMER_ID_DESC",
};

const SMPayManagementView = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");

  const [tableParams, setTableParams] =
    useState<TableParams>(defaultTableParams);

  const { data: advertiserStatusRes, isFetching: loadingData } =
    useSmPayAdvertiserStatusList({
      page: tableParams.pagination?.current || 1,
      size: tableParams.pagination?.pageSize || 10,
      keyword: search,
      orderType: tableParams.sortField as SmPayAdvertiserStautsOrderType,
    });

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
        pageSize: 10,
        total: advertiserStatusRes?.totalCount || 0,
      },
    }));
  };

  // TODO : 페이지네이션 관련 테스트 확인 필요
  const handleSearch = (keyword: string) => {
    setSearch(keyword);
    setSelectedStatus("ALL");
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
        pageSize: 10,
        total: advertiserStatusRes?.totalCount || 0,
      },
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <GuidSection viewType="smpay-guide" />
      <SearchSection onSearch={handleSearch} />
      <FilterSection
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
      />
      <TableSection
        tableParams={tableParams}
        setTableParams={setTableParams}
        total={advertiserStatusRes?.totalCount || 0}
        loadingData={loadingData}
        dataSource={advertiserStatusRes?.content || []}
      />
    </div>
  );
};

export default SMPayManagementView;
