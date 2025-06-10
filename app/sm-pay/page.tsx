import ContentHeader from "@/components/common/ContentHeader";
import SmPayView from "@/components/views/sm-pay";
import type { DashboardSubItem } from "@/types/menu";

export default function SmPayPage() {
  return (
    <div>
      <ContentHeader title="SM Pay" items={breadcrumbItems} />
      <SmPayView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "SM Pay 관리",
    url: "/sm-pay",
  },
];
