"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import SearchSection from "./SearchSection";
import TableSection from "./TableSection";

import { useMembers } from "@/hooks/queries/member";

import { defaultTableParams } from "@/constants/table";

import type { TableParams } from "@/types/table";

const MemberManagementView = () => {
  const { data: session } = useSession();

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

  const isAdmin = ["SYSTEM_ADMINISTRATOR", "OPERATIONS_MANAGER"].includes(
    session?.user.type || ""
  );

  if (!session?.user) return null;

  return (
    <div className="flex flex-col gap-4">
      <SearchSection onSearch={onSearch} isAdmin={isAdmin} />
      <TableSection
        isAdmin={isAdmin}
        dataSource={members?.data || []}
        isLoading={isLoading}
        setTableParams={setTableParams}
        user={session.user}
      />
    </div>
  );
};

export default MemberManagementView;
