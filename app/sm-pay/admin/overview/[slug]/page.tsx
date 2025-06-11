import ContentHeader from "@/components/common/ContentHeader";
import SmPayAdminOverviewDetailView from "@/components/views/sm-pay/admin/overview/detail";

import type { Metadata } from "next";
import type { DashboardSubItem } from "@/types/menu";

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `SM Pay 운영 검토 요청 상세 - ${slug}`,
  };
}

export default async function SmPayAdminOverviewDetailPage({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = await params;

  return (
    <div>
      <ContentHeader title="운영 검토 요청 상세" items={breadcrumbItems} />
      <SmPayAdminOverviewDetailView id={slug} />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "SM Pay 관리",
    url: "/sm-pay/admin",
  },
  {
    title: "운영 검토 요청",
    url: "/sm-pay/admin/overview",
  },
  {
    title: "운영 검토 요청 상세",
    url: "/sm-pay/admin/overview/[slug]",
  },
];
