"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import AdvertiserView from "./advertiser";
import LicenseView from "./license";

import { LabelBullet } from "@/components/composite/label-bullet";
import { TabSwitch } from "@/components/composite/tab-switch";
import { ConfirmDialog } from "@/components/composite/modal-components";
import LoadingUI from "@/components/common/Loading";

import { getAgentsUserLicense } from "@/services/license";

import { dialogContent } from "./constants";

export type TLicenseInfo = {
  userId: number;
  agentId: number;
  customerId: number;
  apiKey: string;
  secretKey: string;
};

const NaverServiceView = () => {
  const { data: session } = useSession();

  const [isAdvertiserStep, setIsAdvertiserStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [licenseInfo, setLicenseInfo] = useState<TLicenseInfo | null>(null);
  const [isNoLicenseDialogOpen, setIsNoLicenseDialogOpen] = useState(false);

  const handleChangeStep = (value: boolean) => {
    if (value) {
      if (!licenseInfo) {
        setIsNoLicenseDialogOpen(true);
        return;
      } else {
        setIsAdvertiserStep(true);
      }
      setIsAdvertiserStep(true);
    } else {
      setIsAdvertiserStep(false);
    }
  };

  const fetchLicenseInfo = async () => {
    if (!session?.user) return;
    const { agentId, userId } = session.user;
    try {
      setIsLoading(true);
      const res = await getAgentsUserLicense(
        agentId.toString(),
        userId.toString()
      );
      setLicenseInfo({
        userId: res.userId,
        agentId: agentId,
        customerId: res.customerId,
        apiKey: res.accessLicense,
        secretKey: res.secretKey,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchLicenseInfo();
    }
  }, [session?.user]);

  return (
    <div>
      {isLoading && <LoadingUI title="라이선스 정보 로딩 중..." />}
      {isNoLicenseDialogOpen && (
        <ConfirmDialog
          open
          title="라이선스 미등록"
          confirmText="확인"
          cancelDisabled
          onConfirm={() => setIsNoLicenseDialogOpen(false)}
          content={dialogContent["no-license"]}
        />
      )}
      <LabelBullet labelClassName="text-base font-bold">정보 등록</LabelBullet>
      <TabSwitch
        value={isAdvertiserStep}
        onValueChange={handleChangeStep}
        leftLabel="API 라이선스 등록"
        rightLabel="광고주 등록"
      />
      {!isAdvertiserStep && (
        <LicenseView licenseInfo={licenseInfo} refetch={fetchLicenseInfo} />
      )}
      {isAdvertiserStep && <AdvertiserView />}
    </div>
  );
};

export default NaverServiceView;
