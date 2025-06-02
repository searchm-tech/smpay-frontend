import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { CreateLicTipDialog } from "./dialog";

export const CreateGuideSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto px-4 py-8 mb-8">
      {isOpen && <CreateLicTipDialog onClose={() => setIsOpen(false)} />}
      <h1 className="text-lg font-semibold mb-8 text-center">
        서비스 신청 방법
      </h1>

      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center h-[250px] w-[280px] lg:w-[320px]">
          <div className="relative mb-6">
            <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gray-100 flex items-center justify-center">
              <Image
                src="/images/customer-id.svg"
                alt="고객 ID 등록"
                width={40}
                height={40}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
              />
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2 text-sm md:text-base">
              네이버 광고
              <br />
              마케터 라이선스 발급
            </h3>
            <p className="text-xs md:text-sm text-gray-600">
              네이버 광고에서 대행사 직원용
              <br />
              라이선스 키를 발급받아 주세요
            </p>
          </div>
        </div>

        <ArrowRight className="w-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-gray-400 flex-shrink-0" />

        <div className="flex flex-col items-center h-[250px] w-[280px]  lg:w-[335px]">
          <div className="relative mb-6">
            <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gray-100 flex items-center justify-center">
              <Image
                src="/images/customer-id.svg"
                alt="고객 ID 등록"
                width={40}
                height={40}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
              />
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2 text-sm md:text-base">
              마케터 API 라이선스 등록
            </h3>
            <p className="text-xs md:text-sm text-gray-600">
              <span className="mr-1">API 라이선스는</span>
              <span
                className="text-blue-600 border-b border-blue-600 cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                네이버 검색광고 홈페이지 {">"} 도구 {">"} API 사용 관리페이지
              </span>
              에서 확인하실 수 있습니다.
            </p>
          </div>
        </div>

        <ArrowRight className="w-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-gray-400 flex-shrink-0" />

        <div className="flex flex-col items-center h-[250px] w-[280px] lg:w-[320px]">
          <div className="mb-6">
            <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gray-100 flex items-center justify-center">
              <Image
                src="/images/registration.svg"
                alt="광고주 등록"
                width={40}
                height={40}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
              />
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2 text-sm md:text-base">
              네이버 광고주 등록
            </h3>
            <p className="text-xs md:text-sm text-gray-600">
              광고주 등록 후 30분 이내에 광고주 등기화가 완료됩니다.
              <br />
              광고주의 ID를 검색해 등록해주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdvertiserGuideSection = () => {
  return (
    <div className="mx-auto px-4 py-8 mb-8">
      <h1 className="text-lg font-semibold mb-8 text-center">
        서비스 신청 방법
      </h1>

      <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-16">
        <div className="flex flex-col items-center h-[250px] w-[280px] lg:w-[320px]">
          <div className="relative mb-6">
            <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gray-100 flex items-center justify-center">
              <Image
                src="/images/customer-id.svg"
                alt="고객 ID 등록"
                width={40}
                height={40}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
              />
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2 text-sm md:text-base">
              광고주 CUSTOMER ID 등록
            </h3>
            <p className="text-xs md:text-sm text-gray-600 max-w-[280px] md:max-w-[320px] lg:max-w-[360px]">
              CUSTOMER ID는 수치로 이루어진 고유 ID로
              <br />
              <span className="text-blue-600">
                네이버 검색광고 홈페이지 {">"} 내 정보 {">"} 기본정보 {">"}{" "}
                정보조회
              </span>
              에서 확인하실 수 있습니다.
            </p>
          </div>
        </div>

        <ArrowRight className="w-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-gray-400 flex-shrink-0" />

        <div className="flex flex-col items-center h-[250px]">
          <div className="mb-6">
            <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gray-100 flex items-center justify-center">
              <Image
                src="/images/registration.svg"
                alt="광고주 등록"
                width={40}
                height={40}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
              />
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2 text-sm md:text-base">
              광고주 광고계정 등기화
            </h3>
            <p className="text-xs md:text-sm text-gray-600 max-w-[280px] md:max-w-[320px] lg:max-w-[360px]">
              광고주 등록 후 30분 이내에 광고주 등기화가 완료됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
