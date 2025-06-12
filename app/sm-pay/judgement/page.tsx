import ContentHeader from "@/components/common/ContentHeader";
import SmPayJudgementView from "@/components/views/sm-pay/judgement";

import type { DashboardSubItem } from "@/types/menu";

// 최상위 그룹장, 그룹장/그룹원
export default function SMPayJudgementPage() {
  return (
    <div>
      <ContentHeader title="심사 요청 목록" items={breadcrumbItems} />
      <SmPayJudgementView />
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
    url: "/sm-pay/judgement",
  },
  {
    title: "심사 요청 목록",
    url: "/sm-pay/judgement",
  },
];
