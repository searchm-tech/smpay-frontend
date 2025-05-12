"use client";

import { useState } from "react";
import SearchSection from "./SearchSection";
import TableSection from "./TableSection";

import { useAgencyList } from "@/hooks/queries/agency";

import { defaultTableParams } from "@/constants/table";

import type { TableParams } from "@/types/table";
import type { FilterValue } from "antd/es/table/interface";

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

  const onSearch = (keyword: string) => {
    setSearch(keyword);
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
