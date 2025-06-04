import { useSession } from "next-auth/react";
import { useState } from "react";

import SearchSection from "./SearchSection";
import TableSection from "./TableSection";
import { AdvertiserGuideSection } from "../GuideSection";
import { defaultTableParams } from "../constants";

import { Separator } from "@/components/ui/separator";

import { useQueryAdvertiserList } from "@/hooks/queries/advertiser";

import type { TableParams } from "@/types/table";
import type { AdvertiserOrderType } from "@/types/adveriser";

export interface TableParamsAdvertiser extends TableParams {
  keyword: string;
  sortField?: AdvertiserOrderType;
}

const AdvertiserView = () => {
  const { data: session } = useSession();

  const [search, setSearch] = useState<string>("");

  const [tableParams, setTableParams] =
    useState<TableParamsAdvertiser>(defaultTableParams);

  const { data: dataSource, isPending: isLoadingAgencys } =
    useQueryAdvertiserList({
      page: tableParams.pagination?.current || 1,
      size: tableParams.pagination?.pageSize || 10,
      keyword: search,
      orderType: tableParams.sortField as AdvertiserOrderType,
      agentId: session?.user.agentId,
      userId: session?.user.userId,
    });

  return (
    <div>
      <SearchSection onSearch={setSearch} />

      <TableSection
        dataSource={dataSource?.content || []}
        isLoading={isLoadingAgencys}
        tableParams={tableParams}
        setTableParams={setTableParams}
        total={dataSource?.totalCount || 0}
      />

      <Separator className="my-4 mt-12 mx-auto" variant="dotted" />
      <AdvertiserGuideSection />
    </div>
  );
};

export default AdvertiserView;
