import { CircleAlert } from "lucide-react";

type ValidMessageProps = {
  message: keyof typeof MessageInfo;
};

// TODO : Form 형태로 인해 디자인 작업이 적용하기 힘듬
// FormMessage 컴포넌트 수정 필요
export const ValidMessage = ({ message }: ValidMessageProps) => {
  return (
    <span className="flex items-center gap-1 text-xs text-[#D20319]">
      <CircleAlert className="w-4 h-4" />
      {MessageInfo[message]}
    </span>
  );
};

export const MessageInfo = {
  agency_name: "대행사명을 입력해주세요.",
  email_id: "유효하지 않은 이메일입니다.",
  business_number: "유효하지 않은 사업자등록번호입니다.",
  company_email_domain: "유효하지 않은 회사 메일 도메인입니다.",
  agency_code: "식별 가능한 값을 입력해주세요.",
};

export const ModalInfo = {
  check_agency_code: {
    title: "대행사 코드 중복 확인",
    content: "사용 가능한 대행사 코드입니다.",
  },
  error_check_agency_code: {
    title: "대행사 코드 중복 확인",
    content: "이미 사용 중인 대행사 코드입니다.",
  },
  check_business_number: {
    title: "사업자 등록 번호 중복 확인",
    content: "사용 가능한 사업자 등록 번호입니다.",
  },
  error_check_business_number: {
    title: "사업자 등록 번호 중복 확인",
    content: "이미 사용 중인 사업자 등록 번호입니다.",
  },
  check_company_email_domain: {
    title: "회사 메일 도메인 중복 확인",
    content: "사용 가능한 회사 메일 도메인입니다.",
  },
  error_check_company_email_domain: {
    title: "회사 메일 도메인 중복 확인",
    content: "이미 사용 중인 회사 메일 도메인입니다.",
  },
  register_agency: {
    title: "대행사 등록",
    content: "대행사 등록이 완료되었습니다.",
  },
  error_register_agency: {
    title: "대행사 등록",
    content: "정보를 모두 입력해주세요.",
  },
};

export type ModalInfoType = keyof typeof ModalInfo;
