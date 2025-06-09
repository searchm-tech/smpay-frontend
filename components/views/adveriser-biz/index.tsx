"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import TableSection from "./TableSection";

import type { TableParams } from "@/types/table";
import type { TAdvertiserBizMoneyOrderType } from "@/types/adveriser";
import { defaultTableParams } from "./constants";
import { useQueryAdvertiserBizMoneyList } from "@/hooks/queries/advertiser";

import { SearchInput } from "@/components/composite/input-components";
import { Button } from "@/components/ui/button";

export interface TableParamsBizMoney extends TableParams {
  keyword: string;
  sortField?: TAdvertiserBizMoneyOrderType;
}

const AdvertiserBizView = () => {
  const { data: session } = useSession();

  const [search, setSearch] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [tableParams, setTableParams] =
    useState<TableParamsBizMoney>(defaultTableParams);

  const { data: dataSource, isPending: isLoading } =
    useQueryAdvertiserBizMoneyList({
      page: tableParams.pagination?.current || 1,
      size: tableParams.pagination?.pageSize || 10,
      keyword: searchKeyword,
      orderType: tableParams.sortField as TAdvertiserBizMoneyOrderType,
      agentId: session?.user.agentId ?? 0,
      userId: session?.user.userId ?? 0,
    });

  const handleSearch = () => {
    setSearchKeyword(search);
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <section className="flex items-center gap-2">
        <SearchInput
          className="w-[200px]"
          placeholder="광고주 로그인 ID 검색"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
        <Button onClick={handleSearch}>검색</Button>
      </section>
      <TableSection
        dataSource={dataSource?.content || []}
        isLoading={isLoading}
        tableParams={tableParams}
        setTableParams={setTableParams}
        total={dataSource?.totalCount || 0}
      />
    </div>
  );
};

export default AdvertiserBizView;
