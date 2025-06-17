import { useState } from "react";
import { Modal } from "@/components/composite/modal-components";

type ApproveModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

const ApproveModal = ({ onClose, onConfirm }: ApproveModalProps) => {
  const [isConfirm, setIsConfirm] = useState(false);

  const handleConfirm = () => {
    console.log("승인 처리 클릭");
    setIsConfirm(true);
  };

  if (!isConfirm) {
    return (
      <Modal
        onClose={onClose}
        onConfirm={handleConfirm}
        title="광고주 심사 승인"
      >
        <div>
          <p className="mb-2">광고주의 SM Pay 신청을 승인처리하겠습니까?</p>
          <p>심사 결과는 대행사 담당자에게 이메일로 발송됩니다.</p>
          <p>
            승인된 심사 결과는 SM Pay에서 최종 검토되며, 검토 완료 후 광고주가
            인증하면 <br />
            SM Pay운영이 시작됩니다.
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      onClose={onClose}
      onConfirm={onConfirm}
      title="광고주 심사 승인"
      confirmText="승인 처리"
      cancelText="취소"
    >
      <div>광고주의 SM Pay 신청이 승인되었습니다.</div>
    </Modal>
  );
};

export default ApproveModal;
