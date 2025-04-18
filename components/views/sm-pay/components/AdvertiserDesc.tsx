import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { Label } from "@/components/ui/label";

const AdvertiserDesc = () => {
  return (
    <Descriptions columns={1} bordered>
      <DescriptionItem label="사업자명">
        <Label>주식회사 카타미</Label>
      </DescriptionItem>
      <DescriptionItem label="광고주 닉테임">
        <Label>carrot</Label>
      </DescriptionItem>
      <DescriptionItem label="대표자명">
        <Label>김카타</Label>
      </DescriptionItem>
      <DescriptionItem label="사업자 등록 번호">
        <Label>123-45-67890</Label>
      </DescriptionItem>
      <DescriptionItem label="담당자 휴대폰 번호">
        <Label>010-1234-5678</Label>
      </DescriptionItem>
      <DescriptionItem label="담당자 이메일 주소">
        <Label>carrot@gmail.com</Label>
      </DescriptionItem>
    </Descriptions>
  );
};

export default AdvertiserDesc;
