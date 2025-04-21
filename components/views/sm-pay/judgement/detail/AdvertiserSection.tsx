import { LabelBullet } from "@/components/composite/label-bullet";
import AdvertiserDesc from "../../components/AdvertiserDesc";

const AdvertiserSection = () => {
  return (
    <section className="mt-4">
      <LabelBullet labelClassName="text-base">광고주 기본 정보</LabelBullet>
      <AdvertiserDesc />
    </section>
  );
};

export default AdvertiserSection;
