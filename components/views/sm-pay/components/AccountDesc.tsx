import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { HelpIcon } from "@/components/composite/icon-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { TooltipHover } from "@/components/composite/tooltip-components";

import { HOVER_SMPAY } from "@/constants/hover";

import type { SmPayData } from "@/types/sm-pay";

type AccountDescProps = {
  smPayData: SmPayData | null;
};

const AccountDesc = ({ smPayData }: AccountDescProps) => {
  if (!smPayData) return null;

  return (
    <section className="flex gap-2">
      <div className="w-1/2">
        <div className="flex items-center gap-2 py-2">
          <LabelBullet labelClassName="text-base font-bold">
            충전 계좌 정보
          </LabelBullet>
          <TooltipHover
            triggerContent={<HelpIcon />}
            content={HOVER_SMPAY["prepayment"]}
          />
        </div>

        <Descriptions columns={1}>
          <DescriptionItem label="충전 계좌 은행">
            {smPayData.chargeAccountBank}
          </DescriptionItem>
          <DescriptionItem label="충전 계좌 번호">
            {smPayData.chargeAccountNumber}
          </DescriptionItem>
          <DescriptionItem label="충전 계좌 예금주명">
            {smPayData.chargeAccountHolderName}
          </DescriptionItem>
        </Descriptions>
      </div>

      <div className="w-1/2">
        <div className="flex items-center gap-2 py-2">
          <LabelBullet labelClassName="text-base font-bold">
            매출 계좌 정보
          </LabelBullet>
          <TooltipHover
            triggerContent={<HelpIcon />}
            content={HOVER_SMPAY["rule"]}
          />
        </div>
        <Descriptions columns={1}>
          <DescriptionItem label="매출 계좌 은행">
            {smPayData.salesAccountBank}
          </DescriptionItem>
          <DescriptionItem label="매출 계좌 번호">
            {smPayData.salesAccountNumber}
          </DescriptionItem>
          <DescriptionItem label="매출 계좌 예금주명">
            {smPayData.salesAccountHolderName}
          </DescriptionItem>
        </Descriptions>
      </div>
    </section>
  );
};

export default AccountDesc;
