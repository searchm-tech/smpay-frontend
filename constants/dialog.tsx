import { ActionButton } from "@/types/sm-pay";

export const MANAGEMENT_CONTENT: Record<
  ActionButton,
  string | React.ReactNode
> = {
  view: <></>,
  application_cancel: (
    <div className="flex flex-col items-center pb-4 font-medium">
      <span>SM Pay 신청을 취소하시겠습니까?</span>
    </div>
  ),
  reapply: (
    <div className="flex flex-col items-center pb-4 font-medium">
      <span>기존 신청내역은 수정할 수 없습니다.</span>
      <span>새로 작성하여 다시 신청하시겠습니까?</span>
      {/* 확인 클릭 시 해당 광고주 신청서작성(E0231) 페이지 이동 */}
    </div>
  ),
  advertiser_agreement_send: (
    <div className="flex flex-col items-center pb-4 font-medium">
      <span>광고주에게 SM Pay 동의 요청을 전송하시겠습니까?</span>
    </div>
  ),
  suspend: (
    <div className="flex flex-col items-center pb-4 font-medium">
      <span>SM Pay 서비스를 일시중지 하시겠습니까?</span>
      <span>나중에 언제든지 다시 제개할 수 있습니다.</span>
    </div>
  ),
  termination_request: (
    <div className="flex flex-col items-center pb-4 font-medium">
      <span>SM Pay 서비스를 해지 신청하시겠습니까?</span>
      {/* 
      미수급이 있을 경우
      <span>
        해당 광고주는 미수금이 남아 있어, 미수금 회수 완료 후 해지 처리됩니다.
      </span> */}
    </div>
  ),
  resume: (
    <div className="flex flex-col items-center pb-4 font-medium">
      <span>SM Pay 서비스를 다시 시작하겠습니까?</span>
    </div>
  ),
  resend: (
    <div className="flex flex-col items-center pb-4 font-medium">
      <span>광고주 동의 요청을 재발송 하시겠습니까?</span>
    </div>
  ),
};

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
