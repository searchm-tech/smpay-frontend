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
        <div className="text-center text-base font-bold pb-4 border-b border-[#C0C0C0] border-dotted">
          <p>회원가입이 완료되었습니다. 메일로 로그인 링크가 발송되었습니다.</p>
          <p className="mb-4">로그인 후 SM Pay 서비스 이용이 가능합니다.</p>
        </div>

        <div className="border-b border-[#C0C0C0] py-5 font-medium text-base pl-32">
          <span>아이디</span>
          <span className="text-[#A1A1A1]">
            (가입시 입력한 이메일 주소의 아이디 부분)
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSuccess;
