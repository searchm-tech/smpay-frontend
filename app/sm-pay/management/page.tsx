import { Suspense } from "react";
import SMPayManagementView from "@/components/views/sm-pay/manangement";
import ContentHeader from "@/components/common/ContentHeader";
import LoadingUI from "@/components/common/Loading";

import type { DashboardSubItem } from "@/constants/dasboard";

export default function SMPayManagementPage() {
  return (
    <div>
      <ContentHeader title="SM Pay 관리" items={breadcrumbItems} />
      <Suspense
        fallback={<LoadingUI title="SM Pay 관리 페이지2222 로딩중..." />}
      >
        <SMPayManagementView />
      </Suspense>
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "SM Pay",
    url: "/sm-pay",
  },
  {
    title: "SM Pay 관리",
    url: "/sm-pay/management",
  },
];
