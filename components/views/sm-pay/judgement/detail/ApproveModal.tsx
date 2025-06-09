import { Modal } from "@/components/composite/modal-components";

type ApproveModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ApproveModal = ({ open, onClose, onConfirm }: ApproveModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="광고주 심사 승인"
      onConfirm={onConfirm}
    >
      <div>광고주의 SM Pay 신청이 승인되었습니다.</div>
    </Modal>
  );
};

export default ApproveModal;
