import { Button } from "@/components/ui/button";

import AdvertiserSection from "./AdvertiserSection";
import RuleSection from "./RuleSection";
import ScheduleSection from "./ScheduleSection";
import GuidSection from "../../components/GuideSection";

// [대행사, 관리자] SM Pay 관리 -> 조회 -> 신청 내역 상세
const SmPayApplyDetailView = () => {
  return (
    <div>
      <GuidSection viewType="list" />
      <AdvertiserSection />
      <RuleSection />
      <ScheduleSection />

      <div className="flex justify-center gap-4 py-5">
        <Button className="w-[150px]">확인</Button>
        <Button variant="cancel" className="w-[150px]">
          취소
        </Button>
      </div>
    </div>
  );
};

export default SmPayApplyDetailView;
