import ContentHeader from "@/components/common/ContentHeader";
import SmPayApplyDetailView from "@/components/views/sm-pay/manangement/apply-detail";

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
    title: `SM-Pay 상세내역 : ${params.slug}`,
  };
}

export default function SmPayApplyDetailPage({
  params,
}: {
  params: PageParams;
}) {
  const breadcrumbItems: DashboardSubItem[] = [
    {
      title: "SM Pay",
      url: "/sm-pay",
    },
    {
      title: "SM Pay 관리",
      url: "/sm-pay/management",
    },
    {
      title: "신청 내역 상세",
      url: `/sm-pay/management/apply-detail/${params.slug}`,
    },
  ];

  return (
    <div>
      <ContentHeader title="신청 내역 상세" items={breadcrumbItems} />
      <SmPayApplyDetailView id={params.slug} />
    </div>
  );
}
