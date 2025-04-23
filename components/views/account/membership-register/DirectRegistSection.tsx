import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PhoneInput } from "@/components/composite/input-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import {
  DescriptionItem,
  Descriptions,
} from "@/components/composite/description-components";

import Select from "@/components/composite/select-components";
import { RadioGroup } from "@/components/composite/radio-component";

const optsRadio = [
  { label: "그룹장", value: "leader" },
  { label: "그룹원", value: "member" },
];

const optsSelect = [
  { label: "일별조회", value: "daily" },
  { label: "주별조회", value: "weekly" },
  { label: "월별조회", value: "monthly" },
];

const DirectRegistSection = () => {
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState("leader");

  return (
    <div className="py-4">
      <LabelBullet className="mb-4" labelClassName="text-base font-bold">
        회원 정보
      </LabelBullet>
      <Descriptions columns={1} bordered>
        <DescriptionItem label="부서 선택 *">
          <Select
            options={optsSelect}
            value={selected}
            onChange={setSelected}
            placeholder="구분 : 일별조회"
            className="w-[500px]"
          />
        </DescriptionItem>
        <DescriptionItem label="회원 구분 *">
          <RadioGroup
            options={optsRadio}
            value={selected}
            onChange={setSelected}
          />
        </DescriptionItem>
        <DescriptionItem label="성명 *">
          <Input className="max-w-[500px]" />
        </DescriptionItem>
        <DescriptionItem label="이메일 주소 *">
          <Input className="max-w-[500px]" />
        </DescriptionItem>
      </Descriptions>

      <div className="bg-[rgba(0,0,0,0.02)] h-[70px] flex items-center px-4 my-2">
        <span className="text-[#656C7B] text-base font-medium">
          * 가입 시 입력한 이메일 주소의 아이디 부분이 사이트에서 ID로
          사용됩니다.
        </span>
      </div>

      <Descriptions columns={1}>
        <DescriptionItem label="비밀번호 *">
          <Input className="max-w-[500px]" />
        </DescriptionItem>
        <DescriptionItem label="비밀번호 *">
          <Input className="max-w-[500px]" />
        </DescriptionItem>
        <DescriptionItem label="연락처 *">
          <PhoneInput
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </DescriptionItem>
      </Descriptions>

      <div className="w-full flex justify-center gap-6 py-6">
        <Button className="w-[150px]">확인</Button>
        <Button variant="cancel" className="w-[150px]">
          취소
        </Button>
      </div>
    </div>
  );
};

export default DirectRegistSection;
