"use client";

import HeaderSection from "./HeaderSection";
import AgreemenSection from "./AgreemenSection";
import InfoSection from "./InfoSection";
import FooterSection from "./FooterSection";

const DesktopView = () => {
  return (
    <div className="max-w-[700px] mt-10 h-[1105px] text-center flex flex-col items-center mx-auto">
      <HeaderSection />
      <AgreemenSection />
      <InfoSection />
      <FooterSection />
    </div>
  );
};

export default DesktopView;
