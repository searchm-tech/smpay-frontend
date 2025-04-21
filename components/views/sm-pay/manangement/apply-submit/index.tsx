"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import AdvertiserSection from "../../components/AdvertiserSection";
import ScheduleSection from "../../components/ScheduleSection";
import RuleSection from "../../components/RuleSection";
import GuidSection from "../../components/GuideSection";
import AccountDesc from "../../components/AccountDesc";

const ApplySubmitView = () => {
  const router = useRouter();

  return (
    <div>
      <GuidSection viewType="list" />

      <div className="mt-4 flex flex-col gap-2">
        <AdvertiserSection />
        <AccountDesc />
        <RuleSection />
        <ScheduleSection />
      </div>

      <div className="flex justify-center gap-4 py-5">
        <Button className="w-[150px]">심사 요청</Button>
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

export default ApplySubmitView;
