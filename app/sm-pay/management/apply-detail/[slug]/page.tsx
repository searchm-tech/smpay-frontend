// TODO : agency/sm-pay/management/[slug]  변경

import type { Metadata } from "next";
import type { DashboardSubItem } from "@/constants/dasboard";
import ContentHeader from "@/components/common/ContentHeader";
import SmPayApplyDetailView from "@/components/views/sm-pay/manangement/apply-detail";

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `SM-Pay 상세내역 : ${slug}`,
  };
}

export default async function Page({ params }: { params: PageParams }) {
  const { slug } = await params;

  console.log("slug", slug);

  return (
    <div>
      <ContentHeader title="신청 내역 상세" items={breadcrumbItems} />
      <SmPayApplyDetailView />
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
  {
    title: "신청 내역 상세",
    url: "/sm-pay/management/apply-detail/[slug]",
  },
];
