import ContentHeader from "@/components/common/ContentHeader";
import SmPayAdminChargeView from "@/components/views/sm-pay/admin/charge";

import type { DashboardSubItem } from "@/types/menu";

export default function ChargeCountPage() {
  return (
    <div>
      <ContentHeader title="충전 회수 현황" items={breadcrumbItems} />
      <SmPayAdminChargeView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "SM Pay 관리",
    url: "/sm-pay/admin",
  },
  {
    title: "충전 회수 현황",
    url: "/sm-pay/admin/charge",
  },
];
