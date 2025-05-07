"use client";

import { useState } from "react";

import SearchSection from "./SearchSection";
import FilterSection from "./FilterSection";
import TableSection from "./TableSection";

import {
  useSmPayJudgementData,
  useSmPayJudgementData2,
} from "@/hooks/queries/sm-pay";

const SmPayJudgementView = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("전체");
  const [search, setSearch] = useState<string>("");

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSearch = (text: string) => setSearch(text);

  const { data: judgementData, isPending: loadingTable } =
    useSmPayJudgementData2({
      pagination: {
        current: 1,
        pageSize: 10,
      },
      filters: {
        status: [selectedFilter],
        search: [search],
      },
    });

  console.log("judgementData", judgementData);

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
      />
    </div>
  );
};

export default SmPayJudgementView;
