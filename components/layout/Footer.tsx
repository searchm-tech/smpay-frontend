import Image from "next/image";
import { useState } from "react";
import Copyright from "./Copyright";
import DocumentComponent from "../common/Document";

const Footer = () => {
  const [documentType, setDocumentType] = useState<
    "personalInfo" | "termsOfService" | null
  >("termsOfService");

  return (
    <footer className="w-full h-[223px] bg-[#EDF0F5] text-[#3C4D60] py-3 border-t border-[#A8A8A8] flex flex-col  justify-center gap-2 pl-8">
      {documentType && (
        <DocumentComponent
          type={documentType}
          onClose={() => setDocumentType(null)}
        />
      )}
      <Image src="/images/logo_footer.png" alt="logo" width={112} height={44} />

      <div className="flex flex-col gap-4">
        <div className="mt-4 flex items-center gap-8 text-sm font-normal">
          <p
            className="cursor-pointer"
            onClick={() => setDocumentType("termsOfService")}
          >
            이용약관
          </p>
          <p
            className="cursor-pointer"
            onClick={() => setDocumentType("personalInfo")}
          >
            개인정보처리방침
          </p>
          <p className="cursor-pointer">고객센터</p>
        </div>

        <div className="flex items-center gap-8 text-sm font-normal">
          <p>사업자 등록 번호: 211-88-14382</p>
          <p>대표: 박규태</p>
          <p>주소: 서울 강남구 논현로 319, 3층,4층</p>
        </div>

        <Copyright className="flex items-center gap-8 text-sm font-medium text-[#545F71]" />
      </div>
    </footer>
  );
};

export default Footer;
