import { HelpIcon } from "@/components/composite/icon-components";

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

// --- 최종 본 ---

export type TooltipContentKey = "advertiserName" | "status";
export const TOOLTIP_CONTENT: Record<
  TooltipContentKey,
  string | React.ReactNode
> = {
  advertiserName: (
    <div className="flex items-start gap-2 bg-white">
      <HelpIcon />
      <span className="text-sm text-gray-700">
        광고주명을 클릭하면 광고주의 개별 충전 회수 이력 조회 화면으로
        이동합니다.
      </span>
    </div>
  ),
  status: (
    <div className="flex items-start gap-2 bg-white">
      <HelpIcon />

      <div className="flex flex-col gap-2 font-normal text-sm text-gray-700">
        <div>
          <p>1. 심사 및 검토 단계</p>
          <p>
            • 심사 대기 : 대행사 담당자가 신청서를 최상위 그룹장에게 제출한 상태
          </p>
          <p>
            • 심사 반려 : 최상위 그룹장이 심사를 거절한 상태(재심사 불가, 신규
            신청 가능)
          </p>
          <p>• 운영 검토 대기 : 최상위 그룹장이 심사 결과를 승인한 상태</p>
          <p>• 운영 검토 반려 : 최상위 그룹장이 운영 결과를 반려한 상태</p>
          <p>
            • 운영 검토 완료 : 관리자가 검토를 완료한 상태 (광고주 동의 요청
            필요)
          </p>
        </div>
        <div>
          <p>2. 광고주 동의 단계</p>
          <p>
            • 광고주 동의 대기 : 광고주에게 출금 및 정보 활용 동의를 요청한 상태
          </p>
          <p>
            • 광고주 동의 기한 만료 : 7일 내 동의하지 않아 기한이 만료된 상태
            (재발송 가능)
          </p>
        </div>
        <div>
          <p>3. 신청 관련 상태</p>
          <p>• 신청 취소 : 대행사 담당자가 서비스 신청을 취소한 상태</p>
          <p>• 출금계좌 등록 실패 : 광고주의 계좌 등록이 실패한 상태</p>
        </div>
        <div>
          <p>4. 운영 및 중단 상태</p>
          <p>• 운영 중 : SM Pay 서비스가 정상 운영 중인 상태</p>
          <p>
            • 일시중지 : 3회 이상 회수 실패, 대행사 담당자가 일시중지 처리(재개
            가능)
          </p>
          <p>• 해지 대기 : 해지를 신청했으나 미수금 회수 중인 상태</p>
          <p>• 해지 : 서비스가 해지된 상태</p>
        </div>
      </div>
    </div>
  ),
};
