import ContentHeader from "@/components/common/ContentHeader";
import AgencyRegisterView from "@/components/views/account/agency-register";

import { type DashboardSubItem } from "@/constants/dasboard";

export default function AgencyRegisterPage() {
  return (
    <div>
      <ContentHeader title="대행사 등록" items={breadcrumbItems} />
      <AgencyRegisterView />
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
  {
    title: "대행사 등록",
    url: "/account/agency-register",
  },
];
