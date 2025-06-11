import { Modal } from "@/components/composite/modal-components";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const CompleteModal = ({ open, onClose, onConfirm }: Props) => {
  return (
    <Modal
      open={open}
      title="운영 검토 완료"
      onClose={onClose}
      onConfirm={onConfirm}
      confirmText="운영 검토 완료 처리"
    >
      <div className="w-[60vw]">
        <p className="mb-4">운영 검토를 완료하시겠습니까?</p>
        <p>
          검토 결과는 대행사 담당자와 최상위 그룹장에게 이메일로 발송됩니다.
        </p>
        <p>검토 완료 후 광고주가 인증하면 SM Pay 운영이 시작됩니다.</p>
      </div>
    </Modal>
  );
};

export default CompleteModal;
