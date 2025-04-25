"use client";

import { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import SearchSection from "./SearchSection";
import TableSection from "./TableSection";

import { useSmpayDataStore } from "@/store/useSmpayDataStore";
import { useSmPayList } from "@/hooks/queries/sm-pay";

import type { TableParams } from "@/types/table";

const SMPayManagementView = () => {
  const { smpayList, setSmpayList } = useSmpayDataStore();

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const { data: response, isFetching: loadingData } = useSmPayList({
    pagination: {
      current: tableParams.pagination?.current || 1,
      pageSize: tableParams.pagination?.pageSize || 10,
    },
    sort:
      tableParams.sortField && tableParams.sortOrder
        ? { field: tableParams.sortField, order: tableParams.sortOrder }
        : undefined,
    filters: tableParams.filters as Record<string, string[]>,
  });

  useEffect(() => {
    if (response?.data) {
      setSmpayList(response.data);
    }
  }, [response?.data]);

  return (
    <div>
      <SearchSection />
      <FilterSection />
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
