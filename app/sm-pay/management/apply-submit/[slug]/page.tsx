import type { Metadata } from "next";

import ContentHeader from "@/components/common/ContentHeader";
import ApplySubmitView from "@/components/views/sm-pay/manangement/apply-submit";
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
    title: `SM-Pay 신청 : ${params.slug}`,
  };
}

export default function SmPayApplySubmitPage({
  params,
}: {
  params: PageParams;
}) {
  console.log("slug", params.slug);

  return (
    <div>
      <ContentHeader title="신청서 제출" items={breadcrumbItems} />
      <ApplySubmitView id={params.slug} />
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
