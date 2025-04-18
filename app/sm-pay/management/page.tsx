import SMPayManagementView from "@/components/views/sm-pay/manangement";
import ContentHeader from "@/components/common/ContentHeader";
import type { DashboardSubItem } from "@/constants/dasboard";

export default function SMPayManagementPage() {
  return (
    <div>
      <ContentHeader title="SM Pay 관리" items={breadcrumbItems} />
      <SMPayManagementView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "SM Pay 관리",
    url: "/sm-pay",
  },
  {
    title: "SM Pay관리",
    url: "/sm-pay/management",
  },
];
