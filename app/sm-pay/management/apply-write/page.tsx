import ContentHeader from "@/components/common/ContentHeader";
import SMPayMasterApplyWriteView from "@/components/views/sm-pay/manangement/apply-write";
import type { DashboardSubItem } from "@/types/menu";

export default function SMPayApplyWritePage() {
  return (
    <div>
      <ContentHeader title="SM Pay 신청" items={breadcrumbItems} />
      <SMPayMasterApplyWriteView />
    </div>
  );
}

const breadcrumbItems: DashboardSubItem[] = [
  {
    title: "SM Pay",
    url: "/sm-pay/management",
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
