import ContentHeader from "@/components/common/ContentHeader";
import AgencyManagementView from "@/components/views/account/agency-management";
import { type DashboardSubItem } from "@/constants/dasboard";

export default function AgencyManagementPage() {
  return (
    <div>
      <ContentHeader title="대행사 관리" items={breadcrumbItems} />
      <AgencyManagementView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "계정 관리",
    url: "/account",
  },
  {
    title: "대행사 관리",
    url: "/account/agency-management",
  },
];
