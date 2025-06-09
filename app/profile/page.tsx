import ContentHeader from "@/components/common/ContentHeader";
import ProfileView from "@/components/views/profile";
import type { DashboardSubItem } from "@/types/menu";

export default function ProfilePage() {
  return (
    <div>
      <ContentHeader title="회원 정보" items={breadcrumbItems} />
      <ProfileView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "기본 정보 변경",
    url: "/account/member-edit",
  },
];
