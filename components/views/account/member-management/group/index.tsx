"use client";

import { useState } from "react";

import SearchSection from "../SearchSection";
import TableSection from "./TableSection";

import { defaultTableParams } from "../constant";
import { useQueryGroupUserList } from "@/hooks/queries/user";

import type { TableParams } from "@/types/table";
import type { ViewProps } from "..";

import { TAgencyUsersOrder } from "@/types/api/user";

export interface TableParamsMember extends TableParams {
  keyword: string;
  sortField?: TAgencyUsersOrder;
}

const GroupMemberManagementView = ({ user }: ViewProps) => {
  const [search, setSearch] = useState<string>("");
  const [tableParams, setTableParams] =
    useState<TableParamsMember>(defaultTableParams);

  const {
    data: dataSource,
    isPending,
    refetch,
  } = useQueryGroupUserList({
    page: tableParams.pagination?.current || 1,
    size: tableParams.pagination?.pageSize || 10,
    keyword: search,
    orderType: tableParams.sortField as TAgencyUsersOrder,
    agentId: user.agentId,
    userId: user.userId,
  });

  console.log(dataSource);

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

export default GroupMemberManagementView;
