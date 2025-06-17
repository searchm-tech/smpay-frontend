import { HelpIcon } from "@/components/composite/icon-components";

export type HoverSMPayKey = "prepayment";

export const HOVER_SMPAY: Record<HoverSMPayKey, string | React.ReactNode> = {
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

export type TooltipContentKey =
  | "advertiserName"
  | "status"
  | "info_change"
  | "charge_rule_setting"
  | "prepayment_schedule_setting"
  | "operation_account_status"
  | "judge_reference_memo"
  | "operation_reference_memo"
  | "charge_account"
  | "sales_account"
  | "advertiser_performance";
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
  info_change: (
    <div className="flex items-start gap-2 bg-white">
      <HelpIcon />
      <div className="flex flex-col gap-2 font-normal text-sm text-gray-700">
        <p>
          광고주 정보가 등록되지 않은 경우 &quot;정보 등록&quot;버튼이 노출되며,
          정보를 등록해야 신청이 가능합니다.
        </p>

        <br />
        <p>
          광고주 정보가 등록된 경우에는 &quot;정보 변경&quot; 버튼 통해 수정할
          수 있습니다.
        </p>
      </div>
    </div>
  ),
  charge_rule_setting: (
    <div className="flex items-start gap-2 bg-white">
      <HelpIcon />
      <div className="flex flex-col gap-2 font-normal text-sm text-gray-700">
        <p>설정한 기준 ROAS를 기준으로 충전 금액을 자동 조정하는 규칙입니다.</p>

        <p>
          기준 이상일 경우 증액, 미만일 경우 감액 처리되며, 정률 또는 정액 방식
          중 선택할 수 있습니다.
        </p>

        <p>
          설정한 규칙이 실제로 어떻게 적용되는지는 [광고 성과 예측
          시뮬레이션]기능을 참고해 주세요.
        </p>
      </div>
    </div>
  ),
  prepayment_schedule_setting: (
    <div className="flex items-start gap-2 bg-white">
      <HelpIcon />

      <p className="font-normal text-sm text-gray-700">
        입력한 최초 충전 금액을 기준으로 충전 금액을 자동으로 증액하거나
        감액하며, 일 최대 예산을 초과하여 충전하지 않습니다.
      </p>
    </div>
  ),
  operation_account_status: (
    <div className="flex items-start gap-2 bg-white">
      <HelpIcon />
      <p className="font-normal text-sm text-gray-700">내용 없음</p>
    </div>
  ),

  judge_reference_memo: (
    <div className="flex items-start gap-2 bg-white">
      <HelpIcon />
      <p className="font-normal text-sm text-gray-700">
        심사자가 참고해야 할 사항을 입력해주세요. <br />
        (예: 선결제 필요 사유, 광고주와 논의된 조건이나 특이사항 등)
      </p>
    </div>
  ),

  operation_reference_memo: (
    <div className="flex items-start gap-2 bg-white">
      <HelpIcon />
      <p className="font-normal text-sm text-gray-700">
        SM Pay가 최종적으로 운영 검토 시 참고해야 할 사항을 입력해주세요.
      </p>
    </div>
  ),
  charge_account: (
    <div className="flex items-start gap-2 bg-white">
      <HelpIcon />
      <span className="text-sm text-gray-700">
        충전계좌는 네이버 광고비 충전 전용 계좌를 뜻합니다.
      </span>
    </div>
  ),

  sales_account: (
    <div className="flex items-start gap-2 bg-white">
      <HelpIcon />
      <span className="text-sm text-gray-700">
        매출계좌는 판매정산 대금이 플랫폼사로부터 입금되는 계좌, 또는 후불
        광고비에 대해 출금이 이루어질 광고주 명의의 계좌를 뜻합니다.
      </span>
    </div>
  ),

  advertiser_performance: (
    <div className="flex items-start gap-2 bg-white">
      <HelpIcon />
      <div className="flex flex-col gap-2 font-normal text-sm text-gray-700">
        <p>
          광고 성과 및 회수 가능성 등을 종합적으로 고려할 수 있도록 제공되는
          참고용 심사 지표입니다.
        </p>
        <p>신청 및 승인 여부 결정 시 참고 해 주세요.</p>
        <p>
          <span>
            운영 기간은 개월 단위로 계산되며, 일 단위는 절사되며, 1개월은 28일로
            간주합니다.
          </span>
          <span>예: 1개월 3일 → 1개월로 간주</span>
        </p>
      </div>
    </div>
  ),
};
