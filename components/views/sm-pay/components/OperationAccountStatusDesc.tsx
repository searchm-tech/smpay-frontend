import { Label } from "@/components/ui/label";
import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { HelpIcon } from "@/components/composite/icon-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { TooltipHover } from "@/components/composite/tooltip-components";
import { HOVER_SMPAY } from "@/constants/hover";

type StatusInfo = {
  status: string;
  statusLabel: string;
};

type Props = {
  statusInfo?: StatusInfo;
};

const OperationAccountStatusDesc = ({ statusInfo }: Props) => {
  return (
    <section>
      <div className="flex items-center gap-4 py-2">
        <LabelBullet labelClassName="text-base font-bold">
          SM Pay 운영 계좌 현황
        </LabelBullet>
        <TooltipHover
          triggerContent={<HelpIcon />}
          content={HOVER_SMPAY["rule"]}
        />
      </div>

      <Descriptions columns={1} styles={{ label: { width: 250 } }}>
        <DescriptionItem label="현재 운영 잔액">
          <div className="flex items-center gap-2">
            <Label className="w-1/2">
              {Number("5000000").toLocaleString()}원
            </Label>
            <SubDescText>
              SM Pay 총 운영 가능 잔액 (2025년 5월 28일 AM06:00시 기준)
            </SubDescText>
          </div>
        </DescriptionItem>
        <DescriptionItem label="현재일 소진 금액">
          <div className="flex items-center gap-2">
            <Label className="w-1/2">
              {Number("1250000").toLocaleString()}원
            </Label>
            <SubDescText>
              현재 운영 중인 광고주의 총 데일리 소진 금액 합산
            </SubDescText>
          </div>
        </DescriptionItem>
        <DescriptionItem label="승인 시 예상 일 소진 금액">
          <div className="flex items-center gap-2">
            <Label className="w-1/2">
              +{Number("350000").toLocaleString()}원
            </Label>
            <SubDescText>
              현재 광고주 승인 시 추가로 예상되는 데일리 소진 금액
            </SubDescText>
          </div>
        </DescriptionItem>
        <DescriptionItem label="예상 일 소진 기준 운영 가능 일수">
          <div className="flex items-center gap-2">
            <Label className="w-1/2">약 3.1일</Label>
            <SubDescText>
              현재 운영 잔액 ÷ 예상 총 일 소진 금액 (소수점 1자리까지 표기)
            </SubDescText>
          </div>
        </DescriptionItem>
      </Descriptions>
    </section>
  );
};

export default OperationAccountStatusDesc;

type SubDescTextProps = {
  children: React.ReactNode;
};

export const SubDescText = ({ children }: SubDescTextProps) => {
  return (
    <span className="w-1/2 text-sm text-red-500 font-bold">* {children}</span>
  );
};
