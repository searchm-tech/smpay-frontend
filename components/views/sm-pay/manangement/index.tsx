"use client";

import { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import SearchSection from "./SearchSection";
import TableSection from "./TableSection";

import { useSmpayDataStore } from "@/store/useSmpayDataStore";
import { useSmPayList } from "@/hooks/queries/sm-pay";
import { defaultTableParams } from "@/constants/table";

import type { TableParams } from "@/types/table";

const SMPayManagementView = () => {
  const { smpayList, setSmpayList } = useSmpayDataStore();

  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");

  const [tableParams, setTableParams] =
    useState<TableParams>(defaultTableParams);

  const { data: response, isFetching: loadingData } = useSmPayList({
    pagination: {
      current: tableParams.pagination?.current || 1,
      pageSize: tableParams.pagination?.pageSize || 10,
    },
    sort:
      tableParams.sortField && tableParams.sortOrder
        ? { field: tableParams.sortField, order: tableParams.sortOrder }
        : undefined,
    filters: {
      ...(tableParams.filters as Record<string, string[]>),
      ...(selectedStatus !== "ALL" ? { status: [selectedStatus] } : {}),
      ...(search ? { search: [search] } : {}),
    },
  });

  useEffect(() => {
    if (response?.data) {
      setSmpayList(response.data);
    }
  }, [response?.data]);

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
        pageSize: 10,
        total: response?.total || 0,
      },
    }));
  };

  // TODO : 페이지네이션 관련 테스트 확인 필요
  const onSearch = (keyword: string) => {
    setSearch(keyword);
    setSelectedStatus("ALL");
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
        pageSize: 10,
        total: response?.total || 0,
      },
    }));
  };

  return (
    <div>
      <SearchSection onSearch={onSearch} />
      <FilterSection
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
      />
      <TableSection
        tableParams={tableParams}
        setTableParams={setTableParams}
        total={response?.total || 0}
        loadingData={loadingData}
        smpayList={smpayList}
      />
    </div>
  );
};

export default SMPayManagementView;
