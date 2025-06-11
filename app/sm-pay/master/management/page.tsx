import SMPayMasterManagementView from "@/components/views/sm-pay/master/manangement";
import ContentHeader from "@/components/common/ContentHeader";

import type { DashboardSubItem } from "@/types/menu";

export default function SMPayManagementPage() {
  return (
    <div>
      <ContentHeader title="SM Pay 관리" items={breadcrumbItems} />
      <SMPayMasterManagementView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "SM Pay",
    url: "/sm-pay/master/management",
  },
  {
    title: "SM Pay 관리",
    url: "/sm-pay/master/management",
  },
];
