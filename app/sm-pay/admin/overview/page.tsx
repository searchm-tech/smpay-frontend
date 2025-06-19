import ContentHeader from "@/components/common/ContentHeader";
import SmPayAdminOverviewView from "@/components/views/sm-pay/admin/overview";
import type { DashboardSubItem } from "@/types/menu";

export default function SmPayAdminOverviewPage() {
  return (
    <div>
      <ContentHeader title="운영 검토 요청 목록" items={breadcrumbItems} />
      <SmPayAdminOverviewView />
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
    title: "운영 검토 요청 목록",
    url: "/sm-pay/admin/overview",
  },
];
