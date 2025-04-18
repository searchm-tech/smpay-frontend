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
      <div className="flex items-start gap-2 bg-white">
        <IconBadge
          name="CircleHelp"
          bgColor="#F6BE2C"
          className="cursor-pointer shrink-0 mt-0.5"
        />
        <p className="text-sm text-gray-700">
          매출계정는 판매정산 대금이 풀랫폼사로부터 입금되는 계좌, 또는 후불
          광고비에 대해 출금이 이루어질 광고주 명의의 계좌를 뜻합니다.
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
      <div className="flex items-start gap-2 bg-white">
        <IconBadge
          name="CircleHelp"
          bgColor="#F6BE2C"
          className="cursor-pointer shrink-0 mt-0.5"
        />
        <p className="text-sm text-gray-700">
          충전계좌는 네이버 광고비 충전 전용 계좌를 뜻합니다.
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
