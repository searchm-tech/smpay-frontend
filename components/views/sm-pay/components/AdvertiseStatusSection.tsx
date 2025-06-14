import { Label } from "@/components/ui/label";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { LabelBullet } from "@/components/composite/label-bullet";

type Props = {
  status: string;
};

const AdvertiseStatusSection = ({ status }: Props) => {
  return (
    <section className="mb-4">
      <div className="flex items-center gap-4 py-2">
        <LabelBullet labelClassName="text-base font-bold">
          광고주 상태
        </LabelBullet>
      </div>

      <Descriptions columns={1}>
        <DescriptionItem label="광고주 상태">
          <Label>{status}</Label>
        </DescriptionItem>
      </Descriptions>
    </section>
  );
};

export default AdvertiseStatusSection;
