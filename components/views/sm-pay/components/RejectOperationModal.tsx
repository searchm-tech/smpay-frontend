import dayjs from "dayjs";
import parse from "html-react-parser";

import {
  Modal,
  type ModalProps,
} from "@/components/composite/modal-components";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";

import { useSmPayRejectReason } from "@/hooks/queries/sm-pay";

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

interface Props extends ModalProps {
  id: string;
}
const RejectModal = ({
  open = false,
  onClose,
  onConfirm,
  confirmDisabled = false,
  id,
}: Props) => {
  const { data: rejectReason } = useSmPayRejectReason(id);

  return (
    <Modal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="심사 반려"
      confirmText="상세보기"
      cancelText="닫기"
      confirmDisabled={confirmDisabled}
    >
      <div className="min-w-[900px]">
        <p>다음과 같은 사유로 SM Pay 신청이 거절되었습니다.</p>
        <div className="mt-4 rounded-md bg-white">
          <Descriptions columns={1}>
            <DescriptionItem label="운영 검토 거절 일시">
              {data.date}
            </DescriptionItem>
            <DescriptionItem label="거절 사유">
              {parse(rejectReason.data)}
            </DescriptionItem>
          </Descriptions>
        </div>
      </div>
    </Modal>
  );
};

export default RejectModal;
