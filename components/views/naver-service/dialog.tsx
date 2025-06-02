import { ConfirmDialog, Modal } from "@/components/composite/modal-components";
import Image from "next/image";

type Props = {
  onConfirm: () => void;
};
export const SuccessCreateLicenseDialog = ({ onConfirm }: Props) => {
  return (
    <ConfirmDialog
      open
      title="라이선스 등록 성공"
      confirmText="광고주 등록"
      cancelDisabled
      content={
        <div className="text-center">
          <p>등록이 성공적으로 완료되었습니다.</p>
          <p>광고주를 등록해주세요.</p>
        </div>
      }
      onConfirm={onConfirm}
    />
  );
};

type CreateLicTipDialogProps = {
  onClose: () => void;
};
export const CreateLicTipDialog = ({ onClose }: CreateLicTipDialogProps) => {
  return (
    <Modal open title="등록 TIP!" onClose={onClose} footerDisabled>
      <div className="w-[600px] h-[400px]">
        <div>
          <p className="mb-1">
            API 라이선스는
            <span className="ml-2 font-bold text-blue-600 border-b border-blue-600">
              네이버 광고 {">"} 도구 {">"} API 사용 관리 페이지
            </span>
            에서 확인하실 수 있습니다.
          </p>
          <p>
            <span className="font-bold">광고주 등록</span> 후 네이버 광고 마케터
            라이선스 등록을 완료해주세요.
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            style={{
              border: "1px solid black",
            }}
            className="mt-4"
            src="/images/naver-service/guide.png"
            alt="guide"
            width={600}
            height={320}
          />
        </div>
      </div>
    </Modal>
  );
};
