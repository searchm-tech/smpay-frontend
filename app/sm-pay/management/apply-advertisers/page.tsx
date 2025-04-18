import ContentHeader from "@/components/common/ContentHeader";
import { type DashboardSubItem } from "@/constants/dasboard";
import SMPayApplyAdvertisersView from "@/components/views/sm-pay/manangement/apply-advertisers";

export default function SMPayApplyAdvertisersPage() {
  return (
    <div>
      <ContentHeader title="SM Pay 신청" items={breadcrumbItems} />
      <SMPayApplyAdvertisersView />
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
    url: "/sm-pay/management/apply-advertisers",
  },
];
