import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { Label } from "@/components/ui/label";

type AdvertiseStatusDescProps = {
  status: string;
};

const AdvertiseStatusDesc = ({ status }: AdvertiseStatusDescProps) => {
  return (
    <section className="mb-4">
      <div className="flex items-center gap-4 py-2">
        <LabelBullet labelClassName="text-base font-bold">
          광고주 심사 상태
        </LabelBullet>
      </div>

      <Descriptions columns={1}>
        <DescriptionItem label="심사 상태1">
          <Label>{status}</Label>
        </DescriptionItem>
      </Descriptions>
    </section>
  );
};

export default AdvertiseStatusDesc;
