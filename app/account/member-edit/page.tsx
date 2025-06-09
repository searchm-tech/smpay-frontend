import ContentHeader from "@/components/common/ContentHeader";
import MembershipEditView from "@/components/views/account/member-edit";

import type { DashboardSubItem } from "@/types/menu";

export default function MemberEditPage() {
  return (
    <div>
      <ContentHeader title="회원 정보" items={breadcrumbItems} />
      <MembershipEditView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "기본 정보 변경",
    url: "/account/member-edit",
  },
];
