import ContentHeader from "@/components/common/ContentHeader";

import type { Metadata } from "next";
import type { DashboardSubItem } from "@/types/menu";
import SmPayAdminAdversiterStatusDetailView from "@/components/views/sm-pay/admin/adversiter-status/detail";

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `광고주 운영 현황 상세 - ${slug}`,
  };
}

export default function SmPayAdminAdversiterStatusPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <ContentHeader title="광고주 운영 현황 상세" items={breadcrumbItems} />
      <SmPayAdminAdversiterStatusDetailView id={params.slug} />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "SM Pay 관리",
    url: "/sm-pay/admin",
  },
  {
    title: "광고주 운영 현황",
    url: "/sm-pay/admin/adversiter-status",
  },
  {
    title: "광고주 운영 현황 상세",
    url: "/sm-pay/admin/adversiter-status/[slug]",
  },
];
