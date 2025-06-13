"use client";

import GuidSection from "@/components/views/sm-pay/components/GuideSection";
import TableSection from "./TableSection";
import { useSmPayList } from "@/hooks/queries/sm-pay";
import { useState } from "react";

import type { TableParams } from "@/types/table";
import { defaultTableParams } from "@/constants/table";

const SmPayAdminAdversiterStatusView = () => {
  const [tableParams, setTableParams] =
    useState<TableParams>(defaultTableParams);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

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
    },
  });

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

  return (
    <div>
      <GuidSection viewType="smpay-guide" />
      <TableSection
        tableParams={tableParams}
        setTableParams={setTableParams}
        total={response?.total || 0}
        loadingData={loadingData}
        smpayList={response?.data || []}
        handleStatusChange={handleStatusChange}
        selectedStatus={selectedStatus}
      />
    </div>
  );
};

export default SmPayAdminAdversiterStatusView;
