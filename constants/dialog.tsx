import { ActionButton } from "@/types/sm-pay";

// sm-pay/apply-write

export type ApplyWriteModalStatus =
  | "req-update"
  | "res-update"
  | "send-success";

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
      <span>심사 요청이 완료되었습니다.</span>
      <div className="mt-4">
        <p>담장자와 최상위 그룹장에게 심사요청 안내메일이 발송되었습니다.</p>
      </div>
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
