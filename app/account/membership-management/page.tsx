import ContentHeader from "@/components/common/ContentHeader";
import MembershipManagementView from "@/components/views/account/membership-management";
import { type DashboardSubItem } from "@/constants/dasboard";

export default function MembershipManagementPage() {
  return (
    <div>
      <ContentHeader title="회원 관리" items={breadcrumbItems} />
      <MembershipManagementView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "계정 관리",
    url: "/account",
  },
  {
    title: "회원 관리",
    url: "/account/membership-management",
  },
];
