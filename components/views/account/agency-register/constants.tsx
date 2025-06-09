import { RequestAgencyRegister } from "@/types/api/agency";
import { CircleAlert } from "lucide-react";

type ValidMessageProps = {
  message: keyof typeof MessageInfo;
};

interface FormValues {
  name: string;
  uniqueCode: string;
  representativeName: string;
  businessRegistrationNumber: string;
  domainName: string;
  agentBillName: string;
  agentBillPhoneNumber: string;
  agentBillEmailAddress: string;
}

/**
 * FormValues를 RequestAgencyRegister로 변환하는 유틸리티 함수
 */
export const createAgencyRequestData = (
  data: FormValues
): RequestAgencyRegister => {
  // 계산서 발행 담당자 정보 검증
  const billFields = [
    data.agentBillName,
    data.agentBillPhoneNumber,
    data.agentBillEmailAddress,
  ];

  const filledBillFields = billFields.filter(
    (field) => field && field.trim() !== ""
  );

  return {
    name: data.name,
    uniqueCode: data.uniqueCode,
    representativeName: data.representativeName,
    businessRegistrationNumber: data.businessRegistrationNumber.replace(
      /-/g,
      ""
    ),
    domainName: data.domainName,
    agentBills:
      filledBillFields.length === 0
        ? []
        : [
            {
              name: data.agentBillName,
              phoneNumber: data.agentBillPhoneNumber.replace(/-/g, ""),
              emailAddress: data.agentBillEmailAddress,
            },
          ],
  };
};

/**
 * 계산서 발행 담당자 정보의 입력 상태를 검증하는 함수
 * @param data FormValues
 * @returns { isValid: boolean, filledCount: number }
 */
export const validateBillInfo = (data: FormValues) => {
  const billFields = [
    data.agentBillName,
    data.agentBillPhoneNumber,
    data.agentBillEmailAddress,
  ];

  const filledBillFields = billFields.filter(
    (field) => field && field.trim() !== ""
  );

  return {
    isValid: filledBillFields.length === 0 || filledBillFields.length === 3,
    filledCount: filledBillFields.length,
  };
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
  enable_company_email_domain: {
    title: "도메인 중복 확인",
    content: "사용 가능한 메일 도메인입니다.",
  },
  error_enable_company_email_domain: {
    title: "도메인 중복 확인",
    content: "이미 사용 중인 메일 도메인입니다.",
  },
  error_invalid_email_domain: {
    title: "회사 메일 도메인 형식 오류",
    content: "유효하지 않은 회사 메일 도메인입니다.",
  },
  no_email_domain_check: {
    title: "이메일 도메인 중복 확인 필요",
    content: "회사 메일 도메인 중복 확인을 완료해주세요.",
  },
  register_agency: {
    title: "대행사 등록",
    content: "대행사 등록이 완료되었습니다.",
  },
  error_register_agency: {
    title: "대행사 등록",
    content: "정보를 모두 입력해주세요.",
  },
  error_incomplete_bill_info: {
    title: "계산서 발행 담당자 정보",
    content:
      "계산서 발행 담당자 정보는 모두 입력하거나 모두 비워두어야 합니다.",
  },
  enable_unique_code: {
    title: "대행사 고유코드 중복 확인",
    content: "사용 가능한 고유코드입니다.",
  },
  error_enable_unique_code: {
    title: "대행사 고유코드 중복 확인",
    content: "이미 사용 중인 고유코드입니다.",
  },
  error_invalid_unique_code: {
    title: "대행사 고유코드 형식 오류",
    content: "식별 가능한 값을 입력해주세요.",
  },
  no_unique_code_check: {
    title: "고유코드 중복 확인 필요",
    content: "대행사 고유코드 중복 확인을 완료해주세요.",
  },
  error_all: {
    title: "필수 정보 누락",
    content: "필수 항목을 모두 입력해주세요.",
  },

  error_invalid_email_address: {
    title: "계산서 발행 담당자 이메일 형식 오류",
    content: "유효하지 않은 이메일 주소입니다.",
  },
  error_invalid_phone_number: {
    title: "계산서 발행 담당자 전화번호 형식 오류",
    content: "유효하지 않은 전화번호입니다.",
  },
};

export type ModalInfoType = keyof typeof ModalInfo;
