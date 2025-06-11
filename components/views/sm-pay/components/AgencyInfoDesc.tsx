import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { Label } from "@/components/ui/label";

export type AgencyInfo = {
  agencyName: string;
  departmentName: string;
  customerId: string;
  advertiserId: string;
};
export type AdvertiserInfo = {
  advertiserName: string;
  businessName: string;
  businessNumber: string;
  businessOwnerName: string;
  businessOwnerPhone: string;
};

type Props = {
  agencyInfo?: AgencyInfo;
  advertiserInfo?: AdvertiserInfo;
};
const AgencyInfoDesc = ({ agencyInfo, advertiserInfo }: Props) => {
  return (
    <section className="mb-4 flex gap-4">
      <div className="w-1/2">
        <div className="flex items-center gap-4 py-2">
          <LabelBullet labelClassName="text-base font-bold">
            광고주 상태
          </LabelBullet>
        </div>

        <Descriptions columns={1}>
          <DescriptionItem label="대행사명">
            <Label>주식회사 카타민</Label>
          </DescriptionItem>
          <DescriptionItem label="대행사 고유 코드">
            <Label>catamin</Label>
          </DescriptionItem>
          <DescriptionItem label="대표자 명">
            <Label>홍길동</Label>
          </DescriptionItem>
          <DescriptionItem label="담당자 명">
            <Label>홍길동</Label>
          </DescriptionItem>
          <DescriptionItem label="담당자 이메일 주소">
            <Label>catamin@catamin.com</Label>
          </DescriptionItem>
          <DescriptionItem label="담당자 연락처">
            <Label>010-1234-5678</Label>
          </DescriptionItem>
        </Descriptions>
      </div>

      <div className="w-1/2">
        <div className="flex items-center gap-4 py-2">
          <LabelBullet labelClassName="text-base font-bold">
            광고주 기본 정보
          </LabelBullet>
        </div>

        <Descriptions columns={1}>
          <DescriptionItem label="광고주명">
            <Label>주식회사 카타민</Label>
          </DescriptionItem>
          <DescriptionItem label="광고주 닉네임">
            <Label>catamin</Label>
          </DescriptionItem>
          <DescriptionItem label="대표자명">
            <Label>홍길동</Label>
          </DescriptionItem>
          <DescriptionItem label="사업자 등록 번호">
            <Label>1234567890</Label>
          </DescriptionItem>
          <DescriptionItem label="광고주 휴대폰 번호">
            <Label>010-1234-5678</Label>
          </DescriptionItem>
          <DescriptionItem label="광고주 이메일 주소">
            <Label>catamin@catamin.com</Label>
          </DescriptionItem>
        </Descriptions>
      </div>
    </section>
  );
};

export default AgencyInfoDesc;
