import dayjs from "dayjs";
import parse from "html-react-parser";

import {
  ConfirmDialog,
  Modal,
  type ModalProps,
} from "@/components/composite/modal-components";
import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";

import { useSmPayRejectReason, useSmPayStopInfo } from "@/hooks/queries/sm-pay";

// reject
type PropsRejectDialog = {
  id: string;
  onClose: () => void;
  onConfirm: () => void;
};
// TODO : 공용???
const RejectDialog = ({ onClose, onConfirm, id }: PropsRejectDialog) => {
  const { data: rejectReason } = useSmPayRejectReason(id);

  const data = {
    date: dayjs(new Date().toISOString().slice(0, 10)).format("YYYY-MM-DD"),
    reason: (
      <div>
        <p>ROAS 평균값은 심사 기준치를 충족하지만</p>
        <p>
          ROAS의 변동폭이 너무 커서 선충전으로 결제를 해도 제대로 된 효율을 내기
          힘들 것 같습니다.
        </p>
      </div>
    ),
  };

  return (
    <Modal
      open
      onClose={onClose}
      onConfirm={onConfirm}
      title="심사 반려"
      confirmText="상세보기"
      cancelText="닫기"
    >
      <div className="min-w-[900px]">
        <p>다음과 같은 사유로 SM Pay 서비스 심사를 반려되었습니다.</p>
        <div className="mt-4 rounded-md bg-white">
          <Descriptions columns={1}>
            <DescriptionItem label="심사 변리 일시">
              {data.date}
            </DescriptionItem>
            <DescriptionItem label="심사자">최상위 그룹장</DescriptionItem>
            <DescriptionItem label="반려 사유">
              {parse(rejectReason.data)}
            </DescriptionItem>
          </Descriptions>
        </div>
      </div>
    </Modal>
  );
};

// application_cancel
type PropsApplyCancelDialog = {
  onClose: () => void;
  onConfirm: () => void;
};
const ApplyCancelDialog = ({ onClose, onConfirm }: PropsApplyCancelDialog) => {
  const handleConfirm = () => {
    console.log("apply cancel");
    onConfirm();
  };
  return (
    <ConfirmDialog
      open
      onClose={onClose}
      onConfirm={handleConfirm}
      content={
        <div className="flex flex-col items-center pb-4 font-medium">
          <span>SM Pay 신청을 취소하시겠습니까?</span>
        </div>
      }
    />
  );
};

// reapply
type PropsReapplyDialog = {
  onClose: () => void;
  onConfirm: () => void;
};

const ReapplyDialog = ({ onClose, onConfirm }: PropsReapplyDialog) => {
  const handleConfirm = () => {
    console.log("reapply");
    onConfirm();
  };
  return (
    <ConfirmDialog
      open
      onClose={onClose}
      onConfirm={handleConfirm}
      content={
        <div className="flex flex-col items-center pb-4 font-medium">
          <span>기존 신청내역은 수정할 수 없습니다.</span>
          <span>새로 작성하여 다시 신청하시겠습니까?</span>
        </div>
      }
    />
  );
};

type PropsAdvertiserAgreementSendDialog = {
  onClose: () => void;
  onConfirm: () => void;
  id: string;
};

const AdvertiserAgreementSendDialog = ({
  onClose,
  onConfirm,
  id,
}: PropsAdvertiserAgreementSendDialog) => {
  const handleConfirm = () => {
    console.log("advertiser agreement send");
    onConfirm();
  };
  return (
    <ConfirmDialog
      open
      onClose={onClose}
      onConfirm={handleConfirm}
      content={
        <div className="flex flex-col items-center pb-4 font-medium">
          <span>광고주에게 SM Pay 동의 요청을 전송하시겠습니까?</span>
        </div>
      }
    />
  );
};

// suspend
type PropsSuspendDialog = {
  onClose: () => void;
  onConfirm: () => void;
};

const SuspendDialog = ({ onClose, onConfirm }: PropsSuspendDialog) => {
  const handleConfirm = () => {
    console.log("suspend");
    onConfirm();
  };
  return (
    <ConfirmDialog
      open
      onClose={onClose}
      onConfirm={handleConfirm}
      content={
        <div className="flex flex-col items-center pb-4 font-medium">
          <span>SM Pay 서비스를 일시중지 하시겠습니까?</span>
          <span>나중에 언제든지 다시 제개할 수 있습니다.</span>
        </div>
      }
    />
  );
};

// resume
type PropsResumeDialog = {
  onClose: () => void;
  onConfirm: () => void;
  id: string;
};

const ResumeDialog = ({ onClose, onConfirm, id }: PropsResumeDialog) => {
  const handleConfirm = () => {
    console.log("resume");
    onConfirm();
  };

  if (Number(id) % 2 === 0) {
    return (
      <ConfirmDialog
        open
        onConfirm={onClose}
        cancelDisabled
        content={
          <div className="flex flex-col items-center pb-4 font-medium">
            <p className="mb-2">미수금이 있어 재개할 수 없습니다.</p>
            <p>해당 광고주는 미수금이 남아 있어 서비스재개가 불가능합니다.</p>
            <p>미수금 회수 후 다시 시도해주세요.</p>
          </div>
        }
      />
    );
  }

  return (
    <ConfirmDialog
      open
      onClose={onClose}
      onConfirm={handleConfirm}
      content={
        <div className="flex flex-col items-center pb-4 font-medium">
          <span>SM Pay 서비스를 다시 시작하겠습니까?</span>
        </div>
      }
    />
  );
};

// termination_request
type PropsTerminationRequestDialog = {
  onClose: () => void;
  onConfirm: () => void;
  id: string;
};

const TerminationRequestDialog = ({
  onClose,
  onConfirm,
  id,
}: PropsTerminationRequestDialog) => {
  const handleConfirm = () => {
    console.log("termination request");
    onConfirm();
  };

  if (Number(id) % 2 === 0) {
    return (
      <ConfirmDialog
        open
        onConfirm={handleConfirm}
        onClose={onClose}
        content={
          <div className="flex flex-col items-center pb-4 font-medium">
            <p className="mb-2">SM Pay 서비스를 해지 신청하시겠습니까?</p>
            <p>해당 광고주는 미수금이 남아 있어</p>
            <p>미수금 회수 완료 후 해지 처리됩니다.</p>
          </div>
        }
      />
    );
  }

  return (
    <ConfirmDialog
      open
      onClose={onClose}
      onConfirm={handleConfirm}
      content={
        <div className="flex flex-col items-center pb-4 font-medium">
          <span>SM Pay 서비스를 해지하시겠습니까?</span>
        </div>
      }
    />
  );
};

// resend
type PropsResendDialog = {
  onClose: () => void;
  onConfirm: () => void;
};

const ResendDialog = ({ onClose, onConfirm }: PropsResendDialog) => {
  const handleConfirm = () => {
    console.log("resend");
    onConfirm();
  };
  return (
    <ConfirmDialog
      open
      onClose={onClose}
      onConfirm={handleConfirm}
      content={
        <div className="flex flex-col items-center pb-4 font-medium">
          <span>광고주 동의 요청을 재발송 하시겠습니까?</span>
        </div>
      }
    />
  );
};

interface StopInfoModalProps extends ModalProps {
  id: string;
}

// TODO : 공용???
const StopInfoModal = ({
  open = false,
  onClose,
  onConfirm,
  id,
}: StopInfoModalProps) => {
  const { data: stopInfo } = useSmPayStopInfo(id);

  return (
    <Modal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="광고주 상태 일시중지"
      confirmText="상세보기"
      cancelText="취소"
    >
      <div className="min-w-[900px]">
        <p>다음과 같은 사유로 일시중지되었습니다.</p>
        <div className="mt-4 rounded-md bg-white">
          <Descriptions columns={1}>
            <DescriptionItem label="일시중지 일시">
              {stopInfo.data.date}
            </DescriptionItem>
            <DescriptionItem label="일시중지 사유">
              {stopInfo.data.reason}
            </DescriptionItem>
          </Descriptions>
        </div>
      </div>
    </Modal>
  );
};

export {
  RejectDialog,
  ApplyCancelDialog,
  ReapplyDialog,
  AdvertiserAgreementSendDialog,
  SuspendDialog,
  ResumeDialog,
  TerminationRequestDialog,
  ResendDialog,
  StopInfoModal,
};
