import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { NumberInput } from "@/components/composite/input-components";
import Select from "@/components/composite/select-components";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { TooltipHover } from "@/components/composite/tooltip-components";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";

import { dialogContent, hoverData, TEST_BANK_OPTIONS } from "../constants";

import type { AccountInfo } from "@/types/vertification";

type InfoSectionProps = {
  chargeAccount: AccountInfo;
  salesAccount: AccountInfo;
  arsCertified: boolean;
  setChargeAccount: (account: AccountInfo) => void;
  setSalesAccount: (account: AccountInfo) => void;
  setArsCertified: (arsCertified: boolean) => void;
};
const InfoSection = ({
  chargeAccount,
  salesAccount,
  arsCertified,
  setChargeAccount,
  setSalesAccount,
  setArsCertified,
}: InfoSectionProps) => {
  const [certifiedMessage, setCertifiedMessage] = useState<
    "charge" | "sales" | null
  >(null);

  const [error, setError] = useState<string | null>(null);

  const handleChargeCertification = () => {
    if (
      !chargeAccount.accountHolder ||
      !chargeAccount.accountNumber ||
      !chargeAccount.bank
    ) {
      setError("입력하지 않은 구간이 있습니다.");
      return;
    }

    setCertifiedMessage("charge");
  };

  const handleSalesCertification = () => {
    if (
      !salesAccount.accountHolder ||
      !salesAccount.accountNumber ||
      !salesAccount.bank
    ) {
      setError("입력하지 않은 구간이 있습니다.");
      return;
    }

    setCertifiedMessage("sales");
  };

  const handleARS = () => {
    if (!chargeAccount.isCertified || !salesAccount.isCertified) {
      setError("계좌 인증을 진행해주세요.");
      return;
    }

    setArsCertified(true);
  };

  return (
    <section className="w-full mt-10 py-6 border-dotted border-gray-400 border-b-2 border-t-2">
      {error && (
        <ConfirmDialog
          open
          onConfirm={() => setError(null)}
          content={error}
          cancelDisabled={true}
        />
      )}
      {certifiedMessage && (
        <ConfirmDialog
          open
          onConfirm={() => {
            if (certifiedMessage === "charge") {
              setChargeAccount({ ...chargeAccount, isCertified: true });
            } else {
              setSalesAccount({ ...salesAccount, isCertified: true });
            }

            setCertifiedMessage(null);
          }}
          content={dialogContent["certification"].content}
          cancelDisabled={true}
        />
      )}
      <div className="mt-4">
        <div className="flex items-center gap-2 pb-4">
          <LabelBullet labelClassName="text-base ">
            충전 계좌 정보 입력
          </LabelBullet>

          <TooltipHover
            triggerContent={hoverData["charge"].triggerContent}
            content={hoverData["charge"].content}
          />
        </div>

        <Descriptions columns={1}>
          <DescriptionItem
            label={<span className="w-[200px]">충전 계좌 은행 *</span>}
          >
            <Select
              options={TEST_BANK_OPTIONS}
              placeholder="은행 선택"
              value={chargeAccount.bank}
              onChange={(value) =>
                setChargeAccount({ ...chargeAccount, bank: value })
              }
            />
          </DescriptionItem>
          <DescriptionItem
            label={<span className="w-[200px]">충전 계좌 번호 *</span>}
          >
            <NumberInput
              className="max-w-[500px]"
              placeholder="숫자만 연속 입력"
              value={chargeAccount.accountNumber}
              onChange={(value) =>
                setChargeAccount({ ...chargeAccount, accountNumber: value })
              }
            />
          </DescriptionItem>
          <DescriptionItem
            label={<span className="w-[200px]">충전 계좌 예금주명 *</span>}
          >
            <div className="flex gap-2">
              <Input
                className="max-w-[400px]"
                value={chargeAccount.accountHolder}
                onChange={(e) =>
                  setChargeAccount({
                    ...chargeAccount,
                    accountHolder: e.target.value,
                  })
                }
              />
              <Button className="w-[100px]" onClick={handleChargeCertification}>
                계좌 인증 하기
              </Button>
            </div>
          </DescriptionItem>
        </Descriptions>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2 pb-4">
          <LabelBullet labelClassName="text-base">
            매출 계좌 정보 입력
          </LabelBullet>
          <TooltipHover
            triggerContent={hoverData["sales"].triggerContent}
            content={hoverData["sales"].content}
          />
        </div>

        <Descriptions columns={1}>
          <DescriptionItem
            label={<span className="w-[200px]">매출 계좌 은행 *</span>}
          >
            <Select
              options={TEST_BANK_OPTIONS}
              placeholder="은행 선택"
              value={salesAccount.bank}
              onChange={(value) =>
                setSalesAccount({ ...salesAccount, bank: value })
              }
            />
          </DescriptionItem>
          <DescriptionItem
            label={<span className="w-[200px]">매출 계좌 번호 *</span>}
          >
            <NumberInput
              className="max-w-[500px]"
              placeholder="숫자만 연속 입력"
              value={salesAccount.accountNumber}
              onChange={(value) =>
                setSalesAccount({ ...salesAccount, accountNumber: value })
              }
            />
          </DescriptionItem>
          <DescriptionItem
            label={<span className="w-[200px]">매출 계좌 예금주명 *</span>}
          >
            <div className="flex gap-2">
              <Input
                className="max-w-[400px]"
                value={salesAccount.accountHolder}
                onChange={(e) =>
                  setSalesAccount({
                    ...salesAccount,
                    accountHolder: e.target.value,
                  })
                }
              />
              <Button className="w-[100px]" onClick={handleSalesCertification}>
                계좌 인증 하기
              </Button>
            </div>
          </DescriptionItem>
        </Descriptions>
      </div>

      <Button
        className="text-center mt-8 w-[400px] h-[50px] font-bold"
        variant="cancel"
        disabled={arsCertified}
        onClick={handleARS}
      >
        {arsCertified ? "ARS 인증 완료" : "ARS 인증"}
      </Button>
    </section>
  );
};

export default InfoSection;
