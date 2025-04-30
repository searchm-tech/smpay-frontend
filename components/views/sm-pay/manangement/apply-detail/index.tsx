"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import AdvertiserSection from "../../components/AdvertiserSection";
import RuleSection from "../../components/RuleSection";
import ScheduleSection from "../../components/ScheduleSection";
import GuidSection from "../../components/GuideSection";
import AccountDesc from "../../components/AccountDesc";
import LoadingUI from "@/components/common/Loading";

import { Label } from "@/components/ui/label";
import { LabelBullet } from "@/components/composite/label-bullet";
import { DescriptionItem } from "@/components/composite/description-components";
import { Descriptions } from "@/components/composite/description-components";

import { getSmPayStatusLabel } from "@/constants/status";

import { useSmPaySubmitDetail } from "@/hooks/queries/sm-pay";

import type { AdvertiserData } from "@/types/adveriser";
import AdvertiseStatusDesc from "../../components/AdvertiseStatusDesc";

interface SmPayApplyDetailViewProps {
  id: string;
}

// [대행사, 관리자] SM Pay 관리 -> 조회 -> 신청 내역 상세
const SmPayApplyDetailView = ({ id }: SmPayApplyDetailViewProps) => {
  const router = useRouter();

  const { data: response, isPending } = useSmPaySubmitDetail(id);

  const advertiserData: AdvertiserData | null = response?.data
    ? {
        id: response.data.id,
        name: response.data.advertiserName,
        customerId: response.data.customerId,
        loginId: response.data.loginId,
        advertiserName: response.data.advertiserName,
        status: "AVAILABLE",
        updatedAt: response.data.updatedAt,
        businessName: response.data.businessName,
        businessNumber: response.data.businessNumber,
        businessOwnerName: response.data.businessOwnerName,
        businessOwnerPhone: response.data.businessOwnerPhone,
        businessOwnerEmail: response.data.businessOwnerEmail,
      }
    : null;

  return (
    <div>
      {isPending && <LoadingUI title="SM Pay 정보 조회 중..." />}
      <GuidSection viewType="submit" />
      <AdvertiseStatusDesc
        status={response.data ? getSmPayStatusLabel(response.data.status) : ""}
      />
      <AdvertiserSection advertiserData={advertiserData} />
      <AccountDesc smPayData={response.data} />
      <RuleSection id={id} />
      <ScheduleSection id={id} />

      <div className="flex justify-center gap-4 py-5">
        <Button className="w-[150px]">확인</Button>
        <Button
          variant="cancel"
          className="w-[150px]"
          onClick={() => router.push("/sm-pay/management")}
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default SmPayApplyDetailView;
