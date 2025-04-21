import {
  Modal,
  type ModalProps,
} from "@/components/composite/modal-components";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";

const RejectModal = ({ open = false, onClose, onConfirm }: ModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="광고주 심사 반려"
      confirmText="상세보기"
      cancelText="닫기"
    >
      <div className="min-w-[900px]">
        <p>다음과 같은 사유로 SM Pay 서비스 심사를 반려되었습니다.</p>
        <div className="mt-4 rounded-md bg-white">
          <Descriptions columns={1}>
            <DescriptionItem label="사업자명">주식회사 써치엠</DescriptionItem>
            <DescriptionItem label="대표자명">홍길동</DescriptionItem>
          </Descriptions>
        </div>
      </div>
    </Modal>
  );
};

export default RejectModal;
