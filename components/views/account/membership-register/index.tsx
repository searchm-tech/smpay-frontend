"use client";
import { useState } from "react";

import MailSendSection from "./MailSendSection";
import DirectRegistSection from "./DirectRegistSection";

import { LabelBullet } from "@/components/composite/label-bullet";
import { TabSwitch } from "@/components/composite/tab-switch";

import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

const MemberRegisterView = () => {
  const { data: session } = useSession();
  const [isDirectRegist, setIsDirectRegist] = useState(false);

  const isAdmin = ["SYSTEM_ADMINISTRATOR", "OPERATIONS_MANAGER"].includes(
    session?.user.type || ""
  );

  if (!session?.user) {
    return <Skeleton className="w-full h-[100px]" />;
  }

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
      {!isDirectRegist && <MailSendSection isAdmin={isAdmin} />}
      {isDirectRegist && <DirectRegistSection isAdmin={isAdmin} />}
    </div>
  );
};

export default MemberRegisterView;
