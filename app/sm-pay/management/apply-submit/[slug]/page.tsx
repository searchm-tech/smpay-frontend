import type { Metadata } from "next";

import ContentHeader from "@/components/common/ContentHeader";
import ApplySubmitView from "@/components/views/sm-pay/manangement/apply-submit";
import { type DashboardSubItem } from "@/constants/dasboard";

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

export default async function SmPayApplySubmitPage({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = await params;
  console.log("slug", slug);

  return (
    <div>
      <ContentHeader title="신청서 제출" items={breadcrumbItems} />
      <ApplySubmitView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "SM Pay",
    url: "/sm-pay",
  },
  {
    title: "SM Pay관리",
    url: "/sm-pay/management",
  },
  {
    title: "신청서 제출",
    url: "/sm-pay/management/apply-submit",
  },
];
