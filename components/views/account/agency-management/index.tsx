"use client";

import { useState } from "react";
import SearchSection from "./SearchSection";
import TableSection from "./TableSection";

import { useQueryAgencyApi } from "@/hooks/queries/agency";

import { defaultTableParams } from "./constants";

import type { TableParams } from "@/types/table";
import type { TAgencyOrder } from "@/types/api/agency";

export interface TableParamsAgency extends TableParams {
  keyword: string;
  sortField?: TAgencyOrder;
}

const AgencyManagementView = () => {
  const [search, setSearch] = useState<string>("");

  const [tableParams, setTableParams] =
    useState<TableParamsAgency>(defaultTableParams);

  const {
    data: dataSource,
    isPending: isLoadingAgencys,
    refetch,
  } = useQueryAgencyApi({
    page: tableParams.pagination?.current || 1,
    size: tableParams.pagination?.pageSize || 10,
    keyword: search,
    orderType: tableParams.sortField as TAgencyOrder,
  });

  // TODO : 페이지네이션 관련 테스트 확인 필요
  const onSearch = (keyword: string) => {
    setSearch(keyword);
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
        pageSize: 10,
        total: dataSource?.totalCount || 0,
      },
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <SearchSection onSearch={onSearch} />
      <TableSection
        dataSource={dataSource?.content || []}
        isLoading={isLoadingAgencys}
        tableParams={tableParams}
        setTableParams={setTableParams}
        total={dataSource?.totalCount || 0}
        refetch={refetch}
      />
    </div>
  );
};

export default AgencyManagementView;
