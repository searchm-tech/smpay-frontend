import AdvertiserDesc from "@/components/views/sm-pay/components/AdvertiserDesc";
import { LabelBullet } from "@/components/composite/label-bullet";

const AdvertiserSection = () => {
  return (
    <section>
      <div className="flex items-center gap-4 py-2">
        <LabelBullet labelClassName="text-base font-bold">
          광고주 기본 정보
        </LabelBullet>
      </div>

      <AdvertiserDesc />
    </section>
  );
};

export default AdvertiserSection;
