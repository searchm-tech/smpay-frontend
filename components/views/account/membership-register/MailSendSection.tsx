import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";
import { LabelBullet } from "@/components/composite/label-bullet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MailSendSection = () => {
  return (
    <section className="py-4">
      <LabelBullet className="mb-4" labelClassName="text-base font-bold">
        회원 정보
      </LabelBullet>
      <Descriptions columns={1} bordered>
        <DescriptionItem label="대행사 선택 *">
          <Input className="max-w-[500px]" />
        </DescriptionItem>
        <DescriptionItem label="회원 구분 *">
          최상위 그룹 그룹장
        </DescriptionItem>
        <DescriptionItem label="성명 *">
          <Input className="max-w-[500px]" />
        </DescriptionItem>
        <DescriptionItem label="발송될 이메일 주소 *">
          <Input className="max-w-[500px]" />
        </DescriptionItem>
      </Descriptions>

      <div className="bg-[rgba(0,0,0,0.02)] h-[70px] flex items-center px-4 mt-2">
        <span className="text-[#656C7B] text-base font-medium">
          * 가입 시 입력한 이메일 주소의 아이디 부분이 사이트에서 ID로
          사용됩니다.
        </span>
      </div>

      <div className="w-full flex justify-center gap-6 py-6">
        <Button className="w-[150px]">확인</Button>
        <Button variant="cancel" className="w-[150px]">
          취소
        </Button>
      </div>
    </section>
  );
};

export default MailSendSection;

const descLabelClassName = "w-[200px] font-bold";
