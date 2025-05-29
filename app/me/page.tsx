import ContentHeader from "@/components/common/ContentHeader";
import MeView from "@/components/views/me";
import type { DashboardSubItem } from "@/types/menu";

export default function MePage() {
  return (
    <div>
      <ContentHeader title="기본 정보 변경" items={breadcrumbItems} />
      <MeView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "기본 정보 변경",
    url: "/me",
  },
];
