/**
 * sm-pay/management
 */
export type SMPayManageStatus =
  | "request"
  | "resend"
  | "terminate"
  | "stop"
  | "resumption"
  | "cancel"
  | "confirm"
  | "rerequset";

export const MANAGEMENT_CONTENT: Record<
  SMPayManageStatus,
  string | React.ReactNode
> = {
  request: (
    <span className="flex justify-center text-base font-bold">
      SM Pay 심사 요청을 하시겠습니까?
    </span>
  ),
  resend: (
    <span className="flex justify-center text-base font-bold">
      광고주의 동의 요청을 재발송 하시겠습니까?
    </span>
  ),
  terminate: (
    <div className="flex flex-col items-center pb-4 font-medium">
      <span>SM Pay 서비스를 해지 하시겠습니까?</span>
      <span>
        해당 광고주는 미수금이 남아 있어, 미수금 회수 완료 후 해지 처리됩니다.
      </span>
    </div>
  ),
  stop: (
    <div className="flex flex-col items-center pb-4 font-medium">
      <span>SM Pay 서비스를 일시중지 하시겠습니까?</span>
      <span>
        해당 광고주는 미수금이 남아 있어, 미수금 회수 완료 후 해지 처리됩니다.
      </span>
    </div>
  ),
  resumption: (
    <span className="flex justify-center text-base font-bold">
      SM Pay 서비스를 다시 시작하게 하시겠습니까?
    </span>
  ),
  cancel: (
    <span className="flex justify-center text-base font-bold">
      SM Pay 신청을 취소하시겠습니까?
    </span>
  ),
  confirm: (
    <span className="flex justify-center text-base font-bold">
      SM Pay 심사 요청이 완료하였습니다.
    </span>
  ),
  rerequset: (
    <span className="flex justify-center text-base font-bold">
      광고주의 동의 요청을 재발송 하시겠습니까?
    </span>
  ),
};

// sm-pay/apply-write

export type ApplyWriteModalStatus =
  | "req-update"
  | "res-update"
  | "send-success"
  | "disable-business-number"
  | "able-business-number";

export const ApplyWriteModal = {
  "req-update": (
    <div className="flex flex-col items-center pb-4 font-medium">
      <span>입력하신 정보로 광고주의 기본 정보가 업데이트 됩니다.</span>
      <span>변경하시겠습니까?</span>
    </div>
  ),
  "res-update": (
    <div className="flex flex-col items-center pb-4 font-medium">
      <span>광고주의 동의 요청이 완료되었습니다.</span>
    </div>
  ),
  "send-success": (
    <div className="flex flex-col items-center pb-4 font-medium">
      <span>광고주의 이메일과 SMS 동의요청이 발송되었습니다.</span>
    </div>
  ),
  "disable-business-number": (
    <div className="flex flex-col items-center pb-4 font-medium">
      <span>중복된 사업자등록번호입니다.</span>
    </div>
  ),
  "able-business-number": (
    <div className="flex flex-col items-center pb-4 font-medium">
      <span>사용가능한 사업자등록번호입니다.</span>
    </div>
  ),
};

// sm-pay/apply-submit
export type ApplySubmitDialogStatus = "req-apply" | "success-apply";

export const APPLY_SUBMIT_CONTENT: Record<
  ApplySubmitDialogStatus,
  React.ReactNode | string
> = {
  "req-apply": (
    <div className="flex flex-col items-center pb-4 font-medium">
      <span>SM Pay 심사 요청을 하시겠습니까?</span>
    </div>
  ),
  "success-apply": (
    <div className="flex flex-col items-center pb-4 font-medium">
      <span>SM Pay 심사 요청이 완료하였습니다.</span>
    </div>
  ),
};

// advertiser-verification
export type AdVerifyDialogStatus = "certification" | "submit"; // submit : 광고주 이메일 sms 동의 요청 발송 message, certification : 계좌 인증 완료

export const ADVERIFY_DIALOG_CONTENT: Record<
  AdVerifyDialogStatus,
  React.ReactNode
> = {
  certification: (
    <div className="flex flex-col items-center pb-4 font-medium">
      <p>계좌 인증이 완료 되었습니다.</p>
    </div>
  ),
  submit: (
    <div className="flex flex-col items-center pb-4 font-medium">
      <p>제출이 완료되었습니다.</p>
      <p>SM Pay 서비스를 신청해주셔서 감사합니다.</p>
    </div>
  ),
};
