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
import type { UserWithUniqueCode } from "@/types/next-auth";

export interface TableParamsAdvertiser extends TableParams {
  keyword: string;
  sortField?: AdvertiserOrderType;
}

const AdvertiserView = ({ user }: { user?: UserWithUniqueCode }) => {
  const { data: session } = useSession();

  const [search, setSearch] = useState<string>("");

  const [tableParams, setTableParams] =
    useState<TableParamsAdvertiser>(defaultTableParams);

  const {
    data: dataSource,
    isPending: isLoadingAgencys,
    refetch,
  } = useQueryAdvertiserList({
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
        user={user}
        dataSource={dataSource?.content || []}
        isLoading={isLoadingAgencys}
        tableParams={tableParams}
        setTableParams={setTableParams}
        total={dataSource?.totalCount || 0}
        refetch={refetch}
      />

      <Separator className="my-4 mt-12 mx-auto" variant="dotted" />
      <AdvertiserGuideSection />
    </div>
  );
};

export default AdvertiserView;

/**
 * 광고주 데이터 동기화 관련
 * 1. 선택한 광고주들을 등록 하면, IN_PROGESS로 형태 전환하여 동기화작업 실행중 >  이상태에서 라이선스 수정, 삭제 안됨(막아야함)
 * 2. 시간이 지나 선택 한 광고주들의 동기화 작업들이 끝나면 동기화 완료(SYNC) 표시
 * 3. 등록 해제를 할 경우 > UNSYNC, BEFORE_PROGESS, isBizmony = false
 * 2-1) 시간이 지나 선택한 광고주들이 동기화 작업이 끝난다면 > 비즈머니 작업 실시 (isBizmony = true)
 * 3-1) 등록 해제 한다면 비즈머니 제거 (isBizmony = false)
 */
