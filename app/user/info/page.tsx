import ContentHeader from "@/components/common/ContentHeader";
import UserInfoView from "@/components/views/user/info";
import { type DashboardSubItem } from "@/constants/dasboard";
export default function UserInfoPage() {
  return (
    <div>
      <ContentHeader title="회원 정보" items={breadcrumbItems} />
      <UserInfoView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "기본 정보 변경",
    url: "/user/info",
  },
];
