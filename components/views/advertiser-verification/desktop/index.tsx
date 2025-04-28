"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import HeaderSection from "./HeaderSection";
import AgreemenSection from "./AgreemenSection";
import InfoSection from "./InfoSection";
import FooterSection from "./FooterSection";

import { ConfirmDialog } from "@/components/composite/modal-components";

import {
  DEFAULT_ACCOUNT_INFO,
  DEFAULT_AGREEMENT_INFO,
  dialogContent,
  type DialogStatus,
} from "../constants";

import type { AccountInfo, AgreementInfo } from "@/types/vertification";

const DesktopView = () => {
  const router = useRouter();

  const [arsCertified, setArsCertified] = useState(false);
  const [agreement, setAgreement] = useState<AgreementInfo>(
    DEFAULT_AGREEMENT_INFO
  );
  const [salesAccount, setSalesAccount] =
    useState<AccountInfo>(DEFAULT_ACCOUNT_INFO);
  const [chargeAccount, setChargeAccount] =
    useState<AccountInfo>(DEFAULT_ACCOUNT_INFO);

  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<DialogStatus | null>(null);

  const handleReset = () => {
    setSalesAccount(DEFAULT_ACCOUNT_INFO);
    setChargeAccount(DEFAULT_ACCOUNT_INFO);
    setAgreement(DEFAULT_AGREEMENT_INFO);
    setArsCertified(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = () => {
    if (!agreement.agreePrivacy || !agreement.agreeService) {
      setError("필수 동의 항목을 체크해주세요.");
      return;
    }

    if (
      !chargeAccount.accountHolder ||
      !salesAccount.accountHolder ||
      !chargeAccount.accountNumber ||
      !salesAccount.accountNumber ||
      !chargeAccount.bank ||
      !salesAccount.bank
    ) {
      setError("입력하지 않은 구간이 있습니다.");
      return;
    }

    if (!chargeAccount.isCertified || !salesAccount.isCertified) {
      setError("계좌 인증을 진행해주세요.");
      return;
    }

    setOpenDialog("submit");
  };

  return (
    <div className="max-w-[700px] mt-10 h-[1105px] text-center flex flex-col items-center mx-auto">
      <HeaderSection />

      <AgreemenSection agreement={agreement} setAgreement={setAgreement} />
      <InfoSection
        chargeAccount={chargeAccount}
        salesAccount={salesAccount}
        arsCertified={arsCertified}
        setChargeAccount={setChargeAccount}
        setSalesAccount={setSalesAccount}
        setArsCertified={setArsCertified}
      />
      <FooterSection handleReset={handleReset} handleSubmit={handleSubmit} />

      {error && (
        <ConfirmDialog
          open
          onConfirm={() => setError(null)}
          content={error}
          cancelDisabled={true}
        />
      )}
      {openDialog && (
        <ConfirmDialog
          open
          content={dialogContent[openDialog].content}
          cancelDisabled={true}
          onConfirm={() => {
            setOpenDialog(null);
            router.push("/sign-in");
          }}
        />
      )}
    </div>
  );
};

export default DesktopView;
