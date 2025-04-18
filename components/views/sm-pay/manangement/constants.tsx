export type DialogStatus =
  | 'request'
  | 'resend'
  | 'terminate'
  | 'stop'
  | 'resumption'
  | 'cancel'
  | 'confirm';

export type DialogContent = {
  status: DialogStatus;
  content: string | React.ReactNode;
};

export const dialogContent: Record<DialogStatus, DialogContent> = {
  request: {
    status: 'request',
    content: (
      <div className="flex flex-col items-center pb-4 font-medium">
        <p>SM Pay 심사 요청을 하시겠습니까?</p>
      </div>
    ),
  },
  resend: {
    status: 'resend',
    content: (
      <div className="flex flex-col items-center pb-4 font-medium">
        <p>광고주의 동의 요청을 재발송 하시겠습니까?</p>
      </div>
    ),
  },
  terminate: {
    status: 'terminate',
    content: (
      <div className="flex flex-col items-center pb-4 font-medium">
        <p>SM Pay 서비스를 해지 하시겠습니까?</p>
        <p>해당 광고주는 미수금이 남아 있어, 미수금 회수 완료 후 해지 처리됩니다.</p>
      </div>
    ),
  },
  stop: {
    status: 'stop',
    content: (
      <div className="flex flex-col items-center pb-4 font-medium">
        <p>SM Pay 서비스를 일시중지 하시겠습니까?</p>
        <p>해당 광고주는 미수금이 남아 있어, 미수금 회수 완료 후 해지 처리됩니다.</p>
      </div>
    ),
  },
  resumption: {
    status: 'resumption',
    content: (
      <div className="flex flex-col items-center pb-4 font-medium">
        <p>SM Pay 서비스를 다시 시작하게 하시겠습니까?</p>
      </div>
    ),
  },
  cancel: {
    status: 'cancel',
    content: (
      <div className="flex flex-col items-center pb-4 font-medium">
        <p>SM Pay 신청을 취소하시겠습니까?</p>
      </div>
    ),
  },
  confirm: {
    status: 'confirm',
    content: (
      <div className="flex flex-col items-center pb-4 font-medium">
        <p>SM Pay 심사 요청이 완료하였습니다.</p>
      </div>
    ),
  },
};
