import ContentHeader from "@/components/common/ContentHeader";
import DepartmentView from "@/components/views/account/department";
import type { DashboardSubItem } from "@/types/menu";

export default function DepartmentPage() {
  return (
    <div>
      <ContentHeader title="부서 관리" items={breadcrumbItems} />
      <DepartmentView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "계정 관리",
    url: "/account",
  },
  {
    title: "부서 관리",
    url: "/account/department",
  },
];
