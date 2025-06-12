import { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/composite/modal-components";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";

type RejectSendModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const RejectSendModal = ({
  open,
  onClose,
  onConfirm,
}: RejectSendModalProps) => {
  const [rejectReason, setRejectReason] = useState("");

  return (
    <Modal
      open={open}
      title="광고주 심사 취소"
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <div className="w-[550px]">
        <p className="pb-4">광고주의 SM Pay 신청이 반려되었습니다.</p>
        <Descriptions columns={1}>
          <DescriptionItem label="반려 사유 입력">
            <Textarea
              rows={8}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </DescriptionItem>
        </Descriptions>
      </div>
    </Modal>
  );
};

export default RejectSendModal;
