import ContentHeader from "@/components/common/ContentHeader";
import AgencyEditView from "@/components/views/account/agency-edit";

import type { Metadata } from "next";
import type { DashboardSubItem } from "@/types/menu";

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `대행사 정보 수정`,
  };
}

export default async function AgencyManagementEditPage({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = await params;

  return (
    <div>
      <ContentHeader title="대행사 정보 수정" items={breadcrumbItems} />
      <AgencyEditView id={slug} />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "계좌 관리",
    url: "/account",
  },
  {
    title: "대행사 관리",
    url: "/account/agency-management",
  },
  {
    title: "대행사 정보 수정",
    url: "/account/agency-management/[slug]",
  },
];
