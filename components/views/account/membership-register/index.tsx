"use client";
import { useState } from "react";

import MailSendSection from "./MailSendSection";
import DirectRegistSection from "./DirectRegistSection";

import { LabelBullet } from "@/components/composite/label-bullet";
import { TabSwitch } from "@/components/composite/tab-switch";

import { useUserStore } from "@/store/useUserStore";

const MemberRegisterView = () => {
  const { user } = useUserStore();
  const [isDirectRegist, setIsDirectRegist] = useState(false);

  console.log("user", user);

  return (
    <div>
      <LabelBullet labelClassName="text-base font-bold">
        회원 등록 방식
      </LabelBullet>
      <TabSwitch
        className="mt-2"
        value={isDirectRegist}
        onValueChange={setIsDirectRegist}
        leftLabel="초대 메일 발송"
        rightLabel="직접 등록"
      />
      {!isDirectRegist && <MailSendSection role={user?.role} />}
      {isDirectRegist && <DirectRegistSection role={user?.role} />}
    </div>
  );
};

export default MemberRegisterView;
