import ContentHeader from "@/components/common/ContentHeader";
import SMPayManagementHistoryView from "@/components/views/sm-pay/manangement/history";

import type { Metadata } from "next";
import type { DashboardSubItem } from "@/types/menu";

type PageParams = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  return {
    title: `SM-Pay 지난 이력 : ${params.slug}`,
  };
}

export default function SMPayManagementHistoryPage() {
  return (
    <div>
      <ContentHeader title="SM Pay 지난 이력 보기" items={breadcrumbItems} />
      <SMPayManagementHistoryView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "SM Pay",
    url: "/sm-pay/management",
  },
  {
    title: "SM Pay관리",
    url: "/sm-pay/management",
  },
  {
    title: "SM Pay 지난 이력",
    url: "/sm-pay/management/history/[slug]",
  },
];
