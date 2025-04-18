import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { LabelBullet } from "@/components/composite/label-bullet";

const AccountDesc = () => {
  return (
    <section>
      <LabelBullet labelClassName="text-base font-bold">
        충전 계좌 정보
      </LabelBullet>
      <Descriptions>
        <DescriptionItem label="충전 계좌 은행">우리은행</DescriptionItem>
        <DescriptionItem label="매출 계좌 은행">우리은행</DescriptionItem>
        <DescriptionItem label="충전 계좌 번호">
          1002-102-0428453
        </DescriptionItem>
        <DescriptionItem label="매출 계좌 번호">
          1002-102-0428453
        </DescriptionItem>
        <DescriptionItem label="충전 계좌 예금주명">
          주식회사 써치엠
        </DescriptionItem>
        <DescriptionItem label="매출 계좌 예금주명">
          주식회사 써치엠
        </DescriptionItem>
      </Descriptions>
    </section>
  );
};

export default AccountDesc;
