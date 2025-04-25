import { ActionButton } from "@/types/sm-pay";

import { SmPayStatus } from "@/types/sm-pay";

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

export const statusActions: Record<SmPayStatus, ActionButton[]> = {
  ADVERTISER_AGREEMENT_REQUEST: ["view"],
  ADVERTISER_DISAGREED: ["view", "cancel"],
  ADVERTISER_AGREEMENT_EXPIRED: ["view", "cancel", "resend"],
  ADVERTISER_AGREEMENT_COMPLETED: ["view", "cancel", "request"],
  REVIEW_PENDING: ["view"],
  REVIEW_APPROVED: ["view", "stop", "terminate"],
  REJECTED: ["view"],
  SUSPENDED: ["view", "terminate", "resume"],
  TERMINATION_IN_PROGRESS: [],
  TERMINATED: [],
};

export const statusLabels: Record<SmPayStatus, string> = {
  ADVERTISER_AGREEMENT_REQUEST: "광고주 동의 요청",
  ADVERTISER_DISAGREED: "광고주 미동의",
  ADVERTISER_AGREEMENT_EXPIRED: "광고주 동의기한 만료",
  ADVERTISER_AGREEMENT_COMPLETED: "광고주 동의 완료",
  REVIEW_PENDING: "심사 대기",
  REVIEW_APPROVED: "심사 승인",
  REJECTED: "반려",
  SUSPENDED: "일시중지",
  TERMINATION_IN_PROGRESS: "해지 신청 진행",
  TERMINATED: "해지",
};
