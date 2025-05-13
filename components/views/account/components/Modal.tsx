import { ConfirmDialog } from "@/components/composite/modal-components";

type ModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

export const SuccessCheckAgencyCodeModal = ({
  onClose,
  onConfirm,
}: ModalProps) => {
  return (
    <ConfirmDialog
      open
      title="대행사 코드 중복 확인"
      content="사용 가능한 대행사 코드입니다."
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
};

export const ErrorCheckAgencyCodeModal = ({
  onClose,
  onConfirm,
}: ModalProps) => {
  return (
    <ConfirmDialog
      open
      title="대행사 코드 중복 확인"
      content="이미 사용 중인 대행사 코드입니다."
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
};

export const SuccessCheckBusinessNumberModal = ({
  onClose,
  onConfirm,
}: ModalProps) => {
  return (
    <ConfirmDialog
      open
      title="사업자 등록 번호 중복 확인"
      content="사용 가능한 사업자 등록 번호입니다."
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
};

export const ErrorCheckBusinessNumberModal = ({
  onClose,
  onConfirm,
}: ModalProps) => {
  return (
    <ConfirmDialog
      open
      title="사업자 등록 번호 중복 확인"
      content="이미 사용 중인 사업자 등록 번호입니다."
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
};

export const SuccessCheckCompanyEmailDomainModal = ({
  onClose,
  onConfirm,
}: ModalProps) => {
  return (
    <ConfirmDialog
      open
      title="회사 메일 도메인 중복 확인"
      content="사용 가능한 회사 메일 도메인입니다."
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
};

export const ErrorCheckCompanyEmailDomainModal = ({
  onClose,
  onConfirm,
}: ModalProps) => {
  return (
    <ConfirmDialog
      open
      title="회사 메일 도메인 중복 확인"
      content="이미 사용 중인 회사 메일 도메인입니다."
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
};

export const SuccessRegisterAgencyModal = ({
  onConfirm,
}: {
  onConfirm: () => void;
}) => {
  return (
    <ConfirmDialog
      open
      title="대행사 등록"
      content="대행사 등록이 완료되었습니다."
      onConfirm={onConfirm}
      cancelDisabled
    />
  );
};

export const ErrorRegisterAgencyModal = ({
  onConfirm,
}: {
  onConfirm: () => void;
}) => {
  return (
    <ConfirmDialog
      open
      title="대행사 등록"
      content="정보를 모두 입력해주세요."
      onConfirm={onConfirm}
      cancelDisabled
    />
  );
};
