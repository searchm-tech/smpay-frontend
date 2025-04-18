import { IconBadge } from "@/components/composite/icon-components";

export type HoverData = {
  triggerContent: React.ReactNode;
  content: React.ReactNode;
};
export type HoverDataKey = "rule" | "prepayment";

export const hoverData: Record<HoverDataKey, HoverData> = {
  rule: {
    triggerContent: (
      <IconBadge
        name="CircleHelp"
        bgColor="#F6BE2C"
        className="cursor-pointer"
      />
    ),
    content: (
      <div className="flex flex-start gap-2">
        <IconBadge
          name="CircleHelp"
          bgColor="#F6BE2C"
          className="cursor-pointer mt-1"
        />
        <p>
          입력된 ROAS를 기준으로, 기준 이상이면 충전 금액을 증액하고, 기준
          미만이면 감액합니다
        </p>
      </div>
    ),
  },
  prepayment: {
    triggerContent: (
      <IconBadge
        name="CircleHelp"
        bgColor="#F6BE2C"
        className="cursor-pointer"
      />
    ),
    content: (
      <div className="flex flex-start gap-2">
        <IconBadge
          name="CircleHelp"
          bgColor="#F6BE2C"
          className="cursor-pointer mt-1"
        />
        <p>
          입력한 최초 충전 금액을 기준으로 충전 금액을 자동으로 증액하거나
          감액하며, 일 최대 예산을 초과하여 충전하지 않습니다.
        </p>
      </div>
    ),
  },
};

// confirm : 광고주 정보 업데이트 confirm
// send : 광고주 이메일 sms 동의 요청 발송 message
export type DialogStatus = "confirm" | "send";

export type DialogContent = {
  status: DialogStatus;
  content: string | React.ReactNode;
};

export const dialogContent: Record<DialogStatus, DialogContent> = {
  confirm: {
    status: "confirm",
    content: (
      <div className="flex flex-col items-center pb-4 font-medium">
        <p>입력하신 정보로 광고주의 기본 정보가 업데이트 됩니다.</p>
        <p>변경하시겠습니까?</p>
      </div>
    ),
  },
  send: {
    status: "send",
    content: (
      <div className="flex flex-col items-center pb-4 font-medium">
        <p>광고주의 이메일과 SMS 동의요청이 발송되었습니다.</p>
      </div>
    ),
  },
};
