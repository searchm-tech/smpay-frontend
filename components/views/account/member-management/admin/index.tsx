"use client";

import { useState } from "react";

import SearchSection from "../SearchSection";
import TableSection from "./TableSection";

import { defaultTableParams } from "../constant";
import { useQueryAdminAgencyUsersList } from "@/hooks/queries/user";

import type { TableParams } from "@/types/table";
import type { ViewProps } from "..";
import type { TAgencyUsersOrder } from "@/types/api/user";

export interface TableParamsMember extends TableParams {
  keyword: string;
  sortField?: TAgencyUsersOrder;
}

const AdminMemberManagementView = ({ user }: ViewProps) => {
  const [search, setSearch] = useState<string>("");
  const [tableParams, setTableParams] =
    useState<TableParamsMember>(defaultTableParams);

  const {
    data: dataSource,
    isPending,
    refetch,
  } = useQueryAdminAgencyUsersList({
    page: tableParams.pagination?.current || 1,
    size: tableParams.pagination?.pageSize || 10,
    keyword: search,
    orderType: tableParams.sortField as TAgencyUsersOrder,
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
        user={user}
        dataSource={dataSource?.content || []}
        isLoading={isPending}
        setTableParams={setTableParams}
        refetch={refetch}
      />
    </div>
  );
};

export default AdminMemberManagementView;
