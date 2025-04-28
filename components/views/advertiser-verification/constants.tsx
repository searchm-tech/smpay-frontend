import { IconBadge } from "@/components/composite/icon-components";
import type { AccountInfo, AgreementInfo } from "@/types/vertification";

export const DEFAULT_ACCOUNT_INFO: AccountInfo = {
  bank: "",
  accountNumber: "",
  accountHolder: "",
  isCertified: false,
};

export const DEFAULT_AGREEMENT_INFO: AgreementInfo = {
  agreePrivacy: false,
  agreeService: false,
};

export type HoverData = {
  triggerContent: React.ReactNode;
  content: React.ReactNode;
};
export type HoverDataKey = "charge" | "sales";

export const hoverData: Record<HoverDataKey, HoverData> = {
  charge: {
    triggerContent: (
      <IconBadge
        name="CircleHelp"
        bgColor="#F6BE2C"
        className="cursor-pointer"
      />
    ),
    content: (
      <div className="flex flex-start gap-2">
        <IconBadge name="CircleHelp" bgColor="#F6BE2C" className="mt-0.5" />
        <span className="text-base">
          충전계좌는 네이버 광고비 충전 전용 계좌를 뜻합니다.
        </span>
      </div>
    ),
  },
  sales: {
    triggerContent: (
      <IconBadge
        name="CircleHelp"
        bgColor="#F6BE2C"
        className="cursor-pointer"
      />
    ),
    content: (
      <div className="flex flex-start gap-2">
        <IconBadge name="CircleHelp" bgColor="#F6BE2C" className="mt-0.5" />
        <span className="text-base">
          매출계좌는 판매정산 대금이 플랫폼사로부터 입금되는 계좌, 또는 후불
          광고비에 대해 출금이 이루어질 광고주 명의의 계좌를 뜻합니다.
        </span>
      </div>
    ),
  },
};

// certification : 계좌 인증 완료
// submit : 광고주 이메일 sms 동의 요청 발송 message
export type DialogStatus = "certification" | "submit";

export type DialogContent = {
  status: DialogStatus;
  content: string | React.ReactNode;
};

export const dialogContent: Record<DialogStatus, DialogContent> = {
  certification: {
    status: "certification",
    content: (
      <div className="flex flex-col items-center pb-4 font-medium">
        <p>계좌 인증이 완료 되었습니다.</p>
      </div>
    ),
  },
  submit: {
    status: "submit",
    content: (
      <div className="flex flex-col items-center pb-4 font-medium">
        <p>제출이 완료되었습니다.</p>
        <p>SM Pay 서비스를 신청해주셔서 감사합니다.</p>
      </div>
    ),
  },
};

export const TEST_BANK_OPTIONS = [
  { label: "농협", value: "088" },
  { label: "국민", value: "081" },
  { label: "농협", value: "082" },
  { label: "국민", value: "083" },
];
