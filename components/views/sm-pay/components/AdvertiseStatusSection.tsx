import { Label } from "@/components/ui/label";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { Button } from "@/components/ui/button";

type Props = {
  status: string;
  isHistory?: boolean;
};

const AdvertiseStatusSection = ({ status, isHistory = false }: Props) => {
  return (
    <section>
      <div className="flex items-center gap-4 py-4">
        <LabelBullet labelClassName="text-base font-bold">
          광고주 상태
        </LabelBullet>
        {isHistory && <Button>SM Pay 지난 이력 보기</Button>}
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
