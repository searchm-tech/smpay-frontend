import ContentHeader from "@/components/common/ContentHeader";
import SmPayAdminAdversiterStatusView from "@/components/views/sm-pay/admin/adversiter-status";
import type { DashboardSubItem } from "@/types/menu";

export default function Page() {
  return (
    <div>
      <ContentHeader title="광고주 운영 현황" items={breadcrumbItems} />
      <SmPayAdminAdversiterStatusView />
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
];
