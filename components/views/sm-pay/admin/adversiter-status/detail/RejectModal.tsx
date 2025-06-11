import parse from "html-react-parser";

import { DescriptionItem } from "@/components/composite/description-components";
import { Descriptions } from "@/components/composite/description-components";
import { Modal } from "@/components/composite/modal-components";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const RejectModal = ({ open, onClose, onConfirm }: Props) => {
  return (
    <Modal
      open={open}
      title="심사 반려"
      onClose={onClose}
      onConfirm={onConfirm}
      confirmText="확인"
      cancelText="닫기"
    >
      <div className="w-[60vw]">
        <p>다음과 같은 사유로 일시중지되었습니다.</p>
        <div className="mt-4 rounded-md bg-white">
          <Descriptions columns={1}>
            <DescriptionItem label="심사 반려 일시">
              2024-01-01 12:00:00
            </DescriptionItem>
            <DescriptionItem label="심사자">최상위 그룹장명</DescriptionItem>
            <DescriptionItem label="반려 사유">
              <div>
                {parse(`<div>
                <p>반려 사유</p>
                <p>반려 사유</p>
                </div>`)}
              </div>
            </DescriptionItem>
          </Descriptions>
        </div>
      </div>
    </Modal>
  );
};

export default RejectModal;
