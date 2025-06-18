"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import AdvertiserView from "./advertiser";
import LicenseView from "./license";

import { LabelBullet } from "@/components/composite/label-bullet";
import { TabSwitch } from "@/components/composite/tab-switch";
import { ConfirmDialog } from "@/components/composite/modal-components";
import LoadingUI from "@/components/common/Loading";

import { dialogContent } from "./constants";
import { useQueryLicense } from "@/hooks/queries/license";
import { ApiError } from "@/lib/api";

export type TLicenseInfo = {
  userId: number;
  agentId: number;
  customerId: number;
  apiKey: string;
  secretKey: string;
};

const NaverServiceView = () => {
  const { data: session } = useSession();

  const { isLoading, refetch } = useQueryLicense({
    agentId: session?.user?.agentId ?? 0,
    userId: session?.user?.userId ?? 0,
  });

  const [isAdvertiserStep, setIsAdvertiserStep] = useState(false);
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

  // 등록, 수정, 삭제 완료 후, 라이선스 정보 재호출
  const refetchLicense = () => {
    refetch().then((res) => {
      if (res.data) {
        setLicenseInfo({
          userId: res.data.userId,
          agentId: session?.user?.agentId ?? 0,
          customerId: res.data.customerId,
          apiKey: res.data.accessLicense,
          secretKey: res.data.secretKey,
        });
        const { error } = res;
        if (error instanceof ApiError && error.code === "104") {
          setLicenseInfo(null);
        }
      }
    });
  };

  useEffect(() => {
    refetchLicense();
  }, []);

  return (
    <div>
      {isLoading && <LoadingUI title="라이선스 정보 로딩 중..." />}
      {isNoLicenseDialogOpen && (
        <ConfirmDialog
          open
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
        <LicenseView
          licenseInfo={licenseInfo}
          refetch={refetchLicense}
          moveToAdvertiser={() => setIsAdvertiserStep(true)}
        />
      )}
      {isAdvertiserStep && <AdvertiserView user={session?.user} />}
    </div>
  );
};

export default NaverServiceView;
