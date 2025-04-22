export type DialogStatus =
  | "request"
  | "resend"
  | "terminate"
  | "stop"
  | "resumption"
  | "cancel"
  | "confirm";

export type DialogContent = {
  status: DialogStatus;
  content: string | React.ReactNode;
};

export const dialogContent: Record<DialogStatus, DialogContent> = {
  request: {
    status: "request",
    content: (
      <span className="flex justify-center text-base font-bold">
        SM Pay 심사 요청을 하시겠습니까?
      </span>
    ),
  },
  resend: {
    status: "resend",
    content: (
      <span className="flex justify-center text-base font-bold">
        광고주의 동의 요청을 재발송 하시겠습니까?
      </span>
    ),
  },
  terminate: {
    status: "terminate",
    content: (
      <div className="flex flex-col items-center pb-4 font-medium">
        <span>SM Pay 서비스를 해지 하시겠습니까?</span>
        <span>
          해당 광고주는 미수금이 남아 있어, 미수금 회수 완료 후 해지 처리됩니다.
        </span>
      </div>
    ),
  },
  stop: {
    status: "stop",
    content: (
      <div className="flex flex-col items-center pb-4 font-medium">
        <span>SM Pay 서비스를 일시중지 하시겠습니까?</span>
        <span>
          해당 광고주는 미수금이 남아 있어, 미수금 회수 완료 후 해지 처리됩니다.
        </span>
      </div>
    ),
  },
  resumption: {
    status: "resumption",
    content: (
      <span className="flex justify-center text-base font-bold">
        SM Pay 서비스를 다시 시작하게 하시겠습니까?
      </span>
    ),
  },
  cancel: {
    status: "cancel",
    content: (
      <span className="flex justify-center text-base font-bold">
        SM Pay 신청을 취소하시겠습니까?
      </span>
    ),
  },
  confirm: {
    status: "confirm",
    content: (
      <span className="flex justify-center text-base font-bold">
        SM Pay 심사 요청이 완료하였습니다.
      </span>
    ),
  },
};
