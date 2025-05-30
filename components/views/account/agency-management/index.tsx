"use client";

import { useState } from "react";
import SearchSection from "./SearchSection";
import TableSection from "./TableSection";

import { useAgencyList, useQueryAgencyApi } from "@/hooks/queries/agency";

import { defaultTableParams } from "@/constants/table";

import type { TableParams } from "@/types/table";
import type { FilterValue } from "antd/es/table/interface";
import type { TAgencyOrder } from "@/types/api/agency";
import { defaultTableParams2 } from "./constants";

export interface TableParamsAgency extends TableParams {
  keyword: string;
  sortField?: TAgencyOrder;
}

const AgencyManagementView = () => {
  const [search, setSearch] = useState<string>("");
  const [tableParams, setTableParams] =
    useState<TableParams>(defaultTableParams);

  const { data, isPending: isLoading } = useAgencyList({
    pagination: {
      current: tableParams.pagination?.current || 1,
      pageSize: tableParams.pagination?.pageSize || 10,
    },
    sortField: tableParams.sortField,
    sortOrder: tableParams.sortOrder,
    filters: {
      ...(tableParams.filters as Record<string, FilterValue>),
      ...(search ? { search: [search] } : {}),
    },
  });

  const [tableParams2, setTableParams2] =
    useState<TableParamsAgency>(defaultTableParams2);

  const { data: agencyApiData, isPending: isLoadingAgencyApi } =
    useQueryAgencyApi({
      page: tableParams2.pagination?.current || 1,
      size: tableParams2.pagination?.pageSize || 10,
      keyword: search,
      orderType: tableParams2.sortField as TAgencyOrder,
    });

  console.log("agencyApiData 확인", agencyApiData);

  const onSearch = (keyword: string) => {
    setSearch(keyword);
    setTableParams2((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
      },
    }));
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
      },
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <SearchSection onSearch={onSearch} />
      <TableSection
        dataSource={data?.data || []}
        isLoading={isLoading}
        tableParams={tableParams}
        setTableParams={setTableParams}
        total={data?.total || 0}
      />
    </div>
  );
};

export default AgencyManagementView;
