import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/composite/input-components";

import { dialogContent, DialogStatus, hoverData } from "./constants";

import Select from "@/components/composite/select-components";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { TooltipHover } from "@/components/composite/tooltip-components";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";

import type { AccountInfo } from ".";

type InfoSectionProps = {
  chargeAccount: AccountInfo;
  salesAccount: AccountInfo;
  setChargeAccount: (account: AccountInfo) => void;
  setSalesAccount: (account: AccountInfo) => void;
};
const InfoSection = ({
  chargeAccount,
  salesAccount,
  setChargeAccount,
  setSalesAccount,
}: InfoSectionProps) => {
  const [openDialog, setOpenDialog] = useState<DialogStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCertification = () => {
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
    setOpenDialog("certification");
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
      {openDialog && (
        <ConfirmDialog
          open
          onConfirm={() => setOpenDialog(null)}
          content={dialogContent[openDialog].content}
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
              placeholder="은행 선택"
              value={chargeAccount.bank}
              onChange={(value) =>
                setChargeAccount({ ...chargeAccount, bank: value })
              }
              options={[
                { label: "신한", value: "active" },
                { label: "국민", value: "inactive" },
              ]}
            />
          </DescriptionItem>
          <DescriptionItem
            label={<span className="w-[200px]">충전 계좌 번호 *</span>}
          >
            <NumberInput
              className="max-w-[500px]"
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
              <Button className="w-[100px]" onClick={handleCertification}>
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
              placeholder="은행 선택"
              value={salesAccount.bank}
              onChange={(value) =>
                setSalesAccount({ ...salesAccount, bank: value })
              }
              options={[
                { label: "신한", value: "active" },
                { label: "국민", value: "inactive" },
              ]}
            />
          </DescriptionItem>
          <DescriptionItem
            label={<span className="w-[200px]">매출 계좌 번호 *</span>}
          >
            <NumberInput
              className="max-w-[500px]"
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
              <Button
                className="w-[100px]"
                onClick={() => setOpenDialog("certification")}
              >
                계좌 인증 하기
              </Button>
            </div>
          </DescriptionItem>
        </Descriptions>
      </div>

      <Button
        className="text-center mt-8 w-[400px] h-[50px] font-bold"
        variant="cancel"
        onClick={handleCertification}
      >
        ARS 인증
      </Button>
    </section>
  );
};

export default InfoSection;
