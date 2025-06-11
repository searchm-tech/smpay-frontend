import ContentHeader from "@/components/common/ContentHeader";
import SmPayMasterJudgementView from "@/components/views/sm-pay/master/judgement";

import type { DashboardSubItem } from "@/types/menu";

export default function SMPayMasterJudgementPage() {
  return (
    <div>
      <ContentHeader title="심사 요청 목록" items={breadcrumbItems} />
      <SmPayMasterJudgementView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "SM Pay 관리",
    url: "/sm-pay",
  },
  {
    title: "SM Pay 심사",
    url: "/sm-pay/master/judgement",
  },
  {
    title: "심사 요청 목록",
    url: "/sm-pay/master/judgement",
  },
];
