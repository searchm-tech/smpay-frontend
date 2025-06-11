import {
  Descriptions,
  DescriptionItem,
} from "@/components/composite/description-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { AdvertiserData } from "@/types/adveriser";

type AdvertiserDescProps = {
  advertiserDetail: AdvertiserData | null;
  onEdit?: () => void;
  isReadonly?: boolean;
};

// [최상위 그룹장] - 심사 요청 상세
const AdvertiserDesc = ({
  advertiserDetail,
  onEdit,
  isReadonly = false,
}: AdvertiserDescProps) => {
  return (
    <section>
      <div className="flex items-center gap-4 pb-4">
        <LabelBullet labelClassName="text-base font-bold">
          광고주 기본 정보
        </LabelBullet>
        {!isReadonly && (
          <Button className="w-[100px]" onClick={onEdit}>
            변경하기
          </Button>
        )}
      </div>
      <Descriptions columns={1}>
        <DescriptionItem label="광고주명">
          <Label>{advertiserDetail?.businessName}</Label>
        </DescriptionItem>
        <DescriptionItem label="대표자명">
          <Label>{advertiserDetail?.businessOwnerName}</Label>
        </DescriptionItem>
        <DescriptionItem label="사업자 등록번호">
          <Label>{advertiserDetail?.businessNumber}</Label>
        </DescriptionItem>
        <DescriptionItem label="광고주 휴대폰 번호">
          <Label>{advertiserDetail?.businessOwnerPhone}</Label>
        </DescriptionItem>
        <DescriptionItem label="광고주 이메일 주소">
          <Label>{advertiserDetail?.businessOwnerEmail}</Label>
        </DescriptionItem>
      </Descriptions>
    </section>
  );
};

export default AdvertiserDesc;
