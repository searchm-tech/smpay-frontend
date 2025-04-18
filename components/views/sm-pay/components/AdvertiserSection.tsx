import AdvertiserDesc from "@/components/views/sm-pay/components/AdvertiserDesc";
import { LabelBullet } from "@/components/composite/label-bullet";

const AdvertiserSection = () => {
  return (
    <section>
      <LabelBullet labelClassName="text-base font-bold">
        광고주 기본 정보
      </LabelBullet>
      <AdvertiserDesc />
    </section>
  );
};

export default AdvertiserSection;
