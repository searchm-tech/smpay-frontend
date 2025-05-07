"use client";

import { useState } from "react";

import SearchSection from "./SearchSection";
import FilterSection from "./FilterSection";
import TableSection from "./TableSection";

import { useSmPayJudgementData } from "@/hooks/queries/sm-pay";
import type { TableProps } from "antd";
import type { SmPayJudgementData, SmPayJudgementStatus } from "@/types/sm-pay";

const SmPayJudgementView = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | undefined>(
    undefined
  );

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSearch = (text: string) => setSearch(text);

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
        status: selectedFilter ? [selectedFilter] : ["ALL"],
      },
    });

  console.log("selectedFilter", selectedFilter);

  return (
    <div>
      <SearchSection onSearch={handleSearch} />
      <FilterSection
        selectedFilter={selectedFilter}
        handleFilterChange={handleFilterChange}
      />
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
