import { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/composite/modal-components";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";

type RejectSendModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

const RejectSendModal = ({ onClose, onConfirm }: RejectSendModalProps) => {
  const [rejectReason, setRejectReason] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);

  const handleConfirm = () => {
    console.log("반려 처리 클릭");
    setIsConfirm(true);
  };

  if (isConfirm) {
    return (
      <Modal
        open
        onClose={onClose}
        onConfirm={onConfirm}
        title="광고주 심사 취소"
      >
        <div>광고주의 SM Pay 신청이 반려되었습니다.</div>
      </Modal>
    );
  }

  return (
    <Modal
      open
      title="광고주 심사 취소"
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <div className="w-[800px]">
        <div className="mb-4">
          <p className="pb-4">광고주의 SM Pay 신청이 반려되었습니다.</p>
          <p>반려 사유를 입력해주세요.</p>
          <p>
            입력한 내용은 담당자가 확인할 수 있으며, 재신청 시 참고 자료로
            활용됩니다.
          </p>
        </div>

        <Descriptions columns={1}>
          <DescriptionItem label="반려 사유 입력">
            <div className="p-2">
              <Textarea
                rows={4}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
          </DescriptionItem>
        </Descriptions>
      </div>
    </Modal>
  );
};

export default RejectSendModal;
