"use client";

import { useState } from "react";

import HeaderSection from "./HeaderSection";
import AgreemenSection from "./AgreemenSection";
import InfoSection from "./InfoSection";
import FooterSection from "./FooterSection";

import { ConfirmDialog } from "@/components/composite/modal-components";

import { dialogContent, type DialogStatus } from "./constants";
import { useRouter } from "next/navigation";

export type AccountInfo = {
  bank: string;
  accountNumber: string;
  accountHolder: string;
};

const DesktopView = () => {
  const router = useRouter();

  const [agreed, setAgreed] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeService, setAgreeService] = useState(false);

  const [salesAccount, setSalesAccount] =
    useState<AccountInfo>(DEFAULT_ACCOUNT_INFO);

  const [chargeAccount, setChargeAccount] =
    useState<AccountInfo>(DEFAULT_ACCOUNT_INFO);

  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<DialogStatus | null>(null);

  const handleReset = () => {
    setSalesAccount(DEFAULT_ACCOUNT_INFO);
    setChargeAccount(DEFAULT_ACCOUNT_INFO);
    setAgreed(false);
    setAgreePrivacy(false);
    setAgreeService(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = () => {
    if (!agreePrivacy || !agreeService) {
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

    setOpenDialog("submit");
  };

  return (
    <div className="max-w-[700px] mt-10 h-[1105px] text-center flex flex-col items-center mx-auto">
      <HeaderSection />

      <AgreemenSection
        agreed={agreed}
        setAgreed={setAgreed}
        agreePrivacy={agreePrivacy}
        setAgreePrivacy={setAgreePrivacy}
        agreeService={agreeService}
        setAgreeService={setAgreeService}
      />
      <InfoSection
        chargeAccount={chargeAccount}
        salesAccount={salesAccount}
        setChargeAccount={setChargeAccount}
        setSalesAccount={setSalesAccount}
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
          onConfirm={() => {
            setOpenDialog(null);
            router.push("/sign-in");
          }}
          content={dialogContent[openDialog].content}
          cancelDisabled={true}
        />
      )}
    </div>
  );
};

export default DesktopView;

const DEFAULT_ACCOUNT_INFO: AccountInfo = {
  bank: "",
  accountNumber: "",
  accountHolder: "",
};
