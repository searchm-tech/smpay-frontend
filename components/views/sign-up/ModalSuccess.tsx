import { Modal } from "@/components/composite/modal-components";

type ModalSuccessProps = {
  onClose: () => void;
};
const ModalSuccess = ({ onClose }: ModalSuccessProps) => {
  return (
    <Modal
      open
      title="회원 가입 완료"
      onClose={onClose}
      onConfirm={onClose}
      confirmText="확인"
      cancelText="닫기"
      iconDisabled
    >
      <div className="w-[800px]">
        <div className="text-center text-base font-bold">
          <p>회원가입이 완료되었습니다. 메일로 로그인 링크가 발송되었습니다.</p>
          <p className="mb-4">로그인 후 SM Pay 서비스 이용이 가능합니다.</p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSuccess;
