"use client";

import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

import HeaderSection from "@/components/views/advertiser-verification/mobile/HeaderSection";
import AgreemenSection from "@/components/views/advertiser-verification/mobile/AgreemenSection";
import AccountCharge from "@/components/views/advertiser-verification/mobile/AccountCharge";
import AccountSale from "@/components/views/advertiser-verification/mobile/AccountSale";
import { MobileTitle } from "@/components/common/Title";

const MobilewView = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(2);
  const handlePrev = () => setStep(1);
  const handleSubmit = () => router.push("/sm-pay/management");

  return (
    <div className="flex flex-col items-center justify-between h-full min-h-[100vh]">
      <div className="w-full flex flex-col items-center justify-center">
        <MobileTitle />
        {step === 1 && (
          <Fragment>
            <HeaderSection />
            <AgreemenSection />
            <AccountCharge />
          </Fragment>
        )}

        {step === 2 && <AccountSale />}
      </div>

      {step === 1 && <NextButton onNext={handleNext} />}
      {step === 2 && (
        <PrevSumbitButton onPrev={handlePrev} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default MobilewView;

const NextButton = ({ onNext }: { onNext: () => void }) => {
  return (
    <div
      className="w-full h-[40px] bg-[#F6BE2C] text-white font-bold text-lg mt-10 flex items-center justify-center cursor-pointer"
      onClick={onNext}
    >
      다음으로
    </div>
  );
};

const PrevSumbitButton = ({
  onPrev,
  onSubmit,
}: {
  onPrev: () => void;
  onSubmit: () => void;
}) => {
  return (
    <div className="flex w-full">
      <div
        className="w-full h-[40px] bg-[#BABABA] text-white font-bold text-lg mt-10 flex items-center justify-center cursor-pointer"
        onClick={onPrev}
      >
        이전으로
      </div>
      <div
        className="w-full h-[40px] bg-[#F6BE2C] text-white font-bold text-lg mt-10 flex items-center justify-center cursor-pointer"
        onClick={onSubmit}
      >
        제출하기
      </div>
    </div>
  );
};
