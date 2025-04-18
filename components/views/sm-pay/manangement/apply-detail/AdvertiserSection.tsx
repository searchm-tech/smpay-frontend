import AdvertiserDesc from "@/components/views/sm-pay/components/AdvertiserDesc";
import { LabelBullet } from "@/components/composite/label-bullet";

const AdvertiserSection = () => {
  return (
    <section className="mt-4">
      <LabelBullet labelClassName="text-base pb-2">
        광고주 기본 정보
      </LabelBullet>
      <AdvertiserDesc />
    </section>
  );
};

export default AdvertiserSection;
