import { Modal, type ModalProps } from '@/components/composite/modal';
import { Descriptions } from 'antd';

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
          <Descriptions column={1} bordered>
            <Descriptions.Item label="사업자명">주식회사 써치엠</Descriptions.Item>
            <Descriptions.Item label="대표자명">홍길동</Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </Modal>
  );
};

export default StopInfoModal;
