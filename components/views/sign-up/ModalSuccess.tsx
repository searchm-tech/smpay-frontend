import { Modal } from "@/components/composite/modal-components";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import type { TSignUpMailVerifyResponse } from "@/types/user";

type ModalSuccessProps = {
  result: TSignUpMailVerifyResponse;
  onClose: () => void;
};
const ModalSuccess = ({ result, onClose }: ModalSuccessProps) => {
  const router = useRouter();
  const handleCopy = () => {
    navigator.clipboard.writeText(result.url);
    alert("복사되었습니다.");
  };

  return (
    <Modal
      open
      title="회원 가입 완료"
      onClose={onClose}
      onConfirm={() => router.push(result.url)}
      confirmText="로그인 페이지 바로가기"
      cancelText="닫기"
      iconDisabled
    >
      <div className="w-[800px]">
        <div className="text-center text-base font-bold pb-4 border-b border-[#C0C0C0] border-dotted">
          <p>회원가입이 완료되었습니다.</p>
          <p className="mb-4">로그인 후 SM Pay 서비스 이용이 가능합니다.</p>
        </div>

        <div className="border-b border-[#C0C0C0] mt-10 text-center pb-4 font-medium text-base">
          <span>대행사 전용 접속 URL</span>
          <span className="text-[#FF3B30]">
            (해당 URL은 다른 페이지에서 확인할 수 없으니 꼭 메모해주세요!)
          </span>
        </div>

        <div className="border-b border-[#C0C0C0] text-center py-5 font-medium text-base flex justify-between items-center px-32">
          <span
            className="text-[#007AFF] font-bold cursor-pointer"
            onClick={handleCopy}
          >
            {result.url}
          </span>

          <Button onClick={handleCopy}>복사하기</Button>
        </div>

        <div className="border-b border-[#C0C0C0] py-5 font-medium text-base pl-32">
          <span>아이디</span>
          <span className="text-[#A1A1A1]">
            (가입시 입력한 이메일 주소의 아이디 부분)
          </span>
        </div>

        <div className="border-b border-[#C0C0C0] py-5 font-medium text-base pl-32">
          <span className="text-[#007AFF] font-bold">{result.loginId}</span>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSuccess;
