import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { Label } from "@/components/ui/label";
import type { AdvertiserData } from "@/types/adveriser";

type AdvertiserDescProps = {
  advertiserDetail: AdvertiserData | null;
};

const AdvertiserDesc = ({ advertiserDetail }: AdvertiserDescProps) => {
  return (
    <Descriptions columns={1}>
      <DescriptionItem label="사업자명">
        <Label>{advertiserDetail?.businessName}</Label>
      </DescriptionItem>
      <DescriptionItem label="광고주 닉네임">
        <Label>{advertiserDetail?.loginId}</Label>
      </DescriptionItem>
      <DescriptionItem label="대표자명">
        <Label>{advertiserDetail?.businessOwnerName}</Label>
      </DescriptionItem>
      <DescriptionItem label="사업자 등록 번호">
        <Label>{advertiserDetail?.businessNumber}</Label>
      </DescriptionItem>
      <DescriptionItem label="담당자 휴대폰 번호">
        <Label>{advertiserDetail?.businessOwnerPhone}</Label>
      </DescriptionItem>
      <DescriptionItem label="담당자 이메일 주소">
        <Label>{advertiserDetail?.businessOwnerEmail}</Label>
      </DescriptionItem>
    </Descriptions>
  );
};

export default AdvertiserDesc;
