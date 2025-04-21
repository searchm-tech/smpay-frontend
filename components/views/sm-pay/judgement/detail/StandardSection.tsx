import { CircleCheckBig, X } from "lucide-react";

import { LabelBullet } from "@/components/composite/label-bullet";
import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";

const StandardSection = () => {
  return (
    <section>
      <LabelBullet labelClassName="text-base">기준 설정</LabelBullet>
      <Descriptions bordered columns={1}>
        <DescriptionItem label="매출 계좌 보유 잔액">
          <div className="flex items-center gap-4 font-bold">
            30,000,000원 <CircleCheckBig color="#34C759" />
          </div>
        </DescriptionItem>
        <DescriptionItem label="광고 운영 기간">
          <div className="flex items-center gap-4 font-bold">
            1개월 24일 <X color="#FF3B30" />
          </div>
        </DescriptionItem>
        <DescriptionItem label="일 평균 ROAS">
          <div className="flex items-center gap-4 font-bold">
            425% <CircleCheckBig color="#34C759" />
          </div>
        </DescriptionItem>
        <DescriptionItem label="일 평균 전환매출">
          <div className="flex items-center gap-4 font-bold">
            9,256,000원 <CircleCheckBig color="#34C759" />
          </div>
        </DescriptionItem>
        <DescriptionItem label="일 평균 소진 광고비">
          <div className="flex items-center gap-4 font-bold">
            1,200,000원 <X color="#FF3B30" />
          </div>
        </DescriptionItem>
      </Descriptions>
    </section>
  );
};

export default StandardSection;
