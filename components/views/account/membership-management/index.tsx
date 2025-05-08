"use client";

import { useState } from "react";

import SearchSection from "./SearchSection";
import TableSection from "./TableSection";

import { useUserStore } from "@/store/useUserStore";
import { useMembers } from "@/hooks/queries/member";

import { defaultTableParams } from "@/constants/table";

import type { TableParams } from "@/types/table";

const MembershipManagementView = () => {
  const { user } = useUserStore();

  const [search, setSearch] = useState<string>("");
  const [tableParams, setTableParams] =
    useState<TableParams>(defaultTableParams);

  const { data: members, isPending: isLoading } = useMembers({
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
      <SearchSection role={user?.role} onSearch={onSearch} />
      <TableSection
        role={user?.role}
        dataSource={members?.data || []}
        isLoading={isLoading}
        setTableParams={setTableParams}
      />
    </div>
  );
};

export default MembershipManagementView;
