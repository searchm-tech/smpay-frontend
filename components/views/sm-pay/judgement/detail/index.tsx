"use client";

import { useState } from "react";
import { Descriptions } from "antd";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/composite/modal-components";
import { LabelBullet } from "@/components/composite/label-bullet";

import AdvertiserSection from "./AdvertiserSection";
import RuleSection from "./RuleSection";
import ScheduleSection from "./ScheduleSection";
import StandardSection from "./StandardSection";

// [관리자] SM Pay 심사 -> 심사 요청 상세
const SmPaySubmitView = () => {
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  return (
    <div>
      <Modal
        open={isApproved}
        title="광고주 심사 승인"
        onClose={() => setIsApproved(false)}
      >
        <div>광고주의 SM Pay 신청이 승인되었습니다.</div>
      </Modal>

      <Modal
        open={isRejected}
        title="광고주 심사 취소"
        onClose={() => setIsRejected(false)}
      >
        <div className="w-[550px]">
          <p className="pb-4">광고주의 SM Pay 신청이 반려되었습니다.</p>
          <Descriptions column={1} bordered styles={{ label: { width: 150 } }}>
            <Descriptions.Item label="반려 사유 입력">
              <Textarea rows={8} />
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Modal>

      <section>
        <LabelBullet labelClassName="text-base">광고주 심사 상태</LabelBullet>
        <Descriptions column={1} bordered styles={{ label: { width: 200 } }}>
          <Descriptions.Item
            label={<span className="font-bold">심사 상태</span>}
          >
            <span className="font-bold">심사 요청</span>
          </Descriptions.Item>
        </Descriptions>
      </section>
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

export default SmPaySubmitView;
