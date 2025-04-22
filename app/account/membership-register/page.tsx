import ContentHeader from "@/components/common/ContentHeader";
import MemberRegisterView from "@/components/views/account/membership-register";
import { type DashboardSubItem } from "@/constants/dasboard";

export default function MemberRegisterPage() {
  return (
    <div>
      <ContentHeader title="회원 등록" items={breadcrumbItems} />
      <MemberRegisterView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "계정 관리",
    url: "/account",
  },
  {
    title: "회원 등록",
    url: "/account/membership-register",
  },
];
