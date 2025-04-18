import ContentHeader from "@/components/common/ContentHeader";
import { type DashboardSubItem } from "@/constants/dasboard";
import SMPayApplyWriteView from "@/components/views/sm-pay/manangement/apply-write";

export default function SMPayApplyWritePage() {
  return (
    <div>
      <ContentHeader title="SM Pay 신청" items={breadcrumbItems} />
      <SMPayApplyWriteView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "SM Pay",
    url: "/sm-pay",
  },
  {
    title: "SM Pay관리",
    url: "/sm-pay/management",
  },
  {
    title: "SM Pay 신청",
    url: "/sm-pay/management/apply-write",
  },
];
