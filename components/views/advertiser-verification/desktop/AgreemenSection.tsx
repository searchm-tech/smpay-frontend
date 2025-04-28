import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { LinkTextButton } from "@/components/composite/button-components";
import { Radio } from "@/components/composite/radio-component";

type AgreemenSectionProps = {
  agreed: boolean;
  setAgreed: (agreed: boolean) => void;
  agreePrivacy: boolean;
  setAgreePrivacy: (agreePrivacy: boolean) => void;
  agreeService: boolean;
  setAgreeService: (agreeService: boolean) => void;
};

const AgreemenSection = ({
  agreed,
  setAgreed,
  agreePrivacy,
  setAgreePrivacy,
  agreeService,
  setAgreeService,
}: AgreemenSectionProps) => {
  const handleAllAgree = () => {
    if (agreed) {
      setAgreed(false);
      setAgreePrivacy(false);
      setAgreeService(false);
    } else {
      setAgreed(true);
      setAgreePrivacy(true);
      setAgreeService(true);
    }
  };

  return (
    <section className="mt-6 w-full inline-block">
      <Radio
        checked={agreed}
        onClick={handleAllAgree}
        label={<span className="text-base font-bold">전체 동의</span>}
      />

      <Separator className="my-6 border-black border-[1px]" />

      <RadioGroup defaultValue="percent" className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <RadioGroupItem
            value="percent"
            id="above-percent"
            checked={agreePrivacy}
            onClick={() => setAgreePrivacy(!agreePrivacy)}
          />
          <span className="text-base">
            [필수] 개인 정보 수집 이용에 동의합니다.
          </span>
          <LinkTextButton className="ml-4">내용보기</LinkTextButton>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem
            value="fixed"
            id="above-fixed"
            checked={agreeService}
            onClick={() => setAgreeService(!agreeService)}
          />
          <span className="text-base">
            [필수] SM Pay 부가 서비스 이용에 동의합니다.
          </span>
          <LinkTextButton className="ml-4">내용보기</LinkTextButton>
        </div>
      </RadioGroup>
    </section>
  );
};

export default AgreemenSection;
