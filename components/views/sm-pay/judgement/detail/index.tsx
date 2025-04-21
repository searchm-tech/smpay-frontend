"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import AdvertiserSection from "../../components/AdvertiserSection";
import RuleSection from "../../components/RuleSection";
import ScheduleSection from "../../components/ScheduleSection";
import StandardSection from "../../components/StandardSection";
import AdvertiseStatusDesc from "../../components/AdvertiseStatusDesc";
import ApproveModal from "./ApproveModal";
import RejectSendModal from "./RejectSendModal";
import { GuideBox } from "@/components/common/Box";
import { TriangleAlert } from "lucide-react";

const SmPayJudgementDetailView = () => {
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  return (
    <div>
      <ApproveModal
        open={isApproved}
        onClose={() => setIsApproved(false)}
        onConfirm={() => setIsApproved(false)}
      />

      <RejectSendModal
        open={isRejected}
        onClose={() => setIsRejected(false)}
        onConfirm={() => setIsRejected(false)}
      />

      <GuideBox className="bg-[#FCECEC] mb-2">
        <div className="flex items-center gap-2 py-2">
          <TriangleAlert color="#FF0000" size={18} />
          <span>광고주의 심사가 반려되었습니다. 반려 사유를 확인하세요.</span>
        </div>
      </GuideBox>

      <AdvertiseStatusDesc />
      <AdvertiserSection />
      <RuleSection />
      <ScheduleSection />
      <StandardSection />

      <div className="flex justify-center gap-4 py-5">
        <Button className="w-[150px]" onClick={() => setIsApproved(true)}>
          승인
        </Button>
        <Button
          variant="cancel"
          className="w-[150px]"
          onClick={() => setIsRejected(true)}
        >
          반려
        </Button>
      </div>
    </div>
  );
};

export default SmPayJudgementDetailView;
