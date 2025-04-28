import { Separator } from "@/components/ui/separator";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type AgreemenSectionProps = {
  agreed: boolean;
  setAgreed: (value: boolean) => void;
  agreePrivacy: boolean;
  setAgreePrivacy: (value: boolean) => void;
  agreeService: boolean;
  setAgreeService: (value: boolean) => void;
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

  const handleAgreePrivacy = () => {
    if (agreed && agreePrivacy) {
      setAgreed(false);
    }
    setAgreePrivacy(!agreePrivacy);
  };

  const handleAgreeService = () => {
    if (agreed && agreeService) {
      setAgreed(false);
    }
    setAgreeService(!agreeService);
  };

  return (
    <section className="mt-8 w-full px-4">
      <div className="flex items-center space-x-2">
        <Switch size="sm" checked={agreed} onCheckedChange={handleAllAgree} />
        <Label className="font-medium">전체 동의</Label>
      </div>

      <Separator className="mt-4 border-black border-[1px]" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 pb-3 pt-5">
          <Switch
            size="sm"
            checked={agreePrivacy}
            onCheckedChange={handleAgreePrivacy}
          />
          <span className="text-[14px] font-medium">
            [필수] 개인 정보 수집 이용에 동의합니다.
          </span>
        </div>

        <div className="border-dotted border-gray-400 border-b-2 border-t-1" />

        <div className="flex items-center gap-2 py-3">
          <Switch
            size="sm"
            checked={agreeService}
            onCheckedChange={handleAgreeService}
          />
          <span className="text-[14px] font-medium">
            [필수] SM Pay 부가 서비스 이용에 동의합니다.
          </span>
        </div>

        <Separator className="border-black border-[1px]" />
      </div>
    </section>
  );
};

export default AgreemenSection;
