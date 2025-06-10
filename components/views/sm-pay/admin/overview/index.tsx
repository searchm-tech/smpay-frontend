"use client";

import { useSmPayJudgementData } from "@/hooks/queries/sm-pay";
import { useState } from "react";

import TableSection from "./TableSection";
import GuidSection from "@/components/views/sm-pay/components/GuideSection";

import type { TableProps } from "antd";
import type { SmPayJudgementData } from "@/types/sm-pay";
import SearchSection from "./SearchSection";

const SmPayAdminOverviewView = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | undefined>(
    undefined
  );

  const handleTableChange: TableProps<
    SmPayJudgementData & { id: number }
  >["onChange"] = (pagination, filters, sorter, extra) => {
    setPage(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 10);
    const sortObj = Array.isArray(sorter) ? sorter[0] : sorter;
    setSortField(sortObj?.field as string);
    setSortOrder(sortObj?.order as "ascend" | "descend" | undefined);
  };

  const handleSearch = (text: string) => setSearch(text);

  const { data: judgementData, isPending: loadingTable } =
    useSmPayJudgementData({
      pagination: { current: page, pageSize },
      sort:
        sortField && sortOrder
          ? { field: sortField, order: sortOrder }
          : undefined,
      filters: {
        search: search ? [search] : [""],
      },
    });

  return (
    <div>
      <GuidSection viewType="overview" />
      <SearchSection onSearch={handleSearch} />
      <TableSection
        dataSource={judgementData?.data || []}
        loading={loadingTable}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: judgementData?.total || 0,
        }}
        onTableChange={handleTableChange}
      />
    </div>
  );
};

export default SmPayAdminOverviewView;
