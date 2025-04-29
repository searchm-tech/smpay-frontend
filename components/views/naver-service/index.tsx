"use client";

import { useState } from "react";

import AdvertiserSection from "./AdvertiserSection";
import LicenseSection from "./LicenseSection";
import { LabelBullet } from "@/components/composite/label-bullet";
import { TabSwitch } from "@/components/composite/tab-switch";

const NaverServiceView = () => {
  const [value, setValue] = useState(false);

  return (
    <div>
      <LabelBullet labelClassName="text-base">정보 등록</LabelBullet>
      <TabSwitch
        value={value}
        onValueChange={setValue}
        leftLabel="API 라이선스 등록"
        rightLabel="광고주 등록"
      />
      {!value && <LicenseSection />}
      {value && <AdvertiserSection />}
    </div>
  );
};

export default NaverServiceView;
