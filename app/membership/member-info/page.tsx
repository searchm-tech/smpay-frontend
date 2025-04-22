import ContentHeader from "@/components/common/ContentHeader";
import MemberInfoView from "@/components/views/membership/member-info";
import { type DashboardSubItem } from "@/constants/dasboard";
export default function MemberInfoPage() {
  return (
    <div>
      <ContentHeader title="회원 정보" items={breadcrumbItems} />
      <MemberInfoView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "기본 정보 변경",
    url: "/membership/member-info",
  },
];
