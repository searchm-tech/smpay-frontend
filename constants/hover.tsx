import { HelpIcon, IconBadge } from "@/components/composite/icon-components";

export type HoverSMPayKey = "rule" | "prepayment";

export const HOVER_SMPAY: Record<HoverSMPayKey, string | React.ReactNode> = {
  rule: (
    <div className="flex items-start gap-2 bg-white">
      <HelpIcon />
      <span className="text-sm text-gray-700">
        매출계정은 판매정산 대금이 풀랫폼사로부터 입금되는 계좌, 또는 후불
        광고비에 대해 출금이 이루어질 광고주 명의의 계좌를 뜻합니다.
      </span>
    </div>
  ),
  prepayment: (
    <div className="flex items-start gap-2 bg-white">
      <HelpIcon />
      <span className="text-sm text-gray-700">
        충전계좌는 네이버 광고비 충전 전용 계좌를 뜻합니다.
      </span>
    </div>
  ),
};

export type HoverAdVerifyKey = "charge" | "sales";

export const HOVER_ADVERIFY: Record<
  HoverAdVerifyKey,
  string | React.ReactNode
> = {
  charge: (
    <div className="flex items-start gap-2 bg-white">
      <HelpIcon />
      <span className="text-sm text-gray-700">
        충전계좌는 네이버 광고비 충전 전용 계좌를 뜻합니다.
      </span>
    </div>
  ),
  sales: (
    <div className="flex items-start gap-2 bg-white">
      <HelpIcon />
      <span className="text-sm text-gray-700">
        매출계정은 판매정산 대금이 풀랫폼사로부터 입금되는 계좌, 또는 후불
        광고비에 대해 출금이 이루어질 광고주 명의의 계좌를 뜻합니다.
      </span>
    </div>
  ),
};

// 대행사 > 등록, 상세 - 대행사 고유코드 툴팁 아이콘
export const TOOLTIP_AGENCY_CODE = (
  <div className="flex items-start gap-2 bg-white">
    <HelpIcon />
    <span className="text-sm text-gray-700">
      대행사 전용 URL에 사용되는 고유값으로, 4~16자의 영문으로 이루어진 식별
      가능한 값을 입력해주세요.
    </span>
  </div>
);
