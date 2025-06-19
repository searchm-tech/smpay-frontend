import { useState } from "react";

import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { LinkTextButton } from "@/components/composite/button-components";
import { Radio } from "@/components/composite/radio-component";
import { Modal } from "@/components/composite/modal-components";

import { dialogContent } from "../constants";

import type { AgreementInfo } from "@/types/vertification";

type AgreemenSectionProps = {
  agreement: AgreementInfo;
  setAgreement: (agreement: AgreementInfo) => void;
};

const AgreemenSection = ({ agreement, setAgreement }: AgreemenSectionProps) => {
  const [openDialog, setOpenDialog] = useState<"private" | "debit" | null>(
    null
  );

  const handleAllAgree = () => {
    if (agreement.agreePrivacy && agreement.agreeService) {
      setAgreement({
        agreePrivacy: false,
        agreeService: false,
      });
    } else {
      setAgreement({
        agreePrivacy: true,
        agreeService: true,
      });
    }
  };

  return (
    <section className="mt-6 w-full inline-block">
      {openDialog && (
        <Modal
          open
          onClose={() => setOpenDialog(null)}
          title={
            openDialog === "private"
              ? "개인정보 수집·활용 동의"
              : "자동이체 출금 동의"
          }
          cancelDisabled
          confirmDisabled
        >
          <div className="h-[70vh] break-keep leading-relaxed">
            {dialogContent[openDialog]}
          </div>
        </Modal>
      )}
      <Radio
        checked={agreement.agreePrivacy && agreement.agreeService}
        onClick={handleAllAgree}
        label={<span className="text-base font-bold">전체 동의</span>}
      />

      <Separator className="my-6 border-black border-[1px]" />

      <RadioGroup defaultValue="percent" className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <RadioGroupItem
            value="percent"
            id="above-percent"
            checked={agreement.agreePrivacy}
            onClick={() =>
              setAgreement({
                ...agreement,
                agreePrivacy: !agreement.agreePrivacy,
              })
            }
          />
          <span className="text-base">
            [필수] 개인정보 수집·활용에 동의합니다.
          </span>
          <LinkTextButton
            className="ml-4"
            onClick={() => setOpenDialog("private")}
          >
            내용보기
          </LinkTextButton>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem
            value="fixed"
            id="above-fixed"
            checked={agreement.agreeService}
            onClick={() =>
              setAgreement({
                ...agreement,
                agreeService: !agreement.agreeService,
              })
            }
          />
          <span className="text-base">[필수] 자동이체 출금에 동의합니다.</span>
          <LinkTextButton
            className="ml-4"
            onClick={() => setOpenDialog("debit")}
          >
            내용보기
          </LinkTextButton>
        </div>
      </RadioGroup>
    </section>
  );
};

export default AgreemenSection;
