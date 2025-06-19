"use client";

import { useState } from "react";

import SearchSection from "./SearchSection";

import TableSection from "./TableSection";
import GuidSection from "../components/GuideSection";

import { useSmPayJudgementData } from "@/hooks/queries/sm-pay";
import type { TableProps } from "antd";
import type { SmPayJudgementData } from "@/types/sm-pay";

// TODO : 다른 동일하게 tableParam으로 변경 필요
const SmPayJudgementView = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | undefined>(
    undefined
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    setPage(1);
    setPageSize(10);
    setSortField("");
    setSortOrder(undefined);
  };

  const handleTableChange: TableProps<
    SmPayJudgementData & { id: number }
  >["onChange"] = (pagination, filters, sorter, extra) => {
    setPage(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 10);
    const sortObj = Array.isArray(sorter) ? sorter[0] : sorter;
    setSortField(sortObj?.field as string);
    setSortOrder(sortObj?.order as "ascend" | "descend" | undefined);
  };

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
    <div className="flex flex-col gap-4">
      <GuidSection viewType="smpay-guide" />
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

export default SmPayJudgementView;
