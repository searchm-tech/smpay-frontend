import dayjs from "dayjs";

import {
  Modal,
  type ModalProps,
} from "@/components/composite/modal-components";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";

export const TEMP_DATE = new Date().toISOString().slice(0, 10);

const data = {
  date: dayjs(TEMP_DATE).format("YYYY-MM-DD"),
  reason: "관리 권한 해제  / 관리자 중단",
};

const StopInfoModal = ({ open = false, onClose, onConfirm }: ModalProps) => {
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
            <DescriptionItem label="일시중지 일시">{data.date}</DescriptionItem>
            <DescriptionItem label="일시중지 사유">
              {data.reason}
            </DescriptionItem>
          </Descriptions>
        </div>
      </div>
    </Modal>
  );
};

export default StopInfoModal;
