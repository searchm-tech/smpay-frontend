import AdvertiserDesc from "@/components/views/sm-pay/components/AdvertiserDesc";
import { LabelBullet } from "@/components/composite/label-bullet";
import { AdvertiserData } from "@/types/adveriser";

type AdvertiserSectionProps = {
  advertiserData: AdvertiserData | null;
};

const AdvertiserSection = ({ advertiserData }: AdvertiserSectionProps) => {
  return (
    <section>
      <div className="flex items-center gap-4 py-2">
        <LabelBullet labelClassName="text-base font-bold">
          광고주 기본 정보
        </LabelBullet>
      </div>

      <AdvertiserDesc advertiserDetail={advertiserData} onEdit={() => {}} />
    </section>
  );
};

export default AdvertiserSection;
