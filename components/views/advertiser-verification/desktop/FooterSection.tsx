import { useState } from "react";
import Copyright from "@/components/layout/Copyright";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { Button } from "@/components/ui/button";
import { dialogContent, DialogStatus } from "./constants";

type FooterSectionProps = {
  handleReset: () => void;
  handleSubmit: () => void;
};

const FooterSection = ({ handleReset, handleSubmit }: FooterSectionProps) => {
  return (
    <section className="w-full pt-[20px] pb-[100px]">
      <div className="flex justify-center gap-4 pt-4">
        <Button className="w-[150px]" onClick={handleSubmit}>
          제출
        </Button>
        <Button variant="cancel" className="w-[150px]" onClick={handleReset}>
          초기화
        </Button>
      </div>
      <Copyright className="py-[50px] text-[#545F71]" />
    </section>
  );
};

export default FooterSection;
