import type { Metadata } from "next";
import type { DashboardSubItem } from "@/constants/dasboard";
import ContentHeader from "@/components/common/ContentHeader";
import SmPayJudgementDetailView from "@/components/views/sm-pay/judgement/detail";

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `SM Pay 심사 요청 상세 - ${slug}`,
  };
}

export default async function JudgementDetailPage({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = await params;

  console.log("slug", slug);

  return (
    <div>
      <ContentHeader title="심사 요청 상세" items={breadcrumbItems} />
      <SmPayJudgementDetailView id={slug} />
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
    title: "심사 요청 상세",
    url: "/sm-pay/judgement/[slug]",
  },
];
