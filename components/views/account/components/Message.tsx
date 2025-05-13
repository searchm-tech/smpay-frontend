import { CircleAlert } from "lucide-react";

export const AgencyNameMessage = () => {
  return (
    <span className="flex items-center gap-1 text-xs text-[#D20319]">
      <CircleAlert className="w-4 h-4" />
      대행사명을 입력해주세요.
    </span>
  );
};

export const EmailIdMessage = () => {
  return (
    <span className="flex items-center gap-1 text-xs text-[#D20319]">
      <CircleAlert className="w-4 h-4" />
      유효하지 않은 이메일입니다.
    </span>
  );
};

export const BusinessNumberMessage = () => {
  return (
    <span className="flex items-center gap-1 text-xs text-[#D20319]">
      <CircleAlert className="w-4 h-4" />
      유효하지 않은 사업자등록번호입니다.
    </span>
  );
};

export const CompanyEmailDomainMessage = () => {
  return (
    <span className="flex items-center gap-1 text-xs text-[#D20319]">
      <CircleAlert className="w-4 h-4" />
      유효하지 않은 회사 메일 도메인입니다.
    </span>
  );
};
