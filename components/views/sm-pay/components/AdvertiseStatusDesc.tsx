import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { LabelBullet } from "@/components/composite/label-bullet";

const AdvertiseStatusDesc = () => {
  return (
    <section>
      <LabelBullet labelClassName="text-base font-bold">
        광고주 심사 상태
      </LabelBullet>
      <Descriptions columns={1}>
        <DescriptionItem label="심사 상태">
          <span className="font-bold">심사 요청</span>
        </DescriptionItem>
      </Descriptions>
    </section>
  );
};

export default AdvertiseStatusDesc;
