"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import AdvertiserSection from "./AdvertiserSection";
import LicenseSection from "./LicenseSection";
import { NoLicenseDialog } from "./dialog";

import { LabelBullet } from "@/components/composite/label-bullet";

import { TabSwitch } from "@/components/composite/tab-switch";

import { getAgentsUserLicense } from "@/services/license";

import type { TResponseLicense } from "@/types/api/license";

export type TLicenseInfo = {
  userId: number;
  agentId: number;
  customerId: number;
  apiKey: string;
  secretKey: string;
};

const NaverServiceView = () => {
  const { data: session } = useSession();

  const [isCustomerStep, setIsCustomerStep] = useState(false);
  const [licenseInfo, setLicenseInfo] = useState<TLicenseInfo | null>({
    userId: 1,
    agentId: 1,
    customerId: 0,
    apiKey: "",
    secretKey: "",
  });
  const [isNoLicenseDialogOpen, setIsNoLicenseDialogOpen] = useState(false);

  const handleChangeStep = (value: boolean) => {
    if (value) {
      // TODO : api 정상 동작하면 그때 적용
      // if (!licenseInfo) {
      //   setIsNoLicenseDialogOpen(true);
      //   return;
      // } else {
      //   setIsCustomerStep(true);
      // }
      setIsCustomerStep(true);
    } else {
      setIsCustomerStep(false);
    }
  };

  useEffect(() => {
    // TODO : api 정상 동작하면 그때 적용
    // if (session?.user) {
    //   const { agentId, userId } = session.user;
    //   getAgentsUserLicense(agentId.toString(), userId.toString()).then(
    //     (res) => {
    //       setLicenseInfo(res);
    //     }
    //   );
    // }
  }, [session?.user]);

  return (
    <div>
      {isNoLicenseDialogOpen && (
        <NoLicenseDialog onClose={() => setIsNoLicenseDialogOpen(false)} />
      )}
      <LabelBullet labelClassName="text-base font-bold">정보 등록</LabelBullet>
      <TabSwitch
        value={isCustomerStep}
        onValueChange={handleChangeStep}
        leftLabel="API 라이선스 등록"
        rightLabel="광고주 등록"
      />
      {!isCustomerStep && <LicenseSection licenseInfo={licenseInfo} />}
      {isCustomerStep && <AdvertiserSection />}
    </div>
  );
};

export default NaverServiceView;
